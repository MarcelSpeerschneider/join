async function initUsers() {
    loadUsers();
}

async function initContacts() {
    if(contacts.length===0){
        loadContactsFromBackend();
    }
    else{
        return contacts;
    }
}

async function loadUsers() {
    const backendContainer = 'usersjoin';
    let arrayContent = usersjoin;
    let globalArrayName = 'usersjoin'
    usersjoin = await getInfo(backendContainer, arrayContent, globalArrayName);
    // try {
    //     usersjoin = JSON.parse(await getItem('usersjoin'));
    // } catch (e) {
    //     console.error('Loading error:', e);
    // }
}

async function loadContactsFromBackend() {
    const backendContainer = 'contactsjoin';
    contacts = await getInfo(backendContainer);
    // try {
    //     contacts = JSON.parse(await getItem('contactsjoin'));
    // } catch (e) {
    //     console.error('Loading error:', e);
    // }
}

async function loadTasks() {
    const backendContainer = 'tasksjoin';
    let arrayContent = todos;
    let globalArrayName = 'todos'
    todos = await getInfo(backendContainer, arrayContent, globalArrayName);
    // try {
    //     todos = JSON.parse(await getItem('tasksjoin'));
    // } catch (e) {
    //     console.error('Loading error:', e);
    // }
}

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

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

function loginCheck() {
    let loginTryUsername = document.getElementById('loginMail').value;
    let loginTryPassword = document.getElementById('loginPasswort').value;

    for (let index = 0; index < usersjoin.length; index++) {
        if (usersjoin[index]['email'].includes(loginTryUsername) & usersjoin[index]['password'].includes(loginTryPassword)) {
            alert('Der User ist vorhanden!');
            return;
        }
        else {
            alert('Der User ist nicht vorhanden!');
            return;
        }
    }
}