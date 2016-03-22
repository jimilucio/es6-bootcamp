/**
 * This is a SaySomething class
 * Given a  string return a string and count word and chars
 * @type {String}
 */

let _something = ''; //this is a private variable

class SaySomething{

  /**
   * Constructor
   * @param  {string} something is a string to store inside the class
   * @return {void}
   */
  constructor(something) {
    this.char = ''; // this is a public var
    this.word = ''; // this is a public var

    //check if something is not empty
    if (something && something != '') {
      this.setNew(something);
    }

  }

  /**
   * [getWhatISay description]
   * @return {[type]} [description]
   */
  getWhatISay() {
    return _something;
  }

  /**
   * [getWordCount description]
   * @return {[type]} [description]
   */
  getWordCount() {
    let wordCounter =  new Set(_something.split(' '));
    //remove the blank keyword
    if (wordCounter.has('') === true) {
      wordCounter.delete('');
    }
    return wordCounter.size;
  }

  /**
   * [setNew description]
   * @param {[type]} something [description]
   */
  setNew(something) {
    _something = something;
    this.char = _something.length;
    this.word = this.getWordCount();
  }

}

export default SaySomething;
