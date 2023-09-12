let contacts = [];

function renderContacts() {
    let content = document.getElementById("dashboard-content");
    content.innerHTML = "";
    content.innerHTML += returnRenderHTML();
  
    let contactListElement = document.getElementById("firstLetterContainer");
    contactListElement.innerHTML = "";
  
    contacts.sort((a, b) => a.name.localeCompare(b.name));
  
    let currentLetter = null;
  
    for (let contact of contacts) {
      let firstLetter = contact.name.charAt(0).toUpperCase();
  
      if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
  
        contactListElement.innerHTML += `
              <span>${currentLetter}</span>
            
            <div class="list-of-contacts" id="contacts-${currentLetter.toLowerCase()}"></div>
        `;
      }
  
      let letterContactsElement = document.getElementById(`contacts-${currentLetter.toLowerCase()}`);
  
      letterContactsElement.innerHTML += `
        <div class="contact-profil-img">
        <span class="profil-icon"></span>
          <span>${contact.name.charAt(0)}</span>
        </div>
        <div class="name-email">
          <div class="name">
            <span>${contact.name}</span>
          </div>
          <div class="email">
            ${contact.email}
          </div>
          <div class="number">${contact.phone}</div>
        </div>
      `;
    }
  }
  


function returnRenderHTML(){
    return /*html*/ `
    <div class="contact-container">
        <div class="contact-content">
        <div class="contact-list">
        <div class="button-container">
        <button id="addContactBtn" onclick="openContactForm()">Add new contact</button>
        </div>
        <div id="firstLetterContainer" class="first-letter-of-name">
            <div class="letter-container">
            <span>A</span>
            </div>
            <div class="img-container">
            <svg width="354" height="2" viewBox="0 0 354 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round"/>
                    </svg>
            </div>
        </div>
        <div class="list-of-contacts" id="contact-list">
            <div class="contact-profil-img">
            
            </div>
            <div class="name-email">
            <div class="name">
            <span></span>
            </div>
            <div class="email">
            </div>
            <div class="number">
            </div>
        </div>
        </div>    

    </div>
    <div class="showContactRight">
        <div class="contacts-header">
            <h1>Contacts</h1>
            </div>
        </div>
    <div style="display:none;" id="contactPopUp" class="contact-pop-up">
            <div class="pup-up-content" action="">
    <div class="pop-up-left">
     <div class="join-logo">
     <svg width="57" height="67" viewBox="0 0 57 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Capa 2">
        <g id="Capa 1">
        <path id="Vector" d="M40.7397 0H28.4242V13.8957H40.7397V0Z" fill="white"/>
        <path id="Vector_2" d="M28.4243 25.197H40.7397V44.7947C40.796 49.5105 39.4275 54.1362 36.8083 58.0839C34.222 61.9194 29.2295 66.4829 19.9929 66.4829C9.93211 66.4829 4.06806 61.8167 0.903931 59.2597L8.67215 49.8621C11.7605 52.3352 14.7351 54.3696 20.0403 54.3696C24.057 54.3696 25.658 52.7645 26.5959 51.3646C27.8709 49.4203 28.5304 47.1465 28.4906 44.8321L28.4243 25.197Z" fill="white"/>
        <path id="Vector_3" d="M22.1434 16.4248H9.82792V28.5567H22.1434V16.4248Z" fill="#29ABE2"/>
        <path id="Vector_4" d="M47.1911 60.7904C47.1911 63.3754 45.8554 64.7659 43.9891 64.7659C42.1228 64.7659 40.9008 63.1141 40.9008 60.9211C40.9008 58.728 42.1607 56.9922 44.0933 56.9922C46.0259 56.9922 47.1911 58.7 47.1911 60.7904ZM42.3312 60.8931C42.3312 62.4516 42.966 63.5994 44.0554 63.5994C45.1449 63.5994 45.7606 62.3862 45.7606 60.7997C45.7606 59.4092 45.1922 58.1027 44.0554 58.1027C42.9186 58.1027 42.3312 59.3626 42.3312 60.8931Z" fill="white"/>
        <path id="Vector_5" d="M49.6353 57.104V64.6445H48.2711V57.104H49.6353Z" fill="white"/>
        <path id="Vector_6" d="M51.1131 64.6445V57.104H52.6289L54.2583 60.2116C54.6778 61.0242 55.051 61.8592 55.3762 62.7127C55.2909 61.7795 55.253 60.7063 55.253 59.5117V57.104H56.5035V64.6445H55.092L53.4436 61.4715C53.0072 60.638 52.6182 59.7812 52.2784 58.9051C52.2784 59.8384 52.3447 60.8929 52.3447 62.1901V64.6351L51.1131 64.6445Z" fill="white"/>
        </g>
        </g>
        </svg>
     </div>
        <h1>Add Contact</h1>
        <span>Tasks are better with a team!</span>
        <div class="blue-line"></div>
    </div>
    <div class="pop-up-right">
        <div onclick="closeWindow()" class="closeBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="close">
        <mask id="mask0_83890_4117" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect id="Bounding box" width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_83890_4117)">
        <path id="close_2" d="M12 13.4L7.10005 18.3C6.91672 18.4834 6.68338 18.575 6.40005 18.575C6.11672 18.575 5.88338 18.4834 5.70005 18.3C5.51672 18.1167 5.42505 17.8834 5.42505 17.6C5.42505 17.3167 5.51672 17.0834 5.70005 16.9L10.6 12L5.70005 7.10005C5.51672 6.91672 5.42505 6.68338 5.42505 6.40005C5.42505 6.11672 5.51672 5.88338 5.70005 5.70005C5.88338 5.51672 6.11672 5.42505 6.40005 5.42505C6.68338 5.42505 6.91672 5.51672 7.10005 5.70005L12 10.6L16.9 5.70005C17.0834 5.51672 17.3167 5.42505 17.6 5.42505C17.8834 5.42505 18.1167 5.51672 18.3 5.70005C18.4834 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4834 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4834 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4834 18.1167 18.3 18.3C18.1167 18.4834 17.8834 18.575 17.6 18.575C17.3167 18.575 17.0834 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
        </g>
        </g>
        </svg>
        </div>
        <div class="icon">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Group 9">
        <circle id="Ellipse 5" cx="60" cy="60" r="60" fill="#D1D1D1"/>
        </g>
        </svg>
        </div>
        <div  class="contactinput">
            <form onsubmit="addNewContact(event);return false;">
                <div class="input-img">
                <input required  placeholder="Name" id="name" type="text">
                </div>
                <div>
                <input required class="contactMail" placeholder="Email" id="email" type="email">
                </div>
                <input required placeholder="Phone number" id="number" type="number">

                <div class="contactBtn">
                <button class="cancelBtn">Cancel</button>
                <button class="createBtn">Create Contact
                    <img src="assets/img/close.svg" alt="">
                </button>
                </div>
            </form>

        </div>
    </div>
    </div>
    </div>
    </div>

        </div>
    `;
}

function addNewContact(event) {
    event.preventDefault();
  
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("number").value;
  
    let newContact = {
      name: name,
      email: email,
      phone: phone,
    };
  
    contacts.push(newContact);
  
    renderContacts();
    closeWindow();
  }

function openContactForm() {
  document.getElementById("contactPopUp").style.display = "flex";
}

function closeWindow() {
  document.getElementById("contactPopUp").style.display = "none";
}


