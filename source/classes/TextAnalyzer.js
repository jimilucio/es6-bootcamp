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

  //
  // Seconda parte
  //

  /**
  * Returns a Map containing words and their frequencies.
  * @return {map} A Map {word => wordFrequence}.
  */
  wordsMap() {
    // If the word is already in the Map, increment its frequence, otherwise add it to the Map
    return this.wordsNoSpacesNoSymbols()
      .reduce((prev, curr) => prev.get(curr) ?
        prev.set(curr, prev.get(curr) + 1) : prev.set(curr, 1), new Map());
  }

  /**
  * The words contained in the text, not repeated.
  * @return {set} A Set containing the singular words.
  */
  singularWords() {
    return new Set(this.wordsNoSpacesNoSymbols());
  }

  /**
  * The letters contained in the text.
  * @return {set} A set containing the singular characters.
  */
  singularCharacters() {
    return new Set(this.text);
  }

  /**
  * The words sorted by their frequency.
  * @return {array[object]} An array of {word, count} objects.
  */
  wordsByFrequence() {
    return [...this.wordsMap()]
      .sort((a, b) => {
        if (a[1] < b[1]) return 1;
        else if (a[1] > b[1]) return -1;
        else return 0;
      })
      .reduce((prev, curr) => [...prev, {word: curr[0], count: curr[1]}], []);
  }

  /**
  * The average length of the words.
  * @return {int}
  */
  averageWordLength() {
    const average = this.textLengthNoSpaces() / this.wordsNoSpaces().length;
    return average ? Math.round(average) : 0;
  }

}

export default TextAnalyzer;
