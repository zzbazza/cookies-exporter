const pCss = `color: #9fa5a9; line-height: 20px!important; text-align: center; font-family: Graphik,sans-serif;`
const inputCss = `padding-left: 40px; cursor: pointer; font-size: 13px;font-weight: 700;color: #fff;background-color: #5cb85c;border-color: #4cae4c;text-align: center;vertical-align: middle;touch-action: manipulation;padding: 10px 20px;border-radius: 3px;line-height: 1.42857; border: 1px solid transparent;`

module.exports.confirm = () =>
    `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Apify Instagram authorization</title>
  </head>
  <body>
    <p style="${pCss} margin-top: 200px;"> <strong>!!!Use only newly opened empty tab!!!</strong> Click on confirm to save cookies.</p>
    <form method="POST" action=/confirm style="text-align: center; margin-top: 50px">
      <input type="submit" style="${inputCss}"/>
    </form>
  </body>
</html>`
