let contacts = [];
openedPopUpFormID = 'openedPopUpForm';

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


function generateLetterContainer(currentLetter) {
    return `
        <div class="letter-container">
            <span style="font-size:27px;border-bottom:2px solid lightgray;display:flex;padding:10px;">${currentLetter}</span>
        </div>
    `;
}

function generateContactHTML(contact, i, color) {
    let firstLetterOfFirstName = '';
    let firstLetterOfLastName = '';
    let indexOfEmptySpace = contact.name.search(' ');
    if(indexOfEmptySpace >0){
        firstLetterOfFirstName = contact.name.split(" ")[0][0].toUpperCase();
        firstLetterOfLastName = contact.name.split(" ")[1][0].toUpperCase();
    }
    else{
        firstLetterOfFirstName = contact.name[0];
        firstLetterOfLastName = '';
    }
    return /*html*/ `
        <div id="contact-${i}" onclick="displayContactInfo(${i}, '${color}')"  class="list-of-contacts">
            <div class="contact-profil-img">
                <span class="profil-icon"  style="background-color: ${color};" id="firstLetterOfContact">
                    ${firstLetterOfFirstName}${firstLetterOfLastName}
                </span>
            </div>
            <div class="name-email">
                <div class="name">
                    <span class="contact-name">${contact.name}</span>
                </div>
                <div class="email ">${contact.email}</div>
                <div class="number">${contact.phone}</div>
            </div>
        </div>
    `;
}

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

    if(window.innerWidth < 900){
        document.getElementById('closeBtnResponsiv').style.display="flex";
        document.getElementById('closeBtnResponsiv').classList.add('arrowCloseResponsiv');
        document.getElementById('contactRightFlex').style.display='flex';
        document.getElementById('contactRightFlex').classList.add('contact-right-responsiv');
    }else{
        document.getElementById('closeBtnResponsiv').classList.add('arrowCloseResponsiv');

    }

    // if(window.innerWidth > 900){
    //     document.getElementById('contactRightFlex').classList.remove('contact-right-responsiv');
    // }
}

function generateContactInfoHTML(contact, index, color) {
    let firstLetterOfFirstName = '';
    let firstLetterOfLastName = '';
    let indexOfEmptySpace = contact.name.search(' ');
    if(indexOfEmptySpace >0){
        firstLetterOfFirstName = contact.name.split(" ")[0][0].toUpperCase();
        firstLetterOfLastName = contact.name.split(" ")[1][0].toUpperCase();
    }
    else{
        firstLetterOfFirstName = contact.name[0];
        firstLetterOfLastName = '';
    }
    return /*html*/ `
<div class="contact-info">
    <div class="info-name">
        <div id="bgcContacts" style="background-color: ${color};" class="profil-icon-right">
            ${firstLetterOfFirstName}${firstLetterOfLastName}</div>
        <div class="edit-delete-name">
            <span class="name-contact">${contact.name}</span>
            <div class="edit-delete">
                <div onclick="openEditContact(${index})" id="edit-contact" class="edit-delete-Hover">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="edit">
                            <mask id="mask0_84485_4268" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="24" height="24">
                                <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_84485_4268)">
                                <path id="edit_2"
                                    d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                    fill="#2A3647" />
                            </g>
                        </g>
                    </svg>
                    Edit
                </div>
                <div onclick="deleteContact(${index})" id="deleteContactDiv" class="edit-delete-Hover">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="delete">
                            <mask id="mask0_84485_4113" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="24" height="24">
                                <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_84485_4113)">
                                <path id="delete_2"
                                    d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                                    fill="#2A3647" />
                            </g>
                        </g>
                    </svg>
                    Delete
                </div>
            </div>
        </div>
    </div>
    <div style="font-size:23px;margin-top:50px;">Contact Information</div>
    <a class="info" href="mailto:${contact.email}">
        <label>Email</label>
        <span>${contact.email}</span>
    </a>

    <a class="info" href="tel:${contact.phone}">
        <label>Phone</label>
        <span>${contact.phone}</span>
    </a>
</div>
${generateEditContactPopupHTML(index)}
`;
}

function generateEditContactPopupHTML() {
    return /*html*/ `
<div style="display:none;" id="editPopUp" class="contact-pop-up">
    <div class="pup-up-content" action="">
        <div class="pop-up-left">
            <div class="join-logo">
                <svg width="57" height="67" viewBox="0 0 57 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Capa 2">
                        <g id="Capa 1">
                            <path id="Vector" d="M40.7397 0H28.4242V13.8957H40.7397V0Z" fill="white" />
                            <path id="Vector_2"
                                d="M28.4243 25.197H40.7397V44.7947C40.796 49.5105 39.4275 54.1362 36.8083 58.0839C34.222 61.9194 29.2295 66.4829 19.9929 66.4829C9.93211 66.4829 4.06806 61.8167 0.903931 59.2597L8.67215 49.8621C11.7605 52.3352 14.7351 54.3696 20.0403 54.3696C24.057 54.3696 25.658 52.7645 26.5959 51.3646C27.8709 49.4203 28.5304 47.1465 28.4906 44.8321L28.4243 25.197Z"
                                fill="white" />
                            <path id="Vector_3" d="M22.1434 16.4248H9.82792V28.5567H22.1434V16.4248Z" fill="#29ABE2" />
                            <path id="Vector_4"
                                d="M47.1911 60.7904C47.1911 63.3754 45.8554 64.7659 43.9891 64.7659C42.1228 64.7659 40.9008 63.1141 40.9008 60.9211C40.9008 58.728 42.1607 56.9922 44.0933 56.9922C46.0259 56.9922 47.1911 58.7 47.1911 60.7904ZM42.3312 60.8931C42.3312 62.4516 42.966 63.5994 44.0554 63.5994C45.1449 63.5994 45.7606 62.3862 45.7606 60.7997C45.7606 59.4092 45.1922 58.1027 44.0554 58.1027C42.9186 58.1027 42.3312 59.3626 42.3312 60.8931Z"
                                fill="white" />
                            <path id="Vector_5" d="M49.6353 57.104V64.6445H48.2711V57.104H49.6353Z" fill="white" />
                            <path id="Vector_6"
                                d="M51.1131 64.6445V57.104H52.6289L54.2583 60.2116C54.6778 61.0242 55.051 61.8592 55.3762 62.7127C55.2909 61.7795 55.253 60.7063 55.253 59.5117V57.104H56.5035V64.6445H55.092L53.4436 61.4715C53.0072 60.638 52.6182 59.7812 52.2784 58.9051C52.2784 59.8384 52.3447 60.8929 52.3447 62.1901V64.6351L51.1131 64.6445Z"
                                fill="white" />
                        </g>
                    </g>
                </svg>
            </div>
            <h1>Add Contact</h1>
            <span>Tasks are better with a team!</span>
            <div class="blue-line"> </div>
        </div>
        <div class="pop-up-right">
            <div onclick="closeEditWindow()" class="closeBtn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="close">
                        <mask id="mask0_83890_4117" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="24" height="24">
                            <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_83890_4117)">
                            <path id="close_2"
                                d="M12 13.4L7.10005 18.3C6.91672 18.4834 6.68338 18.575 6.40005 18.575C6.11672 18.575 5.88338 18.4834 5.70005 18.3C5.51672 18.1167 5.42505 17.8834 5.42505 17.6C5.42505 17.3167 5.51672 17.0834 5.70005 16.9L10.6 12L5.70005 7.10005C5.51672 6.91672 5.42505 6.68338 5.42505 6.40005C5.42505 6.11672 5.51672 5.88338 5.70005 5.70005C5.88338 5.51672 6.11672 5.42505 6.40005 5.42505C6.68338 5.42505 6.91672 5.51672 7.10005 5.70005L12 10.6L16.9 5.70005C17.0834 5.51672 17.3167 5.42505 17.6 5.42505C17.8834 5.42505 18.1167 5.51672 18.3 5.70005C18.4834 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4834 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4834 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4834 18.1167 18.3 18.3C18.1167 18.4834 17.8834 18.575 17.6 18.575C17.3167 18.575 17.0834 18.4834 16.9 18.3L12 13.4Z"
                                fill="#2A3647" />
                        </g>
                    </g>
                </svg>
            </div>
            <div class="icon">
                <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="person">
                        <mask id="mask0_84485_2192" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="24" height="24">
                            <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_84485_2192)">
                            <path id="person_2"
                                d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                                fill="#A8A8A8" />
                        </g>
                    </g>
                </svg>

            </div>
            <div class="contactinput">
                <!-- <form class="input-pop-up" onsubmit="addEditContact(event);return false;"> -->
                <form id="openedPopUpForm" class="input-pop-up" onsubmit="addEditContact(this.id);return false;">
                    <div class="input-img">
                        <input required placeholder="Name" id="nameValueTwo" type="text">
                        <svg class="svgStyleInput" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="person">
                                <mask id="mask0_84485_2192" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_84485_2192)">
                                    <path id="person_2"
                                        d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                                        fill="#A8A8A8" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="input-img">
                        <input required class="contactMail" placeholder="Email" id="emailValueTwo" type="email">
                        <svg class="svgStyleInput" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="mail">
                                <mask id="mask0_84485_2199" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_84485_2199)">
                                    <path id="mail_2"
                                        d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z"
                                        fill="#A8A8A8" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="input-img">
                        <input required id="phoneValueTwo" placeholder="Phone number" onwheel="this.blur();">
                        <svg class="svgStyleInput" width="24" height="25" viewBox="0 0 24 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="call">
                                <mask id="mask0_84485_2206" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="25">
                                    <rect id="Bounding box" y="0.5" width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_84485_2206)">
                                    <path id="call_2"
                                        d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z"
                                        fill="#A8A8A8" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="contactBtn">
                        <button type="reset" onclick="closeEditWindow()" class="cancelBtn" type="cancel">
                            Cancel
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="iconoir:cancel">
                                    <path id="Vector"
                                        d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                                        stroke="#2A3647" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </g>
                            </svg>
                        </button>
                        <button type="submit" class="createBtn">
                            Save Contact
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="check">
                                    <mask id="mask0_84485_3902" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="24" height="25">
                                        <rect id="Bounding box" y="0.5" width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_84485_3902)">
                                        <path id="check_2"
                                            d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z"
                                            fill="white" />
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
`;
}

function returnRenderHTML() {
    return /*html*/ `
<div class="contact-container">
    <div style="display:none;" id="contactPopUp" class="contact-pop-up">
        <div class="pup-up-content" action="">
            <div class="pop-up-left">
                <div class="join-logo">
                    <svg width="57" height="67" viewBox="0 0 57 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Capa 2">
                            <g id="Capa 1">
                                <path id="Vector" d="M40.7397 0H28.4242V13.8957H40.7397V0Z" fill="white" />
                                <path id="Vector_2"
                                    d="M28.4243 25.197H40.7397V44.7947C40.796 49.5105 39.4275 54.1362 36.8083 58.0839C34.222 61.9194 29.2295 66.4829 19.9929 66.4829C9.93211 66.4829 4.06806 61.8167 0.903931 59.2597L8.67215 49.8621C11.7605 52.3352 14.7351 54.3696 20.0403 54.3696C24.057 54.3696 25.658 52.7645 26.5959 51.3646C27.8709 49.4203 28.5304 47.1465 28.4906 44.8321L28.4243 25.197Z"
                                    fill="white" />
                                <path id="Vector_3" d="M22.1434 16.4248H9.82792V28.5567H22.1434V16.4248Z"
                                    fill="#29ABE2" />
                                <path id="Vector_4"
                                    d="M47.1911 60.7904C47.1911 63.3754 45.8554 64.7659 43.9891 64.7659C42.1228 64.7659 40.9008 63.1141 40.9008 60.9211C40.9008 58.728 42.1607 56.9922 44.0933 56.9922C46.0259 56.9922 47.1911 58.7 47.1911 60.7904ZM42.3312 60.8931C42.3312 62.4516 42.966 63.5994 44.0554 63.5994C45.1449 63.5994 45.7606 62.3862 45.7606 60.7997C45.7606 59.4092 45.1922 58.1027 44.0554 58.1027C42.9186 58.1027 42.3312 59.3626 42.3312 60.8931Z"
                                    fill="white" />
                                <path id="Vector_5" d="M49.6353 57.104V64.6445H48.2711V57.104H49.6353Z" fill="white" />
                                <path id="Vector_6"
                                    d="M51.1131 64.6445V57.104H52.6289L54.2583 60.2116C54.6778 61.0242 55.051 61.8592 55.3762 62.7127C55.2909 61.7795 55.253 60.7063 55.253 59.5117V57.104H56.5035V64.6445H55.092L53.4436 61.4715C53.0072 60.638 52.6182 59.7812 52.2784 58.9051C52.2784 59.8384 52.3447 60.8929 52.3447 62.1901V64.6351L51.1131 64.6445Z"
                                    fill="white" />
                            </g>
                        </g>
                    </svg>
                </div>
                <h1>Add Contact</h1>
                <span>Tasks are better with a team!</span>
                <div class="blue-line"> </div>
            </div>
            <div class="pop-up-right">
                <div onclick="closeWindow()" class="closeBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="close">
                            <mask id="mask0_83890_4117" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="24" height="24">
                                <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_83890_4117)">
                                <path id="close_2"
                                    d="M12 13.4L7.10005 18.3C6.91672 18.4834 6.68338 18.575 6.40005 18.575C6.11672 18.575 5.88338 18.4834 5.70005 18.3C5.51672 18.1167 5.42505 17.8834 5.42505 17.6C5.42505 17.3167 5.51672 17.0834 5.70005 16.9L10.6 12L5.70005 7.10005C5.51672 6.91672 5.42505 6.68338 5.42505 6.40005C5.42505 6.11672 5.51672 5.88338 5.70005 5.70005C5.88338 5.51672 6.11672 5.42505 6.40005 5.42505C6.68338 5.42505 6.91672 5.51672 7.10005 5.70005L12 10.6L16.9 5.70005C17.0834 5.51672 17.3167 5.42505 17.6 5.42505C17.8834 5.42505 18.1167 5.51672 18.3 5.70005C18.4834 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4834 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4834 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4834 18.1167 18.3 18.3C18.1167 18.4834 17.8834 18.575 17.6 18.575C17.3167 18.575 17.0834 18.4834 16.9 18.3L12 13.4Z"
                                    fill="#2A3647" />
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="icon">

                    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="person">
                            <mask id="mask0_84485_2192" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="24" height="24">
                                <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_84485_2192)">
                                <path id="person_2"
                                    d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                                    fill="#A8A8A8" />
                            </g>
                        </g>
                    </svg>

<<<<<<< HEAD
      </div>
      <div  class="contactinput">
          <form class="input-pop-up" onsubmit="addNewContact(event);return false;">
              <div class="input-img">
              <input required  placeholder="Name" id="nameValueOne" type="text">
              <svg class="svgStyleInput" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="person">
              <mask id="mask0_84485_2192" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect id="Bounding box" width="24" height="24" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_84485_2192)">
              <path id="person_2" d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z" fill="#A8A8A8"/>
              </g>
              </g>
              </svg>
              </div>
              <div class="input-img">
              <input required class="contactMail" placeholder="Email" id="emailValueOne" type="email">
              <svg class="svgStyleInput" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="mail">
<mask id="mask0_84485_2199" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect id="Bounding box" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_84485_2199)">
<path id="mail_2" d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z" fill="#A8A8A8"/>
</g>
</g>
</svg>
              </div>
              <div class="input-img">
              <input  placeholder="Phone number" onwheel="this.blur();"  id="phoneValueOne" type="number">
              <svg class="svgStyleInput" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="call">
<mask id="mask0_84485_2206" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
<rect id="Bounding box" y="0.5" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_84485_2206)">
<path id="call_2" d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z" fill="#A8A8A8"/>
</g>
</g>
</svg>
              </div>
              <div class="contactBtn">
              <button class="cancelBtn" type="cancel">
                Cancel
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="iconoir:cancel">
                <path id="Vector" d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
=======
                </div>
                <div class="contactinput">
                    <form class="input-pop-up" onsubmit="addNewContact(event);return false;">
                        <div class="input-img">
                            <input required placeholder="Name" id="nameValueOne" type="text" name="name">
                            <svg class="svgStyleInput" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="person">
                                    <mask id="mask0_84485_2192" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="24" height="24">
                                        <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_84485_2192)">
                                        <path id="person_2"
                                            d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                                            fill="#A8A8A8" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="input-img">
                            <input required class="contactMail" placeholder="Email" id="emailValueOne" type="email"
                                name="email">
                            <svg class="svgStyleInput" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="mail">
                                    <mask id="mask0_84485_2199" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="24" height="24">
                                        <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_84485_2199)">
                                        <path id="mail_2"
                                            d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z"
                                            fill="#A8A8A8" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="input-img">
                            <input placeholder="Phone number" onwheel="this.blur();" id="phoneValueOne" type="number">
                            <svg class="svgStyleInput" width="24" height="25" viewBox="0 0 24 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="call">
                                    <mask id="mask0_84485_2206" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="24" height="25">
                                        <rect id="Bounding box" y="0.5" width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_84485_2206)">
                                        <path id="call_2"
                                            d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z"
                                            fill="#A8A8A8" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="contactBtn">
                            <div onclick="closeWindow()" class="cancelBtn">
                                Cancel
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="iconoir:cancel">
                                        <path id="Vector"
                                            d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                                            stroke="#2A3647" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </div>
                            <button class="createBtn">
                                Create Contact
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="check">
                                        <mask id="mask0_84485_3902" style="mask-type:alpha" maskUnits="userSpaceOnUse"
                                            x="0" y="0" width="24" height="25">
                                            <rect id="Bounding box" y="0.5" width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_84485_3902)">
                                            <path id="check_2"
                                                d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z"
                                                fill="white" />
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div class="message" id="errorMessage"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div class="contact-content">
    <div id="contactListResponsiv" class="contact-list">
        <div class="button-container">
            <button id="addContactBtn" onclick="openContactForm()">Add new contact
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="person_add">
                        <mask id="mask0_84485_4563" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="33" height="33">
                            <rect id="Bounding box" x="0.5" y="0.5" width="32" height="32" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_84485_4563)">
                            <path id="person_add_2"
                                d="M25.8294 19.1667C25.5134 19.1667 25.2499 19.0602 25.0388 18.8473C24.8277 18.6343 24.7222 18.3704 24.7222 18.0556V14.9445H21.611C21.2962 14.9445 21.0323 14.8376 20.8194 14.6239C20.6064 14.4102 20.4999 14.1454 20.4999 13.8295C20.4999 13.5136 20.6064 13.2501 20.8194 13.0389C21.0323 12.8278 21.2962 12.7223 21.611 12.7223H24.7222V9.61115C24.7222 9.29635 24.829 9.03246 25.0427 8.81948C25.2564 8.60653 25.5212 8.50005 25.8372 8.50005C26.1531 8.50005 26.4166 8.60653 26.6277 8.81948C26.8388 9.03246 26.9444 9.29635 26.9444 9.61115V12.7223H30.0555C30.3703 12.7223 30.6342 12.8291 30.8472 13.0428C31.0601 13.2566 31.1666 13.5214 31.1666 13.8373C31.1666 14.1532 31.0601 14.4167 30.8472 14.6278C30.6342 14.8389 30.3703 14.9445 30.0555 14.9445H26.9444V18.0556C26.9444 18.3704 26.8375 18.6343 26.6238 18.8473C26.4101 19.0602 26.1453 19.1667 25.8294 19.1667ZM12.4999 16.4778C11.0333 16.4778 9.81473 15.9926 8.84435 15.0223C7.874 14.0519 7.38882 12.8334 7.38882 11.3667C7.38882 9.90005 7.874 8.68154 8.84435 7.71118C9.81473 6.7408 11.0333 6.25562 12.4999 6.25562C13.9666 6.25562 15.1851 6.7408 16.1555 7.71118C17.1258 8.68154 17.611 9.90005 17.611 11.3667C17.611 12.8334 17.1258 14.0519 16.1555 15.0223C15.1851 15.9926 13.9666 16.4778 12.4999 16.4778ZM2.94435 27.1667C2.62955 27.1667 2.36566 27.0602 2.15269 26.8473C1.93973 26.6343 1.83325 26.3704 1.83325 26.0556V23.8334C1.83325 23.063 2.0314 22.3612 2.42769 21.7279C2.824 21.0945 3.3666 20.6186 4.05549 20.3C5.62586 19.5815 7.08022 19.0649 8.41855 18.75C9.75691 18.4352 11.1162 18.2779 12.4963 18.2779C13.8765 18.2779 15.237 18.4352 16.5777 18.75C17.9184 19.0649 19.3666 19.5815 20.9222 20.3C21.611 20.6334 22.1573 21.113 22.561 21.7389C22.9647 22.3649 23.1666 23.063 23.1666 23.8334V26.0556C23.1666 26.3704 23.0601 26.6343 22.8472 26.8473C22.6342 27.0602 22.3703 27.1667 22.0555 27.1667H2.94435ZM4.05545 24.9445H20.9444V23.8334C20.9444 23.5149 20.8648 23.2149 20.7055 22.9334C20.5462 22.6519 20.3073 22.4408 19.9888 22.3C18.5518 21.5963 17.2629 21.1204 16.1222 20.8723C14.9814 20.6241 13.774 20.5 12.4999 20.5C11.2259 20.5 10.0184 20.6278 8.87769 20.8834C7.73695 21.1389 6.44066 21.6112 4.98882 22.3C4.69991 22.4408 4.47212 22.6519 4.30545 22.9334C4.13879 23.2149 4.05545 23.5149 4.05545 23.8334V24.9445ZM12.4999 14.2556C13.3221 14.2556 14.0092 13.9797 14.561 13.4278C15.1129 12.876 15.3888 12.1889 15.3888 11.3667C15.3888 10.5445 15.1129 9.85746 14.561 9.30562C14.0092 8.75375 13.3221 8.47782 12.4999 8.47782C11.6777 8.47782 10.9907 8.75375 10.4388 9.30562C9.88695 9.85746 9.61102 10.5445 9.61102 11.3667C9.61102 12.1889 9.88695 12.876 10.4388 13.4278C10.9907 13.9797 11.6777 14.2556 12.4999 14.2556Z"
                                fill="white" />
                        </g>
                    </g>
                </svg>
            </button>
        </div>
        <div id="firstLetterContainer" class="first-letter-of-name">
            <div class="letter-container">
                <span></span>
            </div>
            <div class="img-container">
                <svg width="354" height="2" viewBox="0 0 354 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round" />
                </svg>
            </div>
        </div>
    </div>


    <div id="contactRightFlex" class="show-contact-right">
        <div class="d-none" id="closeBtnResponsiv" onclick="closeInfoResponsiv()">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="arrow-left-line">
                    <path id="Vector"
                        d="M13.0097 17.8855H30.1871C31.0362 17.8855 31.7246 18.5739 31.7246 19.4231C31.7246 20.2722 31.0362 20.9606 30.1871 20.9606H13.0097L20.17 28.1209C20.7704 28.7213 20.7704 29.6946 20.17 30.295C19.5697 30.8954 18.5963 30.8954 17.996 30.295L8.53824 20.8373C7.75719 20.0562 7.75719 18.7899 8.53824 18.0089L17.996 8.55115C18.5963 7.9508 19.5697 7.9508 20.17 8.55115C20.7704 9.1515 20.7704 10.1249 20.17 10.7252L13.0097 17.8855Z"
                        fill="#29ABE2" />
>>>>>>> bd7d5a97873305943d4867b2a91ae5f1001f993f
                </g>
            </svg>

        </div>
        <div class="showContactRight">
            <div class="contacts-header">
                <h1>Contacts</h1>
                <div class="vertical-line">
                    <svg width="4" height="63" viewBox="0 0 4 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector 5" d="M2 2V61" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </div>
                <div class="responsiv-line">
                    <svg width="94" height="4" viewBox="0 0 94 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector 5" d="M92 2L2 2" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </div>
                <span>Better with a Team</span>
            </div>
            <div id="contactsShow" class="contact-onlick-content"></div>

        </div>
    </div>
`;


}

function getFirstLetterOfFirstName(contact) {
    return contact.name.split(" ")[0][0].toLocaleUpperCase();
}

function generateColors() {
    return ["#FF5733", "#33FF57", "#5733FF", "#FF33F9", "#33F9FF"];
}

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
        toggleShowContactRight();
    }

    document.getElementById('editPopUp').style.display = 'flex';
}

function closeEditWindow() {
    document.getElementById('editPopUp').style.display = 'none';
}

function openContactForm() {
    document.getElementById("contactPopUp").style.display = "flex";
}

function closeWindow() {
    document.getElementById("contactPopUp").style.display = "none";
}
  
function closeInfoResponsiv(){
    document.getElementById('contactRightFlex').style.display='none';
}
  



