import wilddog from "wilddog"

const config = {
  syncURL: "https://wd7141620453corgud.wilddogio.com" //输入节点 URL
};

const wilddogApp = wilddog.initializeApp(config);
const sync = wilddogApp.sync();
export default sync;
