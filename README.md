Github Branch Monitoring with Protractor
========================================

This project monitors your github branches to make sure they are all up to date
with master. It uses protractor to login you in and check the all branches page 
on github, if any branches are behind master the test will fail. You can have this
test run with Jenkins to monitor if any github branches are behind and link Jenkins
to slack to to notify if the test fails. 

## How to use this project
1. Create a crendials.js file within the config folder. Copy the example 
file and fill in the information for your organization name with the @ symbol,
which repo to check, and your github login information. 

## Notes
1. This will only work for organizations at the moment as it clicks 
your organization name first before searching for a repo. 