const Page = require('../models/index.js').Page;
const User=require('../models/index.js').User;
var expect = require('chai').expect;
var marked = require('marked')
var chai = require('chai');
var spies = require ('chai-spies');
chai.should();
chai.use(require('chai-things'));


describe('Page model', function () {

  describe('Virtuals', function () {
    var page;
    beforeEach(function () {
    page = Page.build();
    //console.log("page",page);
    });
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"',function(){
        console.log('page inside of route',page)
         page.urlTitle = "some_title";
        expect(page.route).to.be.equal('/wiki/some_title');
      });

    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML',function(){
        page.content="alot of stuff here because this is content"
        expect(page.renderedContent).to.be.equal('<p>alot of stuff here because this is content</p>\n');
      });
    });
  });

  describe('Class methods', function () {
    before(function (done) {

    Page.create({
      title: 'foo',
      content: 'bar',
      tags: ['foo', 'bar']
    })
      .then(function () {
        done();
    })
      .catch(done);
    });
    describe('findByTag', function () {
      it('gets pages with the search tag', function (done) {
        Page.findByTag('bar')
        .then(function (pages) {
    expect(pages).to.have.lengthOf(1);
    done();
  })
  .catch(done);
});

it('does not get pages without the search tag', function (done) {
  Page.findByTag('falafel')
  .then(function (pages) {
    expect(pages).to.have.lengthOf(0);
    done();
  })
  .catch(done);
});

    });
  });

  describe('Instance methods', function () {
    var basepage=Page.create({
      title: 'foo',
      content: 'bar',
      tags: ['foo', 'bar']
    })
      .then(function () {
        done();
    })
      .catch(done);
    });
    var sharedpage=Page.create({
      title: 'foo',
      content: 'hello',
      tags: ['foo', 'hello']
    })
      .then(function () {
        done();
    })
      .catch(done);
    });
    var nosharedpage=Page.create({
      title: 'hello',
      content: 'bye',
      tags: ['hello', 'bye']
    })
      .then(function () {
        done();
    })
      .catch(done);
    });
    describe('findSimilar', function () {
      it('never gets itself',function(){
        basepage.findSimilar()
        .then(function(pages){
          console.log('pages',pages)
          expect(pages).notInclude(basepage)
        })
      });
      it('gets other pages with any common tags',function(){

      });
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');

    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
