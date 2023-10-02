let contacts = [];
openedPopUpFormID = 'openedPopUpForm';

/**
 * Renders contacts by initializing them and sorting them alphabetically.
 * @returns {Promise<void>} A promise that resolves after rendering the contacts.
 */
async function renderContacts() {
    await initContacts();
    renderContactsAlphabetically();
}

function renderContactsAlphabetically() {
    sortContactsAlphabetically();
    const colors = generateColors();
    let currentLetter = initializeCurrentLetter();
    let contactListElement = document.getElementById("firstLetterContainer");
    contactListElement.innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstLetterOfFirstName = getFirstLetterOfFirstName(contact);
        if (isFirstLetterDifferent(firstLetterOfFirstName, currentLetter)) {
            currentLetter = firstLetterOfFirstName;
            contactListElement.innerHTML += generateLetterContainer(currentLetter);
        }
        const color = colors[i % colors.length];
        const contactHTML = generateContactHTML(contact, i, color);
        contactListElement.innerHTML += contactHTML;
    }
}

/**
 * Generates the HTML for displaying contact information.
 * @param {Object} contact - The contact object.
 * @param {number} i - The index of the contact.
 * @param {string} color - The color associated with the contact.
 * @returns {string} The generated HTML string.
 */
function generateContactHTML(contact, i, color) {
    let firstLetterOfFirstName = '';
    let firstLetterOfLastName = '';
    let indexOfEmptySpace = contact.name.search(' ');
    if (indexOfEmptySpace > 0) {
        firstLetterOfFirstName = contact.name.split(" ")[0][0].toUpperCase();
        firstLetterOfLastName = contact.name.split(" ")[1][0].toUpperCase();
    } else {
        firstLetterOfFirstName = contact.name[0];
        firstLetterOfLastName = '';
    }
    return generateContactHTMLString(contact, i, color, firstLetterOfFirstName, firstLetterOfLastName);
}

/**
 * Displays contact information in the UI.
 * @param {number} index - The index of the contact.
 * @param {string} color - The color associated with the contact.
 */
function displayContactInfo(index, color) {
    const contact = contacts[index];
    let contentshow = document.getElementById("contactsShow");
    contentshow.innerHTML = generateContactInfoHTML(contact, index, color);

    const clickedContact = document.querySelector('.list-of-contacts.clicked');
    if (clickedContact) {
        clickedContact.classList.remove('clicked');
    }
    const currentContact = document.getElementById(`contact-${index}`);
    currentContact.classList.add('clicked');

    if (window.innerWidth < 830) {
        document.getElementById('contactRightFlex').classList.remove('show-contact-right');
        document.getElementById('contactRightFlex').classList.add('addRightResponsiv');
        document.getElementById('closeBtnResponsiv').classList.add('arrowCloseResponsiv');
    }

    window.addEventListener('resize', function(event){
        if(this.window.innerWidth > 830) {
           document.getElementById('contactRightFlex').classList.remove('addRightResponsiv');
           document.getElementById('contactRightFlex').classList.add('show-contact-right');
           document.getElementById('closeBtnResponsiv').classList.remove('arrowCloseResponsiv');

       }
   });

}

/**
 * Generates the HTML for displaying detailed contact information.
 * @param {Object} contact - The contact object.
 * @param {number} index - The index of the contact.
 * @param {string} color - The color associated with the contact.
 * @returns {string} The generated HTML string.
 */
function generateContactInfoHTML(contact, index, color) {
    let firstLetterOfFirstName = '';
    let firstLetterOfLastName = '';
    let indexOfEmptySpace = contact.name.search(' ');
    if(indexOfEmptySpace > 0){
        firstLetterOfFirstName = contact.name.split(" ")[0][0].toUpperCase();
        firstLetterOfLastName = contact.name.split(" ")[1][0].toUpperCase();
    } else {
        firstLetterOfFirstName = contact.name[0];
        firstLetterOfLastName = '';
    }
    
    return generateContactInfo(contact, index, color, firstLetterOfFirstName, firstLetterOfLastName);
}

function getFirstLetterOfFirstName(contact) {
    return contact.name.split(" ")[0][0].toLocaleUpperCase();
}

function generateColors() {
    return ["#FF5733", "#33FF57", "#5733FF", "#FF33F9", "#33F9FF"];
}

/**
 * Checks if the first letter of the first name is different from the current letter.
 * @param {string} firstLetterOfFirstName - The first letter of the first name.
 * @param {string} currentLetter - The current letter being compared.
 * @returns {boolean} True if the first letter is different, otherwise false.
 */
function isFirstLetterDifferent(firstLetterOfFirstName, currentLetter) {
    return firstLetterOfFirstName !== currentLetter;
}

async function deleteContact(index) {
    contacts.splice(index, 1);
    await setItem('contactsjoin', JSON.stringify(contacts));
    renderContacts();
    renderContactsSite();
}

function initializeCurrentLetter() {
    let currentLetter = null;
    return currentLetter;
}

function sortContactsAlphabetically() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Adds a new contact to the list of contacts.
 * @param {Event} event - The event that triggered adding a new contact.
 */
async function addNewContact(event) {
    event.preventDefault();

    const name = document.getElementById("nameValueOne").value;
    const email = document.getElementById("emailValueOne").value;
    const phone = document.getElementById("phoneValueOne").value;

    if (contacts.some((contact) => contact.email === email)) {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "A contact with the same email already exists!";
        errorMessage.style.color = "red";
        return;
    }

    const newContact = {
        name,
        email,
        phone,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };

    contacts.push(newContact);
    await setItem('contactsjoin', JSON.stringify(contacts));

    renderContacts();
    renderContactsSite();
    closeWindow();
}

async function addEditContact(id) {
    const name = document.getElementById('nameValueTwo').value;
    const email = document.getElementById('emailValueTwo').value;
    const phone = document.getElementById('phoneValueTwo').value;
    const color = contacts[id]['color'];
    const editedContact = {
        name,
        email,
        phone,
        color
        // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };

    contacts[id] = editedContact;
    await setItem('contactsjoin', JSON.stringify(contacts));

    renderContacts();
    renderContactsSite();
    displayContactInfo(id, color);
    closeWindow();
}

function openEditContact(index) {
    const contact = contacts[index];
    document.getElementById('nameValueTwo').value = contact.name;
    document.getElementById('emailValueTwo').value = contact.email;
    document.getElementById('phoneValueTwo').value = contact.phone;
    try {
        document.getElementById('openedPopUpForm').id = index;
        openedPopUpFormID = index;
    } catch (e) {
        document.getElementById(openedPopUpFormID).id = index;
    }

    if (window.innerWidth < 830) {
        const contactsShow = document.getElementById('contactsShow');
        const contactList = document.querySelector('.contact-list');
        contactsShow.style.display = 'flex';
        contactList.style.display = 'none';
    }

    document.getElementById('editPopUp').style.display = 'flex';
}

function closeEditWindow() {
    document.getElementById('editPopUp').style.display = 'none';
    document.getElementById('contactListResponsiv').style.display='flex';
}

function openContactForm() {
    document.getElementById("contactPopUp").style.display = "flex";
}

function closeWindow() {
    document.getElementById("contactPopUp").style.display = "none";
}
  
function closeInfoResponsiv(){
    document.getElementById('contactRightFlex').classList.remove('addRightResponsiv');
    document.getElementById('closeBtnResponsiv').classList.remove('arrowCloseResponsiv');
}
  



