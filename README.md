# WouldYouRather-MERN

This repository was a (relatively) simple app idea that I made to get practice with the MERN (MongoDB, Express, React, Node) stack.  
The app works by the front-end React home page grabbing 2 random 'options' from the back-end. Clicking an option then sends through the result to the back-end so that statistics can be updated (timesShown and timesPicked), the page refreshes and 2 new options are passed up.  
The way I decided to store options was to give each of them a 'scenario' and a 'theme':  
{ scenario: 'Be as strong as The Hulk', theme: 'Power'}  
Then a random theme is chosen from an array and 2 options with that theme are served. Doing it this way means that the app becomes a little more 'dynamic', each time you refresh it should (hopefully) be an entirely different set of scenarios.
