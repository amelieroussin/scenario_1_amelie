class usersList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    async loadContent() {
      const [html, css] = await Promise.all([
        fetch('/wc/users-list/users-list.html').then(res => res.text()),
        fetch('/wc/users-list/users-list.css').then(res => res.text())
      ]);
  
      const style = document.createElement('style');
      style.textContent = css;
  
      const template = document.createElement('template');
      template.innerHTML = html;
  
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    async connectedCallback() {
      await this.loadContent();
    }

    loadUsersFromOutside(users) {
      console.log('--- in loadUsersFromOutside ---');
      const tableBodyTag = this.shadowRoot.querySelector('tbody');
      tableBodyTag.innerHTML = '';

      users.forEach(user => {
        const trTag = document.createElement('tr');
        trTag.id = user.id;

        const tdFirstName = document.createElement('td');
        tdFirstName.textContent = user.firstName;

        const tdLastName = document.createElement('td');
        tdLastName.textContent = user.lastName;

        const tdEmail = document.createElement('td');
        tdEmail.textContent = user.email;

        trTag.appendChild(tdFirstName);
        trTag.appendChild(tdLastName);
        trTag.appendChild(tdEmail);

        tableBodyTag.appendChild(trTag);
      });
    }
  }
  
  customElements.define('users-list', usersList);