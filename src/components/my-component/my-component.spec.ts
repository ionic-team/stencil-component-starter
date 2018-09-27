import { MyComponent } from './my-component';

describe('my-component', () => {
  it('builds', () => {
    expect(new MyComponent()).toBeTruthy();
  });

  describe('formatting', () => {
    it('handles just first names', () => {
      const c = new MyComponent();
      c.first = 'Joseph';
      expect(c.format()).toEqual('Joseph');
    });

    it('handles first and last names', () => {
      const c = new MyComponent();
      c.first = 'Joseph';
      c.last = 'Publique';
      expect(c.format()).toEqual('Joseph Publique');
    });

    it('handles first, middle and last names', () => {
      const c = new MyComponent();
      c.first = 'Joseph';
      c.middle = 'Quincy';
      c.last = 'Publique';
      expect(c.format()).toEqual('Joseph Quincy Publique');
    });
  });
});
