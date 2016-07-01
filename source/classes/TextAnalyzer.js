function removeEmptyElementsFromArray(prev, curr) {
    return curr ? [...prev, curr] : [...prev];
}

/**
 * This is a TextAnalyzer class
 * Given a string return a string and count word and chars
 * @type {String}
 */
class TextAnalyzer {

  //
  // Prima parte
  //

  /**
   * Constructor
   * @param {string} text is a string to store inside the class.
   */
  constructor(text = '') {
      this.setText(text);
  }

  /**
   * Sets a new string to work on.
   * @param {string} text Text.
   */
  setText(text) {
      this.text = text;
  }

  /**
   * Returns the current text.
   * @return {string} The current text.
   */
  getText() {
      return this.text;
  }

  /**
  * The current text length.
  * @return {int} Text length.
  */
  textLength() {
      return this.text.length;
  }

  /**
  * The current text length, not considering spaces.
  * @return {int} Text without spaces.
  */
  textLengthNoSpaces() {
      return this.wordsNoSpaces()
        .reduce((prev, current) => prev + current.length, 0);
  }

  /**
  * The words contained in the text, space included.
  * @return {array[string]} Words array.
  */
  words() {
      return this.text.split(/[ \n\t]+/)
        .map(word => word.trim())
        .map(word => word.toLowerCase());
  }

  /**
  * The sentences in the text.
  * @return {array[string]} Sentences.
  */
  sentences() {
      return this.text
        .split(/[.?!]+/)
        .map(word => word.trim())
        .reduce(removeEmptyElementsFromArray, []);
  }

  /**
  * The words contained in the text, spaces excluded.
  * @return {array[string]} Words array.
  */
  wordsNoSpaces() {
      return this.words()
        .reduce(removeEmptyElementsFromArray, []);
  }

  /**
  * The words contained in the text, spaces and symbols excluded.
  * @return {array[string]} Words array.
  */
  wordsNoSpacesNoSymbols() {
      return this.wordsNoSpaces()
        .reduce((prev, curr) => [...prev, curr.replace(/[^a-zA-Z\d' ]/g, '')], []);
  }

}

export default TextAnalyzer;
