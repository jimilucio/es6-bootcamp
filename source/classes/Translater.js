import fetch from 'isomorphic-fetch';

export const ITALIAN = 'it';
export const ENGLISH = 'en';

const apiUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

/**
 * Builds the API URL
 * @param  {String} baseURL  Base URL of the Translate API
 * @param  {String} apiKey   API key
 * @param  {String} text     The text to translate
 * @param  {String} fromLang From what language translate
 * @param  {String} toLang   What language to translate
 * @return {String}          The parameterized API URL
 */
function buildURL(baseURL, apiKey, text, fromLang, toLang) {
  return `${baseURL}?key=${apiKey}&text=${text}&lang=${fromLang}-${toLang}`;
}

/**
 * Text translater
 */
class Translater {

  /**
   * Class constructor, sets the API key
   * @param  {String} apiKey API key
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Calls the Translate API and translates the text
   * @param  {String} text     The text to translate
   * @param  {String} fromLang From what language translate
   * @param  {String} toLang   What language to translate
   * @return {Promise}         Resolved with the translated text
   */
  translate(text, fromLang, toLang) {
    return new Promise((resolve, reject) => {
      const adjustedText = text.replace('\n', ' ');
      fetch(buildURL(apiUrl, this.apiKey, adjustedText, fromLang, toLang))
        .then(response => response.json())
        .then(data => resolve(data.text[0]))
        .catch(error => reject(error));
    });
  }

}

export default Translater;
