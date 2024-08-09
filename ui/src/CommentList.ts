import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Comment } from './types/CommentIntl';
import * as env from './config/env'

@customElement('mooncomm-list')
export class CommentList extends LitElement {

@property()
accessor comments: Comment[] = [];

firstUpdated() {
    fetch(`${env.API_HOST}/api/get?page_id=${window.location.href}`)
    .then(resp => resp.json())
    .then(data => {
        this.comments = data;
    })
}

  render() {
    return html`
      <div>
          ${this.comments.map(
            (comment) => html`
            <mooncomm-comment .comment=${comment}></mooncomm-comment>
            `
          )}
      </div>
    `;
  }

  static styles = css`
      
  `
}