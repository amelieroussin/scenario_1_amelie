class displayHeartbeat extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    async loadContent() {
      const [html, css] = await Promise.all([
        fetch('/wc/display-heartbeat/display-heartbeat.html').then(res => res.text()),
        fetch('/wc/display-heartbeat/display-heartbeat.css').then(res => res.text())
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
      console.log('--- in connectedCallback of heartbeat ---');
      this.checkHeartbeat();
    }
    
    async checkHeartbeat() {
    console.log('--- in checkHeartbeat ---');
    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 15000);

    try {
      const response = await fetch('https://api.amelieroussin.ca/heartbeat', {
        signal: ctrl.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      console.log('data:', data);

      if (data.errorCode === 0) {
        this.shadowRoot.querySelector('#enLigne')?.classList.remove('hidden');
        this.shadowRoot.querySelector('#horsLigne')?.classList.add('hidden');
      } else {
        throw new Error('Erreur logique');
      }

    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Erreur réseau ou timeout:', err);
      this.shadowRoot.querySelector('#enLigne')?.classList.add('hidden');
      this.shadowRoot.querySelector('#horsLigne')?.classList.remove('hidden');
    }
  }
}

customElements.define('display-heartbeat', displayHeartbeat);