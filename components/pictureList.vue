<style lang="scss">
  /*滚动条样式*/
  .smbox::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }

  .smbox::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(230, 203, 233, 0.2);
    background: rgba(255,255,255,0.5);
  }

  .smbox::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(223, 206, 235, 0.2);
    border-radius: 5px;
    background: rgba(234, 204, 235, 0.1);
  }

  .smbox {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 0;
    display: flex;
    justify-content: start;
    overflow: auto;
    transition: height 0.3s ease;
    div {
      margin-left: 0.5em;
      z-index: 99;
      height: 12vh;
      &:hover {
        img{
          margin-top: 0;
        }
      }
      img {
        transition: all 0.2s;
        height: 10vh !important;
        margin-top: 2vh;
        width: auto;
        min-width: 7vh;

      }
    }
  }
  .lgbox {
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    text-align: center;
    img {
      transition: height 0.3s ease;
      min-width: 150px;
      height: 100vh;
      width: auto;
      min-width: 550px;
      border: 1px solid rgb(250, 244, 244);
      box-shadow: 1px 1px 3px 1px rgb(134, 129, 129);
    }
  }
  .smallbar {
  div.smbox {
    height: 13vh;
  }
  img {
    height: 85vh !important;
  }
  }
  .btns{

    width: 100vw;
    position: fixed;
    top: 45%;
    display: flex;
    justify-content: space-between;
    i{
      font-size: 35px;
    }
  }
  .mouseEnter{
    opacity: 0;
    width: 100px;
    height: 100px;
    transition: opacity 0.2s;
  }
  .enterStyle{
    opacity: 1;
  }
</style>
<template>
  <div
    class="lgbox"
    :class="{'smallbar':smallbarflag}"
    @mousemove="mousemovefunc($event)"
    ref="smallbar"
  >
    <div class="btns">
      <v-btn class="mouseEnter" :class="enterOrLeave?'enterStyle':''"
             @mouseenter="enterfunc()" @mouseleave="leavefunc()"
             icon @click="arrowfunc('left')"><v-icon large>mdi-arrow-left</v-icon></v-btn>
      <v-btn class="mouseEnter" :class="enterOrLeave?'enterStyle':''"
             @mouseenter="enterfunc()" @mouseleave="leavefunc()" icon @click="arrowfunc('mid')"
      ><v-icon large>{{arrowclassicon[arrowflag]}}</v-icon></v-btn>
      <v-btn class="mouseEnter" :class="enterOrLeave?'enterStyle':''" @mouseenter="enterfunc()"
             @mouseleave="leavefunc()" icon @click="arrowfunc('right')"
      ><v-icon large>mdi-arrow-right</v-icon></v-btn>
    </div>

    <transition appear>
        <img class="lgboximg"  :src="items[count]" alt />
    </transition>


    <div class="smbox" ref="smbox">
      <div v-for="(e,i) in items" :key="i">
        <img :src="e" @mouseover="count=i" alt />
      </div>
    </div>

  </div>
</template>

<script> //  @mouseover="showlgpic(e)"
  export default {
    name: 'pictureList',
    props:{items:Array},
    data(){
      return{
        enterOrLeave:false,
        count:0,
        smallbarflag: false,
        arrowclassicon: {
          true: "mdi-arrow-right-drop-circle",
          false: "mdi-pause-circle"
        },
        arrowflag: true,
        settimer:Function,
        mouseTimmer:Function,
      }
    },
    methods:{
      enterfunc(){
        clearTimeout(this.mouseTimmer)
        this.enterOrLeave=true
      },
      leavefunc(){
        this.mouseTimmer = setTimeout(()=>{
          this.enterOrLeave=false
        },5000)

      },
      mousemovefunc(e) {
        // console.log(e.pageX, e.pageY,e.screenX,e.screenY)
        let smbarH = this.$refs.smallbar.offsetHeight;
        let smbarX = this.$refs.smallbar.offsetWidth;
        let smbox = this.$refs.smbox;
        let smboxW = smbox.offsetWidth;
        // console.log(e)
        if (e.screenY / smbarH > 0.92) {
          this.smallbarflag = true;
          smbox.scrollLeft = (e.pageX / smbarX) * smboxW * 2;
          if (e.pageX / smbarX < 0.1) {
            smbox.scrollLeft = 0;
          } else if (e.pageX / smbarX > 0.95) {
            smbox.scrollLeft = smboxW * 2.5;
          }
        } else {
          this.smallbarflag = false;
        }
      },


      arrowfunc(o) {
        if (o === "left") {
          this.count--;
          if (this.count === -1) {
            this.count = this.items.length - 1;
          }
        } else if (o === "right") {
          this.count++;
          if (this.count === this.items.length) {
            this.count = 0;
          }

        } else if (o === "mid") {
          // 幻灯片播放和停止
          this.arrowflag = !this.arrowflag;
          if (this.arrowflag === true) {
            clearInterval(this.settimer);
          } else {
            this.settimer = setInterval(this.setscend, 3200);
          }
        }
      },
      setscend() {
        this.count++;
        if (this.count === this.item.length) {
          this.count = 0;
        }
      },
    },



  }
</script>
