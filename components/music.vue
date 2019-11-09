<template>
  <div class="musicstyle">
    <!-- 音乐播放 -->
    <audio ref="audio"
           @loadedmetadata="onLoadedmetadata"
           @pause="onPause" @play="onPlay"
           @ended="onEnded"
          >
      <source
        :src="$store.state.music.song.url"
        type="audio/mpeg"
      />您的浏览器不支持 audio 元素。
    </audio>

    <div @mouseenter="mucmouseenterfunc" @mouseleave="mucmouseleavefunc">

      <v-btn :class="mucflag?'abstyle':'restyle'"
             icon class="playButton" @click="lastMusic()">
        <v-icon large color="red">mdi-skip-previous-circle</v-icon>
      </v-btn>

      <v-btn :class="mucflag?'abstyle':'restyle'"
             icon class="playButton" @click="startPlayOrPause">
        <v-icon large color="red">{{$store.state.music.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"}}</v-icon>
      </v-btn>

      <v-btn :class="mucflag?'abstyle':'restyle'"
             icon class="playButton" @click="nextMusic()">
        <v-icon large color="red">mdi-skip-next-circle</v-icon>
      </v-btn>

      <v-btn @click="$emit('musiclistf')" ref="mucBtn" style="background: white"
             :class="$store.state.music.playing?'playingCycle':'stopCycle'"
             icon class="playButton">
        <v-icon large color="red">mdi-music-circle</v-icon>
      </v-btn>


    </div>

  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  data(){
      return{
        timeout:Function,
        playListFlag:false,
        mucflag:true,
      }
  },
  methods: {
    ...mapMutations(['onPlay','onPause']),
    ...mapActions(['lastMusic','nextMusic']),
    mucmouseleavefunc(){
      this.timeout =  setTimeout(()=>{this.mucflag=false},2000);
    },
    mucmouseenterfunc(){
      clearTimeout(this.timeout)
      this.mucflag=true
    },

    animatedFunc(e){
      console.log(e)
      e.addEventListener('animationend', ()=>{
        e.classList.remove('')
        e.classList.add('')
      });
    },

    // 当加载音蘋流元数据完成后，会触发该事件的回调函数
    // 音蘋元数据主要是音蘋的长度之类的数据
    onLoadedmetadata(res) {
      // console.log('loadedmetadata')
      // console.log(res)
      // this.$store.state.audio.maxTime = parseInt(res.target.duration)
      this.play()
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.$store.state.music.playing ? this.pause() : this.play()
    },
    //选择播放音乐
    playMusic(e) {
      // this.$store.state.audio.song = e
      this.$store.commit('playlistPlay', e)
      //根据歌曲专辑id获取对应专辑
      // /album?id=38991
    },
    //加载音乐
    load() {
      this.$refs.audio.load()
      // console.log(this.$refs.audio)
    },
    // 播放音频
    play() {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause()
    },
    // 播放完毕
    onEnded(){
      this.nextMusic()
    }
  },
  computed: {
    musicUrl: function() {
      return this.$store.state.music.song
    }
  },
  watch: {
    musicUrl: function() {
      this.load()
    },
    playOrPause: function() {
      this.startPlayOrPause()
    }
  },
  mounted() {
    setTimeout(this.mucmouseleavefunc,6000)

    // this.animatedFunc(this.$refs.mucBtn)
  }
}
//  :class="$store.state.music.playing?'playingCycle':'stopCycle'"
</script>

<style>
  .musicstyle{
    z-index: 9999;
  }
  .stopCycle{
    left: 20px;
    position: fixed;
    top: 90vh;
    z-index: 9;


  }

  .playingCycle{
    left: 20px;
    position: fixed;
    top: 90vh;
    z-index: 9;
    animation: cycling 1s linear infinite;
  }
@keyframes cycling{
  0%{transform: rotate(0deg) }
  100%{transform: rotate(360deg)}
}
  .playButton {
    left: 20px;
    position: fixed;
    top: -35px;
    z-index: 9;
    transition: all 0.3s ease;
    animation: playtag 1.5s cubic-bezier(0.5, 0.05, 1, 0.5) 3  forwards alternate;
  }
  .playButton:nth-child(1){
    animation-delay: 1s;
  }
  .playButton:nth-child(2){
    animation-delay: 1.3s;
  }
  .playButton:nth-child(3){
    animation-delay: 1.5s;
  }
  .playButton:nth-child(4){
    animation-delay: 1.6s;
  }

  .abstyle:nth-child(1){
    margin-left:40px ;
  }
  .abstyle:nth-child(2){
    margin-left:80px ;
  }
  .abstyle:nth-child(3){
    margin-left:120px ;
  }
  .abstyle:nth-child(4){
    margin-left:160px ;

  }

  .restyle{
    margin: 0;
  }
  .restyle:nth-child(4){
    transform: rotate(45deg);
  }


  @keyframes playtag {
    0% {
      transform: translate3d(0, 0px, 0);
    }

    100%{
      transform: translate3d(0, 90vh, 0);
    }
  }


</style>
