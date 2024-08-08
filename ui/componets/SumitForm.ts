import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mooncomm-input')
export class CommentForm extends LitElement {
  static styles = css`
  .mooncomm-input-top {
    display: flex;
    flex-wrap: wrap;
  }
  `;

@property() accessor isRequired = true;

@property()
  accessor comment = {
    nickname: '',
    email: '',
    website: '',
    content: ''
  };


  render() {
    return html`
      <form @submit($event)="${this.submitForm}">
        <div class="mooncomm-input-top">
          <input name="nickname" class="mooncomm-nickname" type="text" ?required="${this.isRequired}" placeholder="Nickname">
          <input name="email" class="mooncomm-email" type="text" ?required="${this.isRequired}" placeholder="Email">
          <input name="website" class="mooncomm-website" type="text" placeholder="Website">
        </div>
        <textarea name="comment" class="mooncomm-comment" rows="3" ?required="${this.isRequired}" placeholder="Comment"></textarea>
        <button type="submit" class="mooncomm-submit">Post</button>
        </form>
    `;
  }

  submitForm(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // 更新评论数据
    this.comment = {
      nickname: formData.get('nickname') as string,
      email: formData.get('email') as string,
      website: formData.get('website') as string,
      content: formData.get('comment') as string,
    };

    // 打印评论数据
    console.log('提交评论:', this.comment);
    fetch('http://example.com/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.comment),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('服务器响应:', data)
        
      })
      .catch((error) => console.error('提交失败:', error));
  
    console.log('提交评论:', this.comment);
  }

}