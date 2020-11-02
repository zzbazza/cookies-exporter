const Apify = require('apify');
const { utils: { log } } = Apify;
const { confirm } = require('./submit-page.js');
const http = require('http');
const { serializeCookies } = require('./tools');

Apify.main(async () => {
    const port = Apify.isAtHome() ? process.env.APIFY_CONTAINER_PORT : 3000;
    const browser = await Apify.launchPuppeteer();
    const confirmPage = await browser.newPage();
    const page = await browser.newPage();
    let finished;

    // Starts server for confirmation of end of actions
    const server = http.createServer((req, res) => {
        if (req.url.includes('/confirm')) {
            req.on('data', (body) => {
            });
            req.on('end', () => {
                finished = true;
                res.end();
            });
        } else {
            res.end(confirm());
        }
    });
    server.listen(port, () => console.log('server is listening on port', port));

    await confirmPage.goto('http://localhost:3000');

    // Give 5 minutes for ending page interactions
    const start = Date.now();
    try {
        while (!finished) {
            const now = Date.now();
            if (now - start > 5 * 60 * 1000) {
                throw new Error('You did not provide the code in time!');
            }
            console.log(`Waiting for code...You have ${300 - Math.floor((now - start) / 1000)} seconds left`);
            await new Promise((resolve) => setTimeout(resolve, 10000));
        }
    } catch (e) {
        throw e;
    } finally {
        server.close(() => console.log('closing server'));
    }

    const cookies = await page.cookies();
    const store = await Apify.openKeyValueStore();
    await store.setValue('COOKIES', cookies);
    await store.setValue('COOKIES-STRING', serializeCookies(cookies));
    await store.setValue('OUTPUT', cookies);
    log.info('Cookies stored to keyval')
});
