const wilddog = require("wilddog");

const config = {
  syncURL: "https://wd7141620453corgud.wilddogio.com" //输入节点 URL
};
const wilddogApp = wilddog.initializeApp(config);
const sync = wilddogApp.sync();
const ref = sync.ref();

let t = ref.child("posters/1").update({
  "meses": {

  }
})
console.log(t);
