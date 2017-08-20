import app from './app';
import { expect } from 'chai';
import 'mocha';

describe('app', () => {
  it('returns the same string', async () => {
    const result = await app('lint', 'okay');
    expect(result).to.equal('Okay');
  });
});
