# BlackList

> a vue.js project.it will provide a template for others who want to create a same page to dw-y.me/going more easily.

a sub subject of my project *black board*.

## HWO IT WORK

1. Clone this project

`$ git clone https://github.com/bakabird/blackList.git` 

2. Install the node_modules

`$ npm install`

3. Setting your wilddog url in the `./src/wildSync/syncUrl.json`


```javascript
{
    // -- YOU SHOULD AJUST FOLLOW -- //
    "syncURL": "https://<appId>.wilddogio.com/"
    // -- YOU SHOULD AJUST ABOVE -- //
}
```

4. Setting your list name in the `./initData.json`


```json
{
    "board":{
		// -- YOU SHOULD AJUST FOLLOW -- //
        "name": "<balcklist>"
		// -- YOU SHOULD AJUST ABOVE -- //
    },
    "posters":{
        "0": {
            "id": 0,
            "name": "新的便签",
            "pos": 0,
            "mes": [
                "第一行"
            ]
        }
    }
}
```


5. Init your wilddog hub

`$ npm run init`


5. Build,it will build a `dist` for you that could be used.

`$ npm run build`

6. open the `dist/index.html` you will see your board

`$ open dist/index.html`