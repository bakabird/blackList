<template>
  <!--<v-touch :class="{ selected: onBow}" v-on:press='select()'>-->
    <div :class="{ selected: onBow}" class="pannel_item">
      <!-- when it's a txt -->
      <p class="pannel_item_content"
         v-if="!linkFlg"
         v-on:touchstart="startTouchOnPhone()" v-on:touchend="endTouchOnPhone()"
         @mousedown="startTouchOnPc()" @mouseup="endTouchOnPc()">{{txt}}</p>
      <!-- when it's a link-->
      <a class="pannel_item_content pannel_item_content_link"
         v-else @click.prevent
         v-on:touchstart="startTouchOnPhone()" v-on:touchend="endTouchOnPhone(jump)"
         @mousedown="startTouchOnPc()" @mouseup="endTouchOnPc(jump)">{{word}}</a>
      <p class="pannel_item_delete" @click="deleteIt()">X</p>
    </div>
  <!--</v-touch>-->
</template>

<script type="text/ecmascript-6">

  export default {
    name: "item",
    props: {
      txt: {
        type: String,
        required: true,
      },
      onBow: {
        type: Boolean,
        required: true
      },
      arrOnBow: {
        type: Boolean,
        required: true
      }
    },
    data:()=>{
      return {
        touchStartStamp: -1,
        pressTimeout: undefined
      }
    },
    computed:{
      linkFlg: function(){
        return this.txt.match(/\[.*?\]\(.*?\)/);
      },
      word: function(){
        if(this.txt.match(/\[.*?\]\(.*?\)/)){
          return this.txt.split("](")[0].slice(1);
        }else{
          return ""
        }
      },
      ref: function(){
        if(this.txt.match(/\[.*?\]\(.*?\)/)){
          return this.txt.split("](")[1].slice(0,-1);
        }else{
          return ""
        }
      },
      onPhone: function(){
        return 'ontouchend' in document;
      }
    },
    methods:{
      // delete this item
      deleteIt: function(){
        this.$emit("deleteit");
      },
      // if the itemContent is a link
      jump: function () {
        if(this.ref){
          window.location = this.ref;
        }
      },
      // touch-related
      startTouchOnPhone: function(){
        if(this.onPhone) {
          this.startTouch();
        }
      },
      endTouchOnPhone: function (cb) {
        if(this.onPhone) {
          this.endTouch(cb);
        }
      },
      startTouchOnPc: function(){
        if(!this.onPhone) {
          this.startTouch();
        }
      },
      endTouchOnPc: function (cb) {
        if(!this.onPhone) {
          this.endTouch(cb);
        }
      },
      startTouch: function () {
        this.touchStartStamp = Date.now();
        this.pressTimeout = setTimeout(this.pressHandle,300);
      },
      endTouch: function (cb) {
        clearTimeout(this.pressTimeout);
        const touchTime = Date.now() - this.touchStartStamp;
        if (touchTime < 300) {
          // tap
          if(this.arrOnBow){
            // there's alreay a arrow on the bow
            // the next click will be shoot
            this.$emit("shoot");
          }else{
            // there's no arrow on the bow
            // it work what it should do
            if(cb) {
              cb();
            }
          }
        }
      },
      pressHandle: function () {
        this.$emit("drawbow");
      }
    }
  }

</script>

<style scoped>
  .pannel_item{
    background: rgba(97, 77, 34, 0.28);
    border-top: 1px solid rgb(54, 61, 71);
    border-bottom: 1px solid rgb(0, 0, 0);
    height: 36px;
    line-height: 36px;
    display: flex;
    overflow: hidden;
  }
  .pannel_item_content{
    color: #eee;
    width: 95%;
    text-indent: 1em;
  }
  .pannel_item_content_link{
    color: #c0e0f8;
  }
  .pannel_item_delete{
    width: 5%;
    min-width: 30px;
    text-align: center;
    background: rgba(44, 71, 75, 0.294);
    color: rgb(113, 107, 52);
    border-left: 1px solid rgb(55, 62, 72);
  }
  /* pos-change selected */
  .selected{
    background: rgba(255, 0, 48, 0.41);
  }
</style>


