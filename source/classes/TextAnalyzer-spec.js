/**
 * This is a test file for TextAnalyzer class
 *
 */
import TextAnalyzer from './TextAnalyzer';

describe('TextAnalyzer', () => {

  const analyzer = new TextAnalyzer();

  it('should return world', () => {
    analyzer.setText('World');
    expect(analyzer.getText()).toBe('World');
  });

  it('should return a text having newline', () => {
    const text =
      `This
      is a
      newline
      text`;
    analyzer.setText(text);
    expect(analyzer.getText()).toBe(text);
  });

  it('words should return the words', () => {
    const text = 'I hope the words will be the same';
    const myWords = ['i', 'hope', 'the', 'words', 'will', 'be', 'the', 'same'];
    analyzer.setText(text);
    expect(analyzer.words()).toEqual(myWords);
  });

  it('words should have the right number of words', () => {
    analyzer.setText('Hello world');
    expect(analyzer.words().length).toBe(2);
    analyzer.setText('Hello world i\'m Alberto');
    expect(analyzer.words().length).toBe(4);
  });

  it('textLength should return the right length', () => {
    analyzer.setText('Hello World!');
    expect(analyzer.textLength()).toBe(12);
  });

  it('textLengthNoSpaces should return the length without considering the spaces', () => {
    analyzer.setText('         Hello World!          ');
    expect(analyzer.textLengthNoSpaces()).toBe(11);
  });

  it('wordsNoSpaces should not return the spaces', () => {
    analyzer.setText('   Hello    World     ');
    expect(analyzer.wordsNoSpaces().length).toBe(2);
  });

  it('sentences should return the right number of sentences', () => {
    analyzer.setText('Hi i\'m Alberto. I\'m a web developer and i\'m an ES6 enthusiast! Bye!');
    expect(analyzer.sentences().length).toBe(3);
  });

  it('wordsNoSpacesNoSymbols should not return spaces and symbols in any word', () => {
    analyzer.setText('Hi i\'m Alberto. I\'m a web developer and i\'m an ES6 enthusiast! Bye!');
    analyzer.wordsNoSpacesNoSymbols()
      .forEach(word => {
        expect(word.includes('!')).toBe(false);
      })
  });

  it('singularWord should return a Set containing the right number of words', () => {
    const text = 'Hi i\'m Alberto. I\'m a web developer and i\'m an ES6 enthusiast! Bye!';
    const words = ['Hi', 'i\'m', 'Alberto', 'I\'m', 'a', 'web', 'developer', 'and', 'i\'m', 'an', 'ES6', 'enthusiast', 'Bye'];
    analyzer.setText(text);
    const singularWords = analyzer.singularWords();
    expect(singularWords.size).toBe(11);
  });

  it('singularWord should return a Set containing every word', () => {
    const text = 'Hi i\'m Alberto. I\'m a web developer and i\'m an ES6 enthusiast! Bye!';
    const words = ['Hi', 'i\'m', 'Alberto', 'I\'m', 'a', 'web', 'developer', 'and', 'i\'m', 'an', 'ES6', 'enthusiast', 'Bye'];
    analyzer.setText(text);
    const singularWords = analyzer.singularWords();
    words.forEach(word => {
      expect(singularWords.has(word.toLowerCase())).toBe(true);
    });
  });

  it('singularWord should not return a Set containing an unexisting word', () => {
    const text = 'Hi i\'m Alberto. I\'m a web developer and i\'m an ES6 enthusiast! Bye!';
    const words = ['Hi', 'i\'m', 'Alberto', 'I\'m', 'a', 'web', 'developer', 'and', 'i\'m', 'an', 'ES6', 'enthusiast', 'Bye'];
    analyzer.setText(text);
    const singularWords = analyzer.singularWords();
    expect(singularWords.has('Luciano')).toBe(false);
  });

  it('wordsMap should return a Map having the words\'s frequence' , () => {
    const text = 'Hi i\'m Alberto. I\'m a web developer and i\'m an ES6 enthusiast! Bye!';
    const words = ['Hi', 'i\'m', 'Alberto', 'I\'m', 'a', 'web', 'developer', 'and', 'i\'m', 'an', 'ES6', 'enthusiast', 'Bye'];
    analyzer.setText(text);
    const map = analyzer.wordsMap();
    expect(map.get('i\'m')).toBe(3);
    expect(map.get('hi')).toBe(1);
    expect(map.get('es6')).toBe(1);
  });

  it('singularCharacters should return a Set containing every character', () => {
    const text = 'Hi i\'m Alberto. I\'m a web developer and i\'m an ES6 enthusiast! Bye!';
    analyzer.setText(text);
    const chars = analyzer.singularCharacters();
    expect(chars.has('h')).toBe(true);
    expect(chars.has('z')).toBe(false);
  });

  it('wordsByFrequence should return the right amount of element and in the right order', () => {
    const text = 'a b c d e a a f g c';
    analyzer.setText(text);
    const orderedWords = analyzer.wordsByFrequence();
    const expectedFirst = { word: 'a', count: 3 };
    const expectedSecond = { word: 'c', count: 2 };
    expect(orderedWords.length).toBe(7);
    expect(orderedWords[0]).toEqual(expectedFirst);
    expect(orderedWords[1]).toEqual(expectedSecond);
    for (let i = 2; i < 7; i++) {
      expect(orderedWords[i].count).toBe(1);
    }
  });

  it('averageWordLength should return 1 when every word i 1-long', () => {
    const text = 'a b c d e f';
    analyzer.setText(text);
    const average = analyzer.averageWordLength();
    expect(average).toBe(1);
  });

  it('averageWordLength should not return a float', () => {
    const text = 'a bb';
    analyzer.setText(text);
    const average = analyzer.averageWordLength();
    expect(average).toBe(2);
  });

  it('averageWordLength should return the right value', () => {
    const text = 'aa bbb cc d eeeeee f g';
    analyzer.setText(text);
    const average = analyzer.averageWordLength();
    expect(average).toBe(2);
  });

  it('averageWordLength should return 0 on an empty text', () => {
    const text = '';
    analyzer.setText(text);
    const average = analyzer.averageWordLength();
    expect(average).toBe(0);
  });

  it('averageWordLength should return the word length on a text containing only one word', () => {
    const text = 'aaaaaaaaaaaaa';
    analyzer.setText(text);
    const average = analyzer.averageWordLength();
    expect(average).toBe(text.length);
  });

});
