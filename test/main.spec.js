var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var LoginPage = require('./pages/loginPage.js');

describe("Track Branch Status in Comparison to Master", function(){
  
  var page = new LoginPage();
  
  it("should navigate to github", function(done){
    page.gotoLoginPage();
    assert.eventually.equal(browser.getCurrentUrl(), browser.baseUrl, 'should be on github');
    done();
  });
  
  it("should login the user in", function(done){
    page.signIn();
    // Add assert for knowing the login was successful
    done();
  });
  
  it("should take user to specified repo", function(done){
    page.gotoOrganization();
    page.searchForRepo();
    // Add assert for knowing the user found repo successfully
    done();
  });
  
  it("should check all branch status against master", function(done){
    page.gotoAllBranchesPage();
    page.checkBranchStatus(function(branchObject, valid){
      console.log(branchObject, valid);
      assert.isTrue(valid, "Branches are not up to date with master");
    });

    // Add assert 
    done();
  });
});