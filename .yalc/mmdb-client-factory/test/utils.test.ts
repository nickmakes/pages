import { mergeObjects, safeJoin } from '../src';

describe('utility functions', () => {
  describe('merge objects', () => {
    it('should work in a simple case', () => {
      const arg0 = { a: 1, b: 2, c: 3 },
        arg2 = { b: 4, d: 8 };
      let arg1;

      const result = mergeObjects(arg0, arg1, arg2);
      expect(result).toMatchObject({ a: 1, b: 4, c: 3, d: 8 });

      expect(arg0).toMatchObject({ a: 1, b: 2, c: 3 });
      expect(arg2).toMatchObject({ b: 4, d: 8 });
    });
  });

  describe('safe join', () => {
    it('should work in a simple case', () => {
      const res = safeJoin('/', 'http://localhost:8080', 'api', 'users');
      expect(res).toBe('http://localhost:8080/api/users');
    });
  });
});
