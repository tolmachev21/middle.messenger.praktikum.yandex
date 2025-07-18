import { expect } from 'chai';
import { queryStringify } from './HttpTransport.ts';

describe('HttpTransport', () => {
  it('queryStringify', () => {
    const data = {
      offset: 0,
      limit: 20,
    };

    const stringUrl = queryStringify(data);
    console.log('stringUrl', stringUrl);
    expect(stringUrl).to.eq('?offset=0&limit=20');
  });
});
