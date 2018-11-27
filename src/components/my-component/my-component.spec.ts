import { MyComponent } from './my-component';

describe('my-component', () => {
  it('builds', () => {
    expect(new MyComponent()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      const component = new MyComponent();
      expect(component.getText()).toEqual('');
    });

    it('formats just first names', () => {
      const component = new MyComponent();
      component.first = 'Joseph';
      expect(component.getText()).toEqual('Joseph');
    });

    it('formats first and last names', () => {
      const component = new MyComponent();
      component.first = 'Joseph';
      component.last = 'Publique';
      expect(component.getText()).toEqual('Joseph Publique');
    });

    it('formats first, middle and last names', () => {
      const component = new MyComponent();
      component.first = 'Joseph';
      component.middle = 'Quincy';
      component.last = 'Publique';
      expect(component.getText()).toEqual('Joseph Quincy Publique');
    });
  });
});
