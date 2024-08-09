import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';


@customElement('mooncomm-owo')
export class MoonComm extends LitElement {

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      max-width: 600px;
    }
  `;

  render() {
    return html`
      <div>
        <mooncomm-input></mooncomm-input>
        <h3>0 Comments</h3>
        <mooncomm-list></mooncomm-list>
      </div>
    `;
  }
}