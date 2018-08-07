import { networkInterfaces } from 'os';

const { en0 = [] } = networkInterfaces();

const { address } = en0.find(({ family }) => family === 'IPv4') || {};

export default address || '127.0.0.1';
