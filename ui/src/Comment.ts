import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getGravatar, getGuestAvatar } from './utils/avatar';
import { Comment } from './types/CommentIntl';

@customElement('mooncomm-comment')
export class CommentElement extends LitElement {

    @property()
    accessor comment: Comment = {
        nickname: '',
        email: '',
        website: '',
        comment: '',
        page_title: '',
        page_id: '',
      };

    render() {
        return html`
        <div class="mooncomm-comment-outer">
            <img class="mooncomm-comment-avatar">
            <div>
              <div class="mooncomm-comment-header">
                <div class="mooncomm-comment-nickname">
                    <a href="${this.comment.website || '#'}" target="_blank">
                    ${this.comment.nickname}</a>
                </div>
                <div class="mooncomm-comment-date"></div>
              </div>
              <div class="mooncomm-comment-content">${this.comment.comment}</div>
              <div class="mooncomm-comment-footer">
                <div class="mooncomm-comment-reply">Reply</div>
                <div class="mooncomm-comment-vote">Vote(${this.comment.votes || 0})</div>
              </div>
            </div>
        </div>
        `
    }

    firstUpdated() {
        getGravatar(this.comment.email).then(async (url) => {
            // Since gravatar will handle the default avatar,
            // no need to handle manually
            // if(url === "") {
            //     url = await getGuestAvatar(this.comment.email)
            //     return;
            // }
            this.shadowRoot?.querySelector('.mooncomm-comment-avatar')?.setAttribute('src', url);
        });
    }

    static styles = css`

.mooncomm-comment-outer {
display: flex;
padding: 15px;
border: 1px solid #e0e0e0;
border-radius: 8px;
margin-bottom: 10px;
background-color: #f9f9f9;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.mooncomm-comment-avatar {
width: 50px;
height: 50px;
border-radius: 50%;
margin-right: 15px;
}

.mooncomm-comment-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 5px;
}

.mooncomm-comment-nickname {
font-weight: bold;
color: #333;
}

.mooncomm-comment-date {
font-size: 0.9em;
color: #888;
}

.mooncomm-comment-content {
margin-bottom: 10px;
color: #444;
}

.mooncomm-comment-footer {
display: flex;
justify-content: space-between;
font-size: 0.9em;
color: #007bff;
}

.mooncomm-comment-footer div {
cursor: pointer;
transition: color 0.3s;
}

.mooncomm-comment-footer div:hover {
color: #0056b3;
}

    `
}