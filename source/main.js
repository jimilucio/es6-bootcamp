import 'babel-polyfill';
import SaySomething from './classes/SaySomething';

let mySaySomething = new SaySomething('ES6 Bootcamp');

let homepageTitle = `${mySaySomething.getWhatISay()}
      [character: ${  mySaySomething.char}: single word: ${mySaySomething.word}]`;

mySaySomething.setNew(`Hi, this is a boilerplate application build with new Ecmascript6.
      in this example you can find a lot of examples!`);

let titleObject = document.getElementById('application-title');
titleObject.innerText = homepageTitle;

let homepageSubTitle = `${mySaySomething.getWhatISay()}
      [character: ${  mySaySomething.char}: single word: ${mySaySomething.word}]`;

let subTitleObject = document.getElementById('application-subtitle');
subTitleObject.innerText = homepageSubTitle;
