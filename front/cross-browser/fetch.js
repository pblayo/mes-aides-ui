import promise from 'es6-promise';

promise.polyfill();  // needs to leak into global namespace for fetch polyfill

import 'isomorphic-fetch';  // needs to leak into global namespace for mocking
