/**
 * Loading the loadUsers function
 */
async function initUsers() {
    loadUsers();
}

/**
 * The return of the getInfo function, which will be called in this function, will be saved into an array.
 * The return are user information.
 */
async function loadUsers() {
    const backendContainer = 'usersjoin';
    let arrayContent = usersjoin;
    let globalArrayName = 'usersjoin'
    usersjoin = await getInfo(backendContainer, arrayContent, globalArrayName);
}

/**
 * If contacts is not empty, the global array (contacts) will be returned. If empty, another function will be called to fill the contacts array.
 * 
 * @returns - Global Array contacts
 */
async function initContacts() {
    if(contacts.length===0){
        loadContactsFromBackend();
    }
    else{
        return contacts;
    }
}

/**
 * This function will only be called by initContacts function. And only if the global array contacts is empty.
 * To get the info (contacts) from the backend, the getInfo function will be called inside this function.
 */
async function loadContactsFromBackend() {
    const backendContainer = 'contactsjoin';
    contacts = await getInfo(backendContainer);
}

/**
 * To get the info (todos) from the backend, to fill a global Array the getInfo function will be called inside this function.
 */
async function loadTasks() {
    const backendContainer = 'tasksjoin';
    let arrayContent = todos;
    let globalArrayName = 'todos'
    todos = await getInfo(backendContainer, arrayContent, globalArrayName);
}
/**
 * This function can be used to get info from backend. Therefore another function, inside this function, with the name getItem will be called.
 * Info can be tasks, contacts, users.
 * 
 * @param {*} backendContainer is key or the area of the backend, where the information is stored.
 * @param {*} arrayContent is the global arrays content
 * @param {*} globalArrayName is the name of the global Array
 * @returns either the information of the backend area (todos, users, contacts) or the empty array
 */
async function getInfo(backendContainer, arrayContent, globalArrayName){
    let valuesFromBackend
    try {
        valuesFromBackend = JSON.parse(await getItem(backendContainer));
        return valuesFromBackend;
    } catch (e) {
        console.error('Loading error, maybe there are no',globalArrayName,'in your backend. Therefore an empty Array will be returned! - See the error message for more deatils -->', e);
        return arrayContent;
    }
}
/**
 * This function calls the backend and asks for info inside the different areas.
 * 
 * @param {*} key - the key is the backend container where info like users, contacts or tasks are stored
 * @returns - if found, information out of the different areas of the backend whill be returned
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}