<template>
  <div class="pannel">
    <div class="pannel_nav">
      <div class="title" @click="toggleDel()">
        <p>{{ title }}</p>
        <p class="pannel_del" v-show="showDelBtn" @click="delPoster()">删除</p>
      </div>
      <div class="add" @click="openInput()">
        <p>添加</p>
      </div>
    </div>
    <item v-for="(item,idx) in meses.concat().reverse()"
          v-if="(idx < limit) ? true : showAll"
          :key="idx" :txt="item"
          :onBow = "arrows[meses.length - idx - 1]"
          :arrOnBow = "arrOnBow"
          v-on:deleteit="deleteIt(item)"
          v-on:drawbow="drawBowWith(meses.length - idx - 1)"
          v-on:shoot="shootTo(meses.length - idx - 1)"></item>
    <div v-bind:class="{ pannel_more: alwayTure,pannel_more__show: showAll }" @click="toggleShowALL">
      <p>{{ !long ? "-" : (showAll ? "收起" : "更多(" + (meses.length - parseInt(limit)) + ")" )}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import item from "./item.vue"
  import sync from "../wildSync"
  const swap = require("arr-swap");

  export default {
    name: "pannel",
    components:{
      item,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      posterid:{
        type:Number,
        required: true
      },
      meses: {
        type: Array,
        required: false,
        default: ()=>{
          return [];
        }
      },
    },
    data: function(){
      // max
      let max = 3;
      if(this.meses.length > 6){
        max = 4;
      }
      if(this.meses.length > 10){
        max = 6;
      }
      if(this.meses.length > 13){
        max = 8
      }

      let long = this.meses.length > max;
      let showAll = !long;
      const alwayTure = true;
      const showDelBtn = false;

      // arrows
      let arrows = new Array(this.meses.length);
      arrows.fill(false);

      return {
        showAll,
        long,
        alwayTure,
        showDelBtn,
        arrows,
        limit: max
      }
    },
    computed: {
      arrOnBow: function () {
        // check the arrows
        for(let i = 0;i < this.arrows.length;i++){
          if(this.arrows[i]){
            return true;
          }
        }

        return false;
      }
    },
    methods: {
      toggleShowALL: function() {
        this.showAll = !this.showAll;
      },
      openInput: function(){
        this.$emit("openinput")
      },
      deleteIt: function(itemContent){
        const re = confirm(`确定删除\n「${itemContent}」?`);
        if(re){
          let itemDropPos;
          for(let i = 0;i < this.meses.length;i++){
            if(this.meses[i] == itemContent){
              itemDropPos = i;
            }
          }
          let newMeses = this.meses.concat();
          newMeses.splice(itemDropPos,1);
          sync.ref(`posters/${this.posterid}/meses`).set(newMeses);
        }
      },
      // for the pannel
      toggleDel: function(){
        this.showDelBtn = !this.showDelBtn;
      },
      delPoster: function(){
        this.$emit("dropposter");
      },
      drawBowWith: function (arrowId) {
        console.log("drawBow")
        // remove others
        for(let i = 0;i < this.arrows.length;i++){
          if(this.arrows[i]){
            this.arrows.splice(i, 1, false);
          }
        }

        // set it
        this.arrows.splice(arrowId, 1, true);
      },
      shootTo: function (aimId) {
        console.log("shootTo")

        let arrowId = -1;

        // clean the arrows
        for(let i = 0;i < this.arrows.length;i++){
          if(this.arrows[i]){
            arrowId = i;
            this.arrows.splice(i, 1, false);
          }
        }

        if(arrowId != -1 && arrowId != aimId) {
          // switch them
          let newMeses = this.meses.concat();
          newMeses = swap(newMeses, arrowId, aimId);
          sync.ref(`posters/${this.posterid}/meses`).set(newMeses);
        }
      }
    },
  }
</script>

<style scoped>
  .pannel{
    width: 50%;
  }
  .pannel_nav{
    display: flex;
    height: 34px;
    line-height: 28px;
  }
  .pannel_del{
    background: rgba(134, 17, 17, 0.3);
    color: #ffcfcf;
    position: absolute;
    top: -29px;
    left: 0px;
    right: 0px;
    height: 29px;
  }
  .pannel_more{
    background: #41646e;
    text-align: center;
    height: 32px;
    line-height: 32px;
    border-bottom: 5px dashed #232425;
    box-shadow: inset 0px 3px 5px #182a40;
  }
  .pannel_more p{
    color: #a79e5a;
  }
  .pannel_more__show{
    opacity: .25;
    border: none;
    height: 30px;
    line-height: 30px;
  }
  .pannel_more__show p{
    color: #fff;
  }
  .pannel_more p{
    color: #a79e5a;
  }
  .pannel_more__show p{
    color: #fff;
  }
  @media screen and (max-width: 768px){
    .pannel{
      width: 100%;
    }
  }
</style>
