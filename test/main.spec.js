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
    assert.eventually.equal(browser.getCurrentUrl(), browser.baseUrl, 'should be on github login page');
    done();
  });
  
  it("should login the user in", function(done){
    page.signIn();
    page.isLoggedIn(function(isPresent){
      assert.isTrue(isPresent, "Did not successfully login");
    });
    done();
  });
  
  it("should take user to specified repo", function(done){
    page.gotoOrganization();
    page.searchForRepo();
    page.isOnRepoPage(function(isOnRepoPage){
      assert.isTrue(isOnRepoPage, "Not on the repo page");
    });
    done();
  });
  
  it("should check all branch status against master", function(done){
    page.gotoAllBranchesPage();
    
    var callback = function(branchObject, valid){
      nextPage(branchObject, valid);
    }
    
    var nextPage = function(branchObject, valid) {
      var pageNext = element(by.xpath("//div[@class='pagination']/a"));
      var pagination = element(by.xpath("//div[@class='pagination']"));
      
      pagination.isPresent().then(function(isPresent){
        if(isPresent == true){
            pageNext.isPresent().then(function(isPresent){
            if(isPresent == true){
              pageNext.getText().then(function(text){
                if(text == "Next"){
                  pageNext.click();
                  browser.sleep(2000);
                  page.checkBranchStatus(branchObject,callback);
                } else{
                  console.log(branchObject);
                  assert.isTrue(valid, "Branches are not up to date with master");
                }
              })
            } 
          })
        } else{
          console.log(branchObject);
          assert.isTrue(valid, "Branches are not up to date with master");
        }
      })
        
        
    }
    
    page.checkBranchStatus(null, callback);
    done();
  });
});