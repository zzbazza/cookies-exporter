const serializeCookies = (cookies) => {
    let serializedCookies = '';
    for (const cookie of cookies) {
        serializedCookies += `${cookie.name}=${cookie.value}; `;
    }
    return serializedCookies;
}

module.exports = {
    serializeCookies,
}
