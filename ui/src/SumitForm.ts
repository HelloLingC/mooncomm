import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as env from './config/env'
import { Comment } from './types/CommentIntl';

@customElement('mooncomm-input')
export class CommentForm extends LitElement {
  static styles = css`
  .mooncomm-input {
    display: flex;
    flex-direction: column;
  }
  .mooncomm-input-top {
    display: flex;
    width: 100%;
  }
  
  .mooncomm-input-top input {
    flex: 1;
  }

  button {
    background-color: rgb(245, 245, 245);;
    border: 3px solid #ccc; /* Border */
    color: black;
            margin: 5px;
            padding: 10px 20px; /* Padding */
            font-size: 16px; /* Font size */
            border-radius: 5px; /* Rounded corners */
            cursor: pointer; /* Pointer cursor on hover */
            transition: border-color 0.3s ease; /* Smooth transition for border color */
    }

    button:hover {
        border-color: #00BFFF; /* Brightened border color on hover */
    }
  `;

@property() accessor isRequired = true;

@property()
  accessor comment: Comment = {
    nickname: '',
    email: '',
    website: '',
    comment: '',
    page_title: '',
    page_id: '',
    reply_to: 0
  };


  render() {
    return html`
      <form class="mooncomm-input" @submit="${this.submitForm}">
        <div class="mooncomm-input-top">
          <input name="nickname" class="mooncomm-nickname" type="text" ?required="${this.isRequired}" placeholder="Nickname">
          <input name="email" class="mooncomm-email" type="text" placeholder="Email">
          <input name="website" class="mooncomm-website" type="text" placeholder="Website">
        </div>
        <textarea name="comment" class="mooncomm-input-comment" rows="3" ?required="${this.isRequired}" placeholder="Comment"></textarea>
        <button type="submit" class="mooncomm-submit">Post</button>
        <span>Powered by <a href="https://comment.moonlab.top">MoonComm</a></span>
        </form>
    `;
  }

  submitForm(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    this.comment = {
      nickname: formData.get('nickname') as string,
      email: formData.get('email') as string,
      website: formData.get('website') as string,
      comment: formData.get('comment') as string,
      page_title: document.title,
      page_id: window.location.href,
      reply_to: 0
    };

    console.log('Submit:', this.comment);
    fetch(`${env.API_HOST}/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.comment),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 'error') {
          alert(data.message)
          return 
        } 

      })
      .catch((error) => console.error('Err when submitting comment: ', error));
  }

}