<template>
  <div id="app">
    <div class="nav">
      <div class="title">
        <p>{{board.name}}</p>
      </div>
      <div class="add" @click="openInput(-1)">
        <p>添加</p>
      </div>
    </div>
    <div class="pannels">
      <pannel v-for="pos in posarr" :key="posters[pos].name"
              :title="posters[pos].name" :meses="posters[pos].meses" :posterid="posters[pos].id"

              :onHand="switchFlgs[posters[pos].id]"  :posterOnHand="posterOnHand"
              v-on:drawbow="drawBowWith(posters[pos].id)" v-on:shoot="shootTo(posters[pos].id)"

              v-on:openinput="openInput(posters[pos].id)" v-on:dropposter="delPoster(posters[pos].id)">
      </pannel>
    </div>
    <div class="input" v-show="showInput">
      <div class="input_add" @click="confirmInput">
        <p>添加</p>
      </div>
      <div class="input_content">
        <p >内容:</p>
        <input type="text" v-model="contentInput">
      </div>
      <div class="input_link">
        <p>链接:</p>
        <input type="text" v-model="linkInput" :disabled="subjectInput">
      </div>
      <div class="input_cancel" @click="cancelInput">
        <p>取消</p>
      </div>
    </div>
  </div>
</template>

<script>
import pannel from "./components/pannel"
import sync from  "./wildSync"

export default {
  name: 'app',
  components: {
    pannel,
  },
  data: ()=>{
    return {
      //  below belong to the input
      showInput: false,
      currentInput: -1,
      contentInput: "",
      linkInput: "",
      subjectInput: false,
    }
  },
  wilddog:{
    posters: sync.ref("posters"),
    board: {
      source: sync.ref("board"),
      asObject: true,
    }
  },
  computed:{
    posarr: function () {
      const arr = [];
      for(let i = 0;i < this.posters.length;i++){
        arr[this.posters[i].pos] = this.posters[i].id;
      }
      return arr;
    },
    switchFlgs: function () {
      const arr = new Array(this.posters.length);
      arr.fill(false);
      return arr;
    }
  },
  methods: {
    openInput: function(target){
      const curToPosters = -1;
      // if pos >=  0 -> it mean currentInput belong to the Mes of Poster
      this.currentInput = target;
      this.showInput = true;
      // if pos == -1 -> it mean currentInput belong to the Posters
      this.subjectInput = target === curToPosters;
    },
    confirmInput: function(){
      this.showInput = false;

      if(this.contentInput !== ""){
        let id;
        if(!this.subjectInput){
          let newContent = this.linkInput === "" ? this.contentInput : `[${this.contentInput}](${this.linkInput})`;

          id = this.posters[this.currentInput].id;

          let refOfMeses = this.$wilddogRefs.posters.child(`${id}/meses`);
          let idOfNewMeses = this.posters[this.currentInput].meses ? this.posters[this.currentInput].meses.length : 0;
          refOfMeses.update({
            [idOfNewMeses]: newContent
          });
        }else{
          let newPosterTitle = this.contentInput;
          let newPosterId = this.posters.length;
          const newPosterPos = newPosterId;

          let newPoster = {
            id: newPosterId,
            name: newPosterTitle,
            meses: [
              "新的便签！"
            ],
            pos: newPosterPos
          };

          this.$wilddogRefs.posters.update({
            [newPosterId]: newPoster
          });
        }
      }

      // clear the input
      this.currentInput = -1;
      this.contentInput = "";
      this.linkInput = "";
    },
    cancelInput: function(){
      this.currentInput = -1;
      this.showInput = false;
      // clear the input
      this.contentInput = "";
      this.linkInput = "";
    },
    delPoster: function(posterId){
      const re = confirm(`确定删除\n「${this.posters[posterId].name}」?`);
      if(re){
        const newPosters = this.posters.concat();
        const dyingPosterPos = this.posters[posterId].pos;
        newPosters.splice(posterId,1); // delete
        newPosters.map((i,idx) => {
          i.id = idx;
          i.pos = i.pos > dyingPosterPos ? i.pos - 1 : i.pos;
          delete i['.key'];
          return i;
        }) // reassign the id
        debugger;
        this.$wilddogRefs.posters.set(newPosters);
      }
    }
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    color: #fff;
  }
  html{
    background: #101f2e;
  }
  body{
    display: flex;
    flex-wrap: wrap;
    width:100vw;
    max-width: 960px;
    margin: 0 auto;
  }
  #app{
    width: 100%;
  }
  .nav{
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: 30px solid rgb(36, 36, 37);
    border-top: 20px solid rgb(36, 36, 37);
    opacity: .5;
  }
  .nav .title,.nav .add{
    height: 40px;
    line-height: 40px;
  }
  .nav .title{
    background: rgba(0, 0, 0, 0.46);
  }
  .nav .add{
    background: #8b6f52;
  }
  .title{
    width: 50%;
    background: #f43662;
    padding: 3px 0;
    text-align: center;
    position: relative;
  }

  .add{
    width: 50%;
    background: #4ac37a;
    padding: 3px 0;
    text-align: center;
  }
  .pannels{
    display: flex;
    flex-wrap: wrap;
  }

  /* input */
  .input{
    position: fixed;
    top: 70px;
    left: 50%;
    width: 310px;
    margin-left: -155px;
    text-align: center;
    height: 150px;
    background: #210000;
    box-shadow: 0px 7px 25px 0px #000;
  }
  .input_add,.input_cancel{
    height: 30px;
    line-height: 30px;
  }
  .input_add{
    background: #E91E63;
  }
  .input_cancel{
    background: #036172;
  }

  .input_content,.input_link{
    display: flex;
    height: 45px;
    line-height: 45px;
  }
  .input_content p,.input_link p{
    width: 20%;
  }
  .input_content input,.input_link input{
    width: 80%;
    text-indent: 1em;
  }

  .input_content, .input_content input{
    background: rgb(172, 26, 75);
  }
  .input_link, .input_link input{
    background: #113f47;
  }

  @media screen and (max-width: 768px){
    .input{
      bottom: 150px;
      top: auto;
    }
  }
</style>
