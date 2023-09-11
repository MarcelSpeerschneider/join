function renderContacts() {
  let content = document.getElementById("dashboard-content");
  content.innerHTML = "";
  content.innerHTML += /*html*/ `
    <div class="contact-container">
        <div class="contact-list">
        <div class="button-container">
        <button>Add new contact</button>
        </div>
        <div class="first-letter-of-name">
            <div class="letter-container">
            <span>A</span>
            </div>
            <div class="img-container">
            <svg width="354" height="2" viewBox="0 0 354 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round"/>
                    </svg>
            </div>
        </div>
        <div class="list-of-contacts">
            <div class="contact-profil-img">
                <span>IG</span>
            </div>
            <div class="name-email">
            <div class="name">
            <span>Ivan Gomes</span>
            </div>
            <div class="email">
                test@test.de
            </div>
        </div>
        </div>
        </div>
        <div class="contact-display">

        </div>
    </div>

    `;
}
