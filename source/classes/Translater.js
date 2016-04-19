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

      //
      //
      // Inserisci qui il codice per fare la chiamata ai servizi di traduzione
      //
      //

  }

}

export default Translater;
