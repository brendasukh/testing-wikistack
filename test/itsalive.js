console.log('something funny');
var expect=require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

describe('testing',function(){
  it('confirms adding',function(){
    expect(2+2).to.equal(4);
  })
})

describe('timeout',function(){
  it('should settimeout for 1000ms',function(done){
    var start=new Date();

    setTimeout(function(){
      var duration=new Date()-start;
      expect(duration).to.be.closeTo(1000,25);
      done();
    },1000);

  })
});

describe('spy',function(){
  it('will invoke a function once per element', function () {
  var arr = ['x','y','z'];
  function logNth (val, idx) {
    console.log('Logging elem #'+idx+':', val);
  }
  logNth = chai.spy(logNth);
  arr.forEach(logNth);
  expect(logNth).to.have.been.called.exactly(arr.length);
})
})
