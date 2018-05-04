import { TestWindow } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {
  it('should build', () => {
    expect(new MyComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    let window : TestWindow;
    let element : HTMLMyComponentElement;

    beforeEach(async () => {
      window = new TestWindow();
      await window.load({
        html: '<my-component></my-component>',
        components: [MyComponent]
      });
      element = window.document.querySelector('my-component');
    });

    it('should work without parameters', async () => {
      await window.flush();

      expect(element.textContent.trim()).toEqual('Hello, World! I\'m');
    });

    it('should work with a first name', async () => {
      element.first= 'Peter';
      await window.flush();

      expect(element.textContent.trim()).toEqual('Hello, World! I\'m Peter');
    });

    it('should work with a last name', async () => {
      element.last= 'Parker';
      await window.flush();

      expect(element.textContent.trim()).toEqual('Hello, World! I\'m  Parker');
    });

    it('should work with both a first and a last name', async () => {
      element.first= 'Peter';
      element.last= 'Parker';
      await window.flush();

      expect(element.textContent.trim()).toEqual('Hello, World! I\'m Peter Parker');
    });
  });
});
