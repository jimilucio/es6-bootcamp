import 'babel-polyfill';
import Rx from 'rx';
import componentHandler from 'material-design-lite';
import './assets/es6-bootcamp.scss';
import TextAnalyzer from './classes/TextAnalyzer';
import {default as Translater, ITALIAN, ENGLISH}  from './classes/Translater';
import DomElementNavigation from './classes/DomElementNavigation';

const subTitleObject = document.getElementById('application-subtitle');
const textarea = document.getElementById('application-text');
const textareaTranslated = document.getElementById('application-text-translated');

const textLength = document.getElementById('text-length');
const textLengthNoSpaces = document.getElementById('text-length-nospaces');
const singularWordCount = document.getElementById('singular-words');
const singuarChars = document.getElementById('singular-chars');
const averageWordLength = document.getElementById('average-word-length');
const sentencesCount = document.getElementById('sentences-count');
const mostUsedWords = document.getElementById('most-used-words');

const noTranslate = document.querySelector('input[name="options"][value="3"]');

const navigationButton = new DomElementNavigation('.mdl-button');

const analyzer = new TextAnalyzer();
const translater = new Translater('trnsl.1.1.20160411T154306Z.c67c417ede790dc2.6616780d6aa5762f9c7ccd94bacde5e0cae37e54');

function mapRadioToLanguage(radioValue) {
    switch (radioValue) {
        case '1':
            return {from: ITALIAN, to: ENGLISH};
        case '2':
            return {from: ENGLISH, to: ITALIAN};
        default:
            return null;
    }
}

function updateStatistics(analyzer) {
    textLength.innerText = analyzer.textLength(); // Prima
    textLengthNoSpaces.innerText = analyzer.textLengthNoSpaces(); // Prima
    sentencesCount.innerText = analyzer.sentences().length; // Prima
    singularWordCount.innerText = analyzer.singularWords().size; // Seconda
    singuarChars.innerText = analyzer.singularCharacters().size; // Seconda
    averageWordLength.innerText = analyzer.averageWordLength(); // Seconda
    mostUsedWords.innerText = analyzer.wordsByFrequence() // Seconda
      .slice(0, 3)
      .reduce((prev, curr) => `${prev} ${curr.word}`, '');
}

noTranslate.addEventListener('click', event => {
    textareaTranslated.disabled = true;
    textareaTranslated.value = '';
});

const userInput = Rx.Observable.fromEvent(textarea, 'keydown')
  .debounce(50)
  .map(event => event.target.value);

const translateChange = userInput
  .filter(value => document.querySelector('input[name="options"]:checked').value != 3);

translateChange.subscribe(
  value => {
      const {from, to} = mapRadioToLanguage(document.querySelector('input[name="options"]:checked').value);
      textareaTranslated.disabled = false;
      translater.translate(value, from, to)
        .then(translated => textareaTranslated.value = translated);
  },
  err => console.error(err)
);

userInput.subscribe(
  value => {
      analyzer.setText(value);
      updateStatistics(analyzer);
  },
  err => console.error(err)
);
