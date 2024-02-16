## Pushoong ASK Api Wrapper

이 레포지토리는 지원되지 않는  
`푸슝 ASK사`의 비공식 api를 사용합니다  

언제든 이 모듈이 지원중단 될 수 있으며,  
해당 모듈의 사용으로 인한 불이익은 개발자가 전혀 책임지지 않습니다

## MIT LICENSE
[`LICENSE`](https://github.com/logag1/pushoong-api/blob/main/LICENSE)

## Usage

```ts
import { ChatApiHandler } from './api';

(async () => {
  const chatApi = new ChatApiHandler('(링크뒤에 붙는 아이디)');
    const questionRes = await chatApi.sendQuestion('테스트 질문 발송');
    // pk는 답변될 메시지의 아이디 값으로 추후 구해올 수 있게 함수화 예정입니다
    const answerRes = await chatApi.sendAnswer('pk', '테스트 답변 발송');
    console.log(res.result);
})();
```