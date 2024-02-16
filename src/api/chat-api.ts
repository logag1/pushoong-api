import { AxiosResponse } from 'axios';
import { createWebClient, getTokens } from '../web';

interface RequestType {
  success: boolean;
  result: AxiosResponse;
}

export class ChatApiHandler {
  private _client;
  private _csrfToken: string | null;
  private _csrfMiddlewareToken: string | null;

  constructor(
    private _code: string
  ) {
    this._client = createWebClient(null);
    this._csrfToken = null;
    this._csrfMiddlewareToken = null;
  }

  get referer() {
    return `https://pushoong.com/ask/${this._code}`;
  }

  private async _setCsrfInfo() {
    const tokens = await getTokens(this._code);

    this._csrfToken = tokens.csrf_token;
    this._csrfMiddlewareToken = tokens.csrf_middleware_token;

    this._client = createWebClient(this._csrfToken);
  }

  private async _handleCsrf(): Promise<void> {
    if (!this._csrfToken || !this._csrfMiddlewareToken) {
      console.log('csrf 토큰이 없어 재발급합니다');
      await this._setCsrfInfo();
    }
  }

  /**
   * @param text 보낼 질문 메시지
   * @returns {RequestType}
   * 
   * 질문을 전송합니다
   */
  public async sendQuestion(text: string): Promise<RequestType> {
    await this._handleCsrf();

    const res = await this._client.postForm('/ask_question', {
      csrfmiddlewaretoken: this._csrfMiddlewareToken,
      ask_key: this._code,
      content: text
    }, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'Referer': this.referer
      }
    });

    return { success: res.status === 200, result: res.data }
  }

  /**
   * @param pk 답변할 질문의 아이디
   * @param text 답변할 메시지
   * @returns {RequestType}
   * 
   * 상대방의 계정에서 답변을 전송합니다
   */
  public async sendAnswer(pk: string, text: string): Promise<RequestType> {
    await this._handleCsrf();

    const res = await this._client.postForm('/ask_answer', {
      csrfmiddlewaretoken: this._csrfMiddlewareToken,
      question_pk: pk,
      content: text
    }, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'Referer': this.referer
      }
    });

    return { success: res.status === 200, result: res.data }
  }
}