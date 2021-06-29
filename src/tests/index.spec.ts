import { removePrefix } from '..';

describe('Lambda Handler', () => {
  it('removes prefix', () => {
    const str = 'abcHello World';
    expect(removePrefix(str, 'abc')).toEqual('Hello World');
  });

  it('removes prefix if string starts with whitespace', () => {
    const str = '   abcHello World';
    expect(removePrefix(str, 'abc')).toEqual('Hello World');
  });

  it('removes whitespace after prefix', () => {
    const str = 'abc Hello World';
    expect(removePrefix(str, 'abc')).toEqual('Hello World');
  });

  it('returns orignial string if prefix is not present', () => {
    const str = 'abHello World';
    expect(removePrefix(str, 'abc')).toEqual('abHello World');
  });
});
