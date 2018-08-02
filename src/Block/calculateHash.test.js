import calculateHash from './calculateHash';

const previousHash = 'b894bd2ef4b59974e2704ec677524f3732bb1e9018c63b0d98df4224ca59dbca';
const timestamp = new Date(1980, 10, 4);
const data = { hello: 'world' };
const nonce = 32;

describe('calculateHash', () => {
  it('default', () => {
    const hash = calculateHash();
    expect(hash).toEqual(previousHash);
  });

  it('add previousHash', () => {
    const hash = calculateHash({ previousHash });
    expect(hash).toEqual('09e15a4d65da4cb0652e9365390e4641668d2766cef3e28e8722e0a11b56b1b2');
  });

  it('add timestamp', () => {
    const hash = calculateHash({ previousHash, timestamp });
    expect(hash).toEqual('baa06622cb66300f09a5b9013b5b7349f8d4e1c44761555ec3d459d0eacc35dd');
  });

  it('add data', () => {
    const hash = calculateHash({ previousHash, timestamp, data });
    expect(hash).toEqual('7323258e3facc531c92bca0c3f4dd3dabdebac5fb6b3428460c7a2436967f209');
  });

  it('add nonce', () => {
    const hash = calculateHash({
      previousHash, timestamp, data, nonce,
    });
    expect(hash).toEqual('3293d6c179713a66c1e1c5fccd3e4c6c182f593fccea9bc3dd15667006d124f9');
  });
});
