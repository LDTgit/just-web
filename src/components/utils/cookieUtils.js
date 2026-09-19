// Seteaza cookie cu o durata specificata in zile
export const setCookie = (name, value, days = 365) => {
    const dataCookie = new Date();
    dataCookie.setTime(dataCookie.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${dataCookie.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax; Secure`;
};

// Obine valoarea unui cookie dupa nume
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i=0; i< ca.length; i++){
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0){
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}