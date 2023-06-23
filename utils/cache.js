const Keyv = require('keyv'); 
const keyv = new Keyv();

exports.set = (key, value) => keyv.set(key, value);

exports.get = (key) => keyv.get(key); 

exports.del = (key) => keyv.delete(key);

exports.clear = () => keyv.clear();
