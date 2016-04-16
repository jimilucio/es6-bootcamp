import 'babel-polyfill';
import Rx from 'rx';
import componentHandler from 'material-design-lite';
import './assets/es6-bootcamp.scss';
import TextAnalyzer from './classes/TextAnalyzer';
import DomElementNavigation from './classes/DomElementNavigation';

const subTitleObject = document.getElementById('application-subtitle');
const textarea = document.getElementById('application-text');

const textLength = document.getElementById('text-length');
const textLengthNoSpaces = document.getElementById('text-length-nospaces');
const singularWordCount = document.getElementById('singular-words');
const singuarChars = document.getElementById('singular-chars');
const averageWordLength = document.getElementById('average-word-length');
const sentencesCount = document.getElementById('sentences-count');
const mostUsedWords = document.getElementById('most-used-words');

const navigationButton = new DomElementNavigation('.mdl-button');

const analyzer = new TextAnalyzer();

const userInput = Rx.Observable.fromEvent(textarea, 'keydown')
  .debounce(50)
  .map(event => event.target.value);

function updateStatistics(analyzer) {
    textLength.innerText = analyzer.textLength(); // Prima
    textLengthNoSpaces.innerText = analyzer.textLengthNoSpaces(); // Prima
    sentencesCount.innerText = analyzer.sentences().length; // Prima
    singularWordCount.innerText = analyzer.singularWords().size; // Seconda
    singuarChars.innerText = analyzer.singularCharacters().size; // Seconda
    averageWordLength.innerText = analyzer.averageWordLength(); // Seconda
    mostUsedWords.innerText = analyzer.wordsByFrequence() // Seconda
      .slice(0, 10)
      .reduce((prev, curr) => `${prev} ${curr.word}`, '');
}

userInput.subscribe(
  value => {
      analyzer.setText(value);
      updateStatistics(analyzer);
  },
  err => console.error(err)
);
