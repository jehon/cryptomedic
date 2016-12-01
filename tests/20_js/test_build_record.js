
describe('BuildRecord', function() {
  it('should update default values with modifiers', function() {
    var ref = { a: 1, b: 2, c: { c1: 1 }, d: { d1: 2 }};
    var obj = buildRecord(ref,
      {
        a: 2,
        'd.d1': 3
      }
    );

    // Ref object is kept intact
    expect(ref.a).toBe(1);
    expect(ref.b).toBe(2);
    expect(ref.c.c1).toBe(1);
    expect(ref.d.d1).toBe(2);

    // Modifications are applied
    expect(obj.a).toBe(2);
    expect(obj.b).toBe(2);
    expect(obj.c.c1).toBe(1);
    expect(obj.d.d1).toBe(3);
  });
});

