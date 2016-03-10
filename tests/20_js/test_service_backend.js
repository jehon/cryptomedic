
import { nullify }        from 'helpers/service_backend';

describe('service_backend', function() {
  describe('nullify', function() {
    it('should handle null', function() {
      expect(nullify(null)).toBe(null);
    });

    it('should handle "null"', function() {
      expect(nullify('null')).toBe(null);
    });

    it('should handle "?"', function() {
      expect(nullify('?')).toBe(null);
    });

    it('should handle anything else', function() {
      expect(nullify(123)).toBe(123);
    });

    it('should handle anything else', function() {
      expect(nullify('123')).toBe('123');
    });
  });
});
