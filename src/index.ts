import { ChatApiHandler } from './api';
import { delay } from './lib';

(async () => {
  const chatApi = new ChatApiHandler('');
  for (let i = 0; i < 100; i++) {
    const res = await chatApi.sendQuestion('테스트 메시지 발송');
    console.log(res.result);
    await delay(200)
  }
})();