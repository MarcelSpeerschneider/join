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
    usersjoin = await getInfo(backendContainer);
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
    todos = await getInfo(backendContainer);
    // try {
    //     todos = JSON.parse(await getItem('tasksjoin'));
    // } catch (e) {
    //     console.error('Loading error:', e);
    // }
}

async function getInfo(backendContainer){
    let valuesFromBackend
    try {
        valuesFromBackend = JSON.parse(await getItem(backendContainer));
        return valuesFromBackend;
    } catch (e) {
        console.error('Loading error, maybe there are no users in your backend - See the error message for more deatils -->', e);
        return usersjoin;
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