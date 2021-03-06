var account = require('../../config/credentials.js');

var LoginPage = (function() {
  function LoginPage() {
    this.loginButton = element(by.xpath("/html/body/div[1]/div[1]/div/div[1]/a[2]"));
    this.emailField = element(by.xpath("//input[@name='login']"));
    this.passwordField = element(by.xpath("//input[@name='password']"));
    this.submitButton = element(by.xpath("//input[@type='submit']"));
    this.profileDropdown = element(by.xpath("//*[@id='user-links']/li[3]/a"));
    this.yourProfileLink = element(by.xpath("//*[@id='user-links']/li[3]/div/div/a[1]"));
    this.orgLink = element(by.xpath("//img[@alt='" + account.credentials.org +  "']"));
    this.searchForm= element(by.xpath("//*[@id='site-container']/div/div/div[1]/div[1]/form"));
    this.searchField = element(by.xpath("//*[@id='site-container']/div/div/div[1]/div[1]/form/div[2]/input"));
    this.branchesLink = element(by.xpath("//*[@id='js-repo-pjax-container']/div[2]/div/div/ul/li[2]/a"));
    this.allBranchesLink = element(by.xpath("//*[@id='js-repo-pjax-container']/div/div[1]/nav/a[5]"));
    this.pageNext = element(by.xpath("//div[@class='pagination']/a"));
  }

  LoginPage.prototype.gotoLoginPage = function() {
    browser.get(browser.baseUrl);
    browser.sleep(2000);
  };
  
  LoginPage.prototype.signIn = function() {
    this.loginButton.click();
    browser.sleep(2000);
    this.emailField.sendKeys(account.credentials.username);
    browser.sleep(2000);
    this.passwordField.sendKeys(account.credentials.password);
    browser.sleep(2000);
    this.submitButton.click();
    browser.sleep(2000);
  }
  
  LoginPage.prototype.isLoggedIn = function(cb) {
    this.profileDropdown.isPresent().then(function(isPresent){
      return cb(isPresent);
    });
    browser.sleep(2000);
  }
  
  LoginPage.prototype.gotoOrganization = function() {
    this.profileDropdown.click();
    browser.sleep(2000);
    this.yourProfileLink.click();
    browser.sleep(2000);
    this.orgLink.click();
    browser.sleep(2000);
  }
  
  LoginPage.prototype.searchForRepo = function() {
    this.searchForm.click();
    this.searchField.sendKeys(account.credentials.repo);
    browser.sleep(2000);
    this.repoLink = element(by.linkText(account.credentials.repo)).click();
    browser.sleep(2000);
  }
  
  LoginPage.prototype.isOnRepoPage = function(cb) {
    var urlOrg = account.credentials.org.substring(1);
    var urlRepo = browser.baseUrl + urlOrg + "/" + account.credentials.repo;
    browser.getCurrentUrl().then(function(actualUrl){
      if(actualUrl == urlRepo){
        return cb(true);
      } else {
        return cb(false);
      }
    })
  }
  LoginPage.prototype.gotoAllBranchesPage = function() {
    this.branchesLink.click();
    browser.sleep(2000);
    this.allBranchesLink.click();
    browser.sleep(2000);
  }
  
  LoginPage.prototype.checkBranchStatus = function (branchObject,cb) {
    var branchObject = branchObject || {};
    var valid = true;
    var num = 0;
    
    element.all(by.xpath("//div[@class='branch-summary js-branch-row']")).then(function(row){
      row.forEach(function(summary, index){
     summary.element(by.css("a.branch-name")).getText().then(function(branchName){
         var name = branchName;
         if(name === "master"){
           return;
         }
         summary.element(by.css("div.count-behind")).getText().then(function(count){
           
           num = parseInt(count);
           
           if(num > 0){
             valid = false;
             branchObject[name] = num;
           }
           
          if((row.length -1) == index){
            return cb(branchObject, valid);
          }
         });
       });
      });
    });
    browser.sleep(5000);
  }

  return LoginPage;
})();

module.exports = LoginPage;