import pickBy from 'lodash/pickBy';
import axios from 'axios';
import qs from 'query-string';

const ACCEPT = {
  DIFF: 'application/vnd.github.v3.diff+json',
  FULL: 'application/vnd.github.v3.full+json',
  HTML: 'application/vnd.github.v3.html+json',
  JSON: 'application/vnd.github.v3+json',
  MERCY_PREVIEW: 'application/vnd.github.mercy-preview+json',
  RAW: 'application/vnd.github.v3.raw+json',
};

//dev
const instance = ({ accept }) => {
  const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    timeout: 5000,
    headers: {
      Accept: accept,
      'Cache-Control': 'no-cache',
    },
  });

  return axiosInstance;
};

export const apiDiff = instance({ accept: ACCEPT.DIFF });
export const apiFull = instance({ accept: ACCEPT.FULL });
export const apiHtml = instance({ accept: ACCEPT.HTML });
export const apiJson = instance({ accept: ACCEPT.JSON });
export const apiMercyPreview = instance({ accept: ACCEPT.MERCY_PREVIEW });
export const apiRaw = instance({ accept: ACCEPT.RAW });

export function setHeaders(params) {
  apiDiff.defaults.headers.common = pickBy({ ...apiDiff.defaults.headers.common, ...params }, val => !!val);
  apiFull.defaults.headers.common = pickBy({ ...apiFull.defaults.headers.common, ...params }, val => !!val);
  apiHtml.defaults.headers.common = pickBy({ ...apiHtml.defaults.headers.common, ...params }, val => !!val);
  apiJson.defaults.headers.common = pickBy({ ...apiJson.defaults.headers.common, ...params }, val => !!val);
  apiMercyPreview.defaults.headers.common = pickBy(
    { ...apiMercyPreview.defaults.headers.common, ...params },
    val => !!val
  );
  apiRaw.defaults.headers.common = pickBy({ ...apiRaw.defaults.headers.common, ...params }, val => !!val);
}
