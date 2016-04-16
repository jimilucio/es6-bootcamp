class DomElement{
  constructor(el) {
      this.el = el;
      this.elementClass = '';
      this.elementId = '';

      this.setElement(el);
  }

  /**
   * Set the element name for specific item
   */
  setElement() {
      //like jquery for CSS and ID
      if (this.el.startsWith('.')) {
          this.elementClass = this.el.substr(1);
      } else if (this.el.startsWith('#')) {
          this.elementId = this.el.substr(1);
      }
  }

  //return a dom element
  getDomElementByID() {
      return document.getElementById(this.elementId);
  }

  //return a set of dom elements
  getDomElementByClassName() {
      return document.getElementsByClassName(this.elementClass);
  }

  /**
   * [getElement description]
   * @return {[type]} [description]
   */
  getElement() {
      if (this.elementClass !== '') {
          return this.getDomElementByClassName();
      } else if (this.elementId !== '') {
          return this.getDomElementByID();
      } else {
          return false;
      }
  }

}

export default DomElement;
