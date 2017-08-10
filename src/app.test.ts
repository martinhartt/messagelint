import app from './app';
import { expect } from 'chai';
import 'mocha';

describe('app', () => {
  it('returns the same string', () => {
    const result = app('okay');
    expect(result).to.equal('okay');
  });
});
