import wilddog from "wilddog"
const config = require("./src/wildSync/initData.json");
const initData = require("./initData.json")

const wilddogApp = wilddog.initializeApp(config);
const sync = wilddogApp.sync();
const ref = sync.ref();

ref.set(initData).then((v)=>{
    console.info(v.val());
});