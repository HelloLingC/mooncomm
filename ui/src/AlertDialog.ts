import { LitElement, html, css } from 'lit';
import { state, property } from 'lit/decorators';

export class AlertDialog extends LitElement {
  static styles = css`
    :host {
      display: none; /* 默认隐藏 */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
    }

    .dialog {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
    }

    .dialog h2 {
      margin-top: 0;
    }

    .dialog button {
      margin-top: 10px;
      padding: 8px 16px;
      background-color: #0078d4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .dialog button:hover {
      background-color: #005bb5;
    }
  `;

  @state()
  open = false;
  @state()
  message = '';

  render() {
    return html`
      <div class="dialog" ?hidden="${!this.open}">
        <h2>Alert</h2>
        <p>${this.message}</p>
        <button @click="${this.close}">OK</button>
      </div>
    `;
  }

  show(message: string) {
    this.message = message;
    this.open = true;
  }

  close() {
    this.open = false;
  }
}

customElements.define('alert-dialog', AlertDialog);