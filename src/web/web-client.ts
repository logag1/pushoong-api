import axios, { AxiosInstance } from 'axios';
import { generateRandomString } from '../lib';

function getHeader(csrfToken: string) {
  const headers: Record<string, string> = {};

  headers['Cookie'] = `cookie_id: ${generateRandomString(20)}; ${csrfToken}`;
  headers['User-Agent'] = `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36`;

  return headers;
}

export function createWebClient(csrfToken: string | null): AxiosInstance {
  const client = axios.create({
    baseURL: 'https://pushoong.com/ask',
    headers: csrfToken ? getHeader(csrfToken) : {}
  });

  return client;
}