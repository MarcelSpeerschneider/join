const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_TOKEN = 'OYAP04ANIARETDB8RY47TLPMLH70H2I0KPLFRF3W';

/**
 * Sets a key-value pair in a remote storage using a POST request.
 *
 * @param {string} schluessel - The key (identifier) for the storage item.
 * @param {string} wert - The value to be associated with the key in storage.
 * @returns {Promise<Response>} A promise that resolves with the response from the storage server.
 */

async function setItem(schluessel, wert){
    const payload = {
        key:schluessel,
        value:wert,
        token:STORAGE_TOKEN
    }
    return fetch(STORAGE_URL,{
        method:'POST',
        body: JSON.stringify(payload)
    });
}