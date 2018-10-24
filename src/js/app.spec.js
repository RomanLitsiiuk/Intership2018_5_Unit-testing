import {myFunction} from './app.js';

describe('Module should return', function () {
  it('some number', function () {
    expect(myFunction()).toEqual(10);
  });
});
