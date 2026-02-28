// Utility for split-type functionality
// Install with: npm install split-type

export default class SplitType {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.options = options;
    this.chars = [];
    this.words = [];
    this.lines = [];
    
    if (this.element) {
      this.split();
    }
  }

  split() {
    const text = this.element.textContent;
    const types = this.options.types || ['chars'];
    
    if (types.includes('chars')) {
      this.splitChars(text);
    }
    
    if (types.includes('words')) {
      this.splitWords(text);
    }
  }

  splitChars(text) {
    const chars = text.split('');
    this.element.innerHTML = '';
    
    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      this.element.appendChild(span);
      this.chars.push(span);
    });
  }

  splitWords(text) {
    const words = text.split(' ');
    this.element.innerHTML = '';
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      this.element.appendChild(span);
      this.words.push(span);
      
      if (index < words.length - 1) {
        this.element.appendChild(document.createTextNode(' '));
      }
    });
  }

  revert() {
    if (this.element) {
      this.element.innerHTML = this.element.textContent;
    }
  }
}
