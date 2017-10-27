const wilddog = require("wilddog");
const config = require("./src/wildSync/syncUrl.json");
const initData = require("./initData.json")

const wilddogApp = wilddog.initializeApp(config);
const sync = wilddogApp.sync();
const ref = sync.ref();

ref.set(initData);

console.log("succeed!");