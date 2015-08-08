var code = require('../js/game.js');
describe('softCheck', function(){
  it('determines if a hand is soft or hard and returns position of an ace', function(){
    expect(code.softTest.softCheck()).toBe([true,1]);
  });
});
