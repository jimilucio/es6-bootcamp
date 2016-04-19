import 'babel-polyfill';
import Rx from 'rx';
import componentHandler from 'material-design-lite';
import './assets/es6-bootcamp.scss';
import TextAnalyzer from './classes/TextAnalyzer';
import DomElementNavigation from './classes/DomElementNavigation';

//set the dom element costants
//textarea
const textarea = document.getElementById('application-text');

//information on the right
const textLength = document.getElementById('text-length');
const textLengthNoSpaces = document.getElementById('text-length-nospaces');
const sentencesCount = document.getElementById('sentences-count');

const navigationButton = new DomElementNavigation('.mdl-button');

const analyzer = new TextAnalyzer();

//this function provide to update the information of the content on the right
function updateStatistics(analyzer) {
    textLength.innerText = analyzer.textLength(); // Prima
    textLengthNoSpaces.innerText = analyzer.textLengthNoSpaces(); // Prima
    sentencesCount.innerText = analyzer.sentences().length; // Prima

}

// RX.jS on keydown send the new event to the subscribers
const userInput = Rx.Observable.fromEvent(textarea, 'keydown')
  .debounce(50)
  .map(event => event.target.value);

// on event update statistics
userInput.subscribe(
  value => {
      analyzer.setText(value);
      updateStatistics(analyzer);
  },
  err => console.error(err)
);
