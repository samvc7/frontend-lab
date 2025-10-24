# Asserting
  
toBe - strict equal (references)
expect(1).toBe(1) passes because the values are identical, but expect({}).toBe({}) fails because different object instances
toEqual - deep equality
toHaveAttribute - comes from rtl/jest-dom and checks the attribute of a DOM element