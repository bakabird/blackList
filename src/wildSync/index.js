import wilddog from "wilddog"
const config = require("./syncUrl.json");

const wilddogApp = wilddog.initializeApp(config);
const sync = wilddogApp.sync();
export default sync;
