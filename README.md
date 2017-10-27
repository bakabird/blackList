# blacklist

> a vue.js project.it will provide a template for others who want to create a same page to dw-y.me/going more easily.

a sub subject of my project *black board*.

## HWO IT WORK

1. Clone this project

`$ git clone https://github.com/bakabird/blackList.git` 

2. Install the node_modules

`$ npm install`

3. Setting your wilddog url in the `./src/wildSync/index.js`


```javascript
import wilddog from "wilddog"

// -- YOU SHOULD AJUST THIS -- //
const config = {
  syncURL: "https://wd7141620453corgud.wilddogio.com" 
};

const wilddogApp = wilddog.initializeApp(config);
const sync = wilddogApp.sync();
export default sync;
```

4. Build,it will build a `dist` for you than could be used.

`$ npm run build`

5. push `dist` to your github project that have open the *GitHub Pages* server.


`$ cd ./dist`

`$ git push orign master`