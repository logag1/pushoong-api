import axios, { AxiosResponse } from 'axios';

async function getMainPage(code: string) {
  const res = await axios.get(`https://pushoong.com/ask/${code}`);
  return res;
}

async function getCsrfToken(page: AxiosResponse) {
  const csrfTokenCookie = page.headers['set-cookie']?.find(el => el.includes('csrftoken'));

  if (csrfTokenCookie) {
    return csrfTokenCookie;
  } else {
    return 'fail';
  }
}

export async function getTokens(code: string): Promise<{ csrf_token: string, csrf_middleware_token: string }> {
  const page = await getMainPage(code);
  const csrf_token = await getCsrfToken(page);
  const csrf_middleware_token = page.data.match(/name="csrfmiddlewaretoken".*?value="([^"]+)"/)[1];

  return {
    csrf_token,
    csrf_middleware_token
  }
}