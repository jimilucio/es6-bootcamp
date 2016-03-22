/**
 * This is a test file for SaySomething Class
 *
 */
import SaySomething from './SaySomething';

describe('SaySomething', () => {

  it('should return world', () => {

    let something = new SaySomething();
    something.setNew('World');
    expect(something.getWhatISay()).toBe('World');
    expect(something.char).toBe(5);
    expect(something.word).toBe(1);

  });

  it('should say Luciano', () => {
    let something = new SaySomething('Luciano');
    expect(something.getWhatISay()).toBe('Luciano');
    expect(something.char).toBe(7);
    expect(something.word).toBe(1);
  });

  it('should something have two words', () => {
    let something = new SaySomething('Hello world');
    expect(something.word).toBe(2);

  });

});
