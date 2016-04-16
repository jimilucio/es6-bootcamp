import fetch from 'isomorphic-fetch';

export const ITALIAN = 'it';
export const ENGLISH = 'en';

const apiUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

function buildURL(baseURL, apiKey, text, lang) {
  return `${baseURL}?key=${apiKey}&text=${text}&lang=${lang}`;
}

class Translater {

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  translate(text, fromLang, toLang) {
    return new Promise((resolve, reject) => {
      const adjustedText = text.replace('\n', ' ');
      fetch(buildURL(apiUrl, this.apiKey, adjustedText, `${fromLang}-${toLang}`))
        .then(response => response.json())
        .then(data => resolve(data.text[0]))
        .catch(error => reject(error));
    });
  }

}

export default Translater;
