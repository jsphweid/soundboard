// TODO: How do you not have to do this...?

export type ValidTreeThing =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | 'q'
  | 'w'
  | 'e'
  | 'r'
  | 't'
  | 'a'
  | 's'
  | 'd'
  | 'f'
  | 'g'
  | 'z'
  | 'x'
  | 'c'
  | 'v'
  | 'b'

const validTreeThings = {
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
  '6': true,
  q: true,
  w: true,
  e: true,
  r: true,
  t: true,
  a: true,
  s: true,
  d: true,
  f: true,
  g: true,
  z: true,
  x: true,
  c: true,
  v: true,
  b: true
}

export const validTreeThing = (treeThing: string): boolean => {
  const runtimeCopy = { ...validTreeThings } as any
  return !!runtimeCopy[treeThing]
}
