const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_TOKEN = 'OYAP04ANIARETDB8RY47TLPMLH70H2I0KPLFRF3W';

async function setItem(schluessel, wert){
    debugger;
    const payload = {
        key:schluessel,
        value:wert,
        token:STORAGE_TOKEN
    }
    // Da ich auf eine Rückgabe warten will, gebe ich noch return mit, sodass nachfolgende Funktionen warten.
    return fetch(STORAGE_URL,{
        method:'POST',
        // Da nur Text an ein Backend gesendet werden kann, muss mein Objekt in einen String umgewandelt werden.
        body: JSON.stringify(payload)
    });
}