import { expect } from 'chai';
import 'mocha';
import app from './app';

describe('app', () => {
  it('returns the same string', async () => {
    const result = await app('lint', ' Wrote a script.  ');
    expect(result).to.equal('Write a script');
  });
});
