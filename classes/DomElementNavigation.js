import DomElement from './DomElement';
class DomElementNavigation extends DomElement{
  /**
   * Define the costructor
   *
   * @param  {string} el the element ID name or class name
   * @return {void}
   */
  constructor(el) {
    super(el);
    this.setEvent();
  }

  /**
   * [doNavigationEvent description]
   *
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  doNavigationEvent(event) {
    console.log('doNavigationEvent event called');
    let linkUrl = event.currentTarget.getAttribute('data-link');
    console.log('doNavigationEvent: ', linkUrl);
    //change hash
    if (linkUrl.startsWith('#')) {
      document.location.hash = linkUrl;
    } else {
      window.open(linkUrl);
    }
  }

  /**
    * [setEvent description]
    */
  setEvent() {
    let element = this.getElement();
    if (element) {
      let buttonClickEvent = Rx.Observable.fromEvent(element, 'click');
      buttonClickEvent.subscribe(this.doNavigationEvent);
    }
  }

}

export default DomElementNavigation;
