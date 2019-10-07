<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-row justify="center">
        <v-col>
          <v-app-bar flat dark color="red darken-1">
            <v-btn icon color="white">
              <v-icon>mdi-music-circle-outline</v-icon>
            </v-btn>

            <v-toolbar-title class="pl-0">网易云音乐</v-toolbar-title>
            <v-text-field
              class="ml-4"
              single-line
              dense
              v-model="value"
              append-outer-icon="mdi-magnify"
              @change="searchMusic"
              label="输入歌名所搜"
            ></v-text-field>
            <div class="flex-grow-1"></div>
            <v-spacer></v-spacer>
            <v-btn text>登录</v-btn>
          </v-app-bar>

          <v-row>
            <v-col xl="3" lg="3" md="4" sm="12" xs="12">
              <v-list>
                <template v-for="(item, index) in musicSideItems">
                  <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                  <v-list-item v-else :key="index" @click>
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-subtitle v-html="item.title"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-spacer></v-spacer>
                <v-list-item two-line>
                  <v-list-item-avatar size="45" tile>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="align-self-start">
                    <v-list-item-title class="mb-2" v-text="'歌名'"></v-list-item-title>
                    <v-list-item-subtitle v-text="'专辑名'"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col class="musicMainPage pa-0" xl="9" lg="9" md="8" sm="12" xs="12">
              <v-card flat color="#FAFAFA">
                <v-card-actions>
                  <v-btn
                    @click="getMusic(e.url)"
                    text
                    :key="i"
                    v-for="(e ,i) in musicMenus"
                    v-text="e.title"
                  ></v-btn>
                </v-card-actions>
                <v-divider></v-divider>

                <v-container class="pa-2" fluid>
                  <v-data-table
                    v-if="results.songs || results.song"
                    :items="results.songs ||results.song"
                    :headers="headers"
                    item-key="id"
                    class="elevation-1"
                    @click:row="playMusic"
                  >
                    <template v-slot:index.index="{index}">
                      <span>{{index}}</span>
                    </template>

                    <template v-slot:item.action="{item}">
                      <v-icon
                        small
                        class="pr-2"
                        @click.stop.prevent="addLike(item)"
                      >mdi-heart-outline</v-icon>
                      <v-icon small @click.stop.prevent="download(item)">mdi-cloud-download-outline</v-icon>
                    </template>
                    <template v-slot:item.artistName="{item}">
                      <span>{{item.artists[0].name}}</span>
                    </template>

                    <template v-slot:item.artistAlbum="{item}">
                      <span>{{item.album.name}}</span>
                    </template>
                  </v-data-table>
                  <v-row justify="center" v-else>
                    <v-col>
                      <v-card
                        flat
                        color="white"
                        class="mb-2"
                        v-for="(item,index) in results.slice((page-1)*7,7*page)"
                        :key="index"
                      >
                        <v-list-item three-line>
                          <v-list-item-avatar height="140px" width="220px" size="125" tile>
                            <v-img v-if="item.picUrl" :src="item.picUrl"></v-img>
                            <v-img v-else src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
                          </v-list-item-avatar>
                          <v-list-item-content class="align-self-start">
                            <v-list-item-title class="headline mb-2" v-if="item.name">{{item.name}}</v-list-item-title>
                            <v-list-item-subtitle v-if="item.copywriter" v-text="item.copywriter"></v-list-item-subtitle>

                            <v-spacer />
                            <div class="flex-grow-1"></div>
                            <v-card-actions>
                              <v-btn @click="getMusicAlbum(item.id)" icon color="red">
                                <v-icon>mdi-arrow-right-drop-circle</v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                      <div class="text-center" v-if="Math.ceil(results.length/7)>1">
                        <a href="#" style="text-decoration:none">
                          <v-pagination
                            circle
                            v-model="page"
                            :length="Math.ceil(results.length/7)"
                            prev-icon="mdi-menu-left"
                            next-icon="mdi-menu-right"
                          ></v-pagination>
                        </a>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <!-- playlist -->
              <v-data-table
                v-show="playListFlag"
                :headers="playListHeaders"
                :items="musicpLayList"
                class="elevation-1 playlist"
              ></v-data-table>
            </v-col>
          </v-row>

          <v-card>
            <v-card-actions>
              <v-btn icon>
                <v-icon large color="red">mdi-skip-previous-circle</v-icon>
              </v-btn>
              <v-btn icon @click="startPlayOrPause()">
                <v-icon
                  large
                  color="red"
                >{{audio.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"}}</v-icon>
              </v-btn>
              <v-btn @click="showmeurl" icon>
                <v-icon large color="red">mdi-skip-next-circle</v-icon>
              </v-btn>
              <v-btn color="white" text width="60%">
                <!-- <v-progress-linear buffer-value="60" value="40" stream color="red"></v-progress-linear> -->
                <v-slider
                  :label="audio.currentTime | formatSecond"
                  v-model="sliderTime"
                  @change="changeCurrentTime"
                  color="red"
                ></v-slider>
              </v-btn>
              <span>{{audio.maxTime|formatSecond }}</span>
              <v-btn color="white" text width="20%">
                <v-slider
                  color="red"
                  @change="changeVolume"
                  v-model="soundValue"
                  prepend-icon="mdi-volume-high"
                ></v-slider>
              </v-btn>
              <v-btn @click="playListFlag=!playListFlag" icon>
                <v-icon>mdi-playlist-music</v-icon>
              </v-btn>
            </v-card-actions>
            <audio
              ref="audio"
              @timeupdate="onTimeupdate"
              @loadedmetadata="onLoadedmetadata"
              @pause="onPause"
              @play="onPlay"
              @progress="onProgress"
              @loadstart="onloadstart"
              @volumechange="onvolumechange"
              preload="auto"
            >
              <source :src="musicUrl" type="audio/mpeg" />您的浏览器不支持 audio 元素。
            </audio>
            <!-- <v-progress-linear color="red lighten-2" buffer-value="0" stream></v-progress-linear> -->
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
function realFormatSecond(second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return (
      hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    )
  } else {
    return '0:00:00'
  }
}
export default {
  data() {
    return {
      page: 1,
      tableShowFlag: false,
      musicdrawer: true,
      sliderTime: 0,
      selected: [2],
      soundValue: 0,
      value: '葬花吟',
      results: [],
      playListFlag: false,
      musicpLayList: [],
      playListHeaders: [
        { text: '歌曲名', value: 'name' },
        { text: '歌手', value: 'artistName' },
        { text: '时间', value: 'time' }
      ],
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0
      },
      musicUrl: '',
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'index'
        },
        {
          text: 'action',
          align: 'left',
          sortable: false,
          value: 'action'
        },
        { text: '曲名', value: 'name' },
        { text: '歌手', value: 'artistName' },
        { text: '专辑', value: 'artistAlbum' }
      ],
      musicMenus: [
        { title: '推荐', url: '/personalized' },
        { title: '排行榜', url: '/top/list?idx=2' },
        { title: '最新专辑', url: '/album/newest' }
      ],
      musicSideItems: [
        { header: '推荐' },
        { title: '发现音乐', icon: 'mdi-music', url: '/recommend/resource' },
        {
          title: '私人FM',
          icon: 'mdi-access-point',
          url: `/user/dj?uid=${this.$store.state.musicUser.userId}`
        },
        { title: '朋友', icon: 'mdi-account-supervisor-outline', url: '' },
        { header: '我的音乐' },
        {
          title: '我喜欢的音乐',
          icon: 'mdi-heart-outline',
          url: `/likelist?uid=${this.$store.state.musicUser.userId}`
        },
        {
          header: '我的歌单',
          url: `/user/playlist?uid=${this.$store.state.musicUser.userId}`
        }
      ]
    }
  },
  methods: {
    changeVolume(n) {
      console.log(n / 100)
      this.$refs.audio.volume = n / 100
    },
    showmeurl() {
      console.log(this.musicUrl)
    },
    getMusic(e) {
      this.$axios.get('http://localhost:3000' + e).then(res => {
        console.log(res)
        this.results = res.result
      })
    },
    searchMusic() {
      this.$axios
        .get('http://localhost:3000/search?keywords=' + this.value)
        .then(res => {
          // console.log(res.result.songs)
          this.results = res.result
        })
    },
    getMusicAlbum(id) {
      this.$axios
        .get('http://localhost:3000/playlist/detail?id=' + id)
        .then(res => {
          console.log(res)
          this.musicpLayList = res.album.songs
        })
    },
    playMusic(e) {
      this.$axios.get('http://localhost:3000/song/url?id=' + e.id).then(res => {
        // console.log(res.data[0].url)
        this.musicUrl = res.data[0].url
        if (this.musicUrl) {
          this.$refs.audio.load()
          this.play()
        }
      })
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play()
    },

    // 播放音频
    play() {
      this.soundValue = this.$refs.volume * 100
      this.$refs.audio.play()
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log('timeupdate')
      // console.log(res)
      this.audio.currentTime = res.target.currentTime
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log('loadedmetadata')
      // console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      )
    },
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      )
    },
    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index)
      return realFormatSecond(index)
    },
    onProgress() {},
    onloadstart() {},
    onvolumechange() {},

    addLike(item) {},
    download(item) {}
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    // transPlayPause(value) {
    //   return value ? '暂停' : '播放'
    // },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second)
    }
  },
  created() {
    this.getMusic('/personalized')
  }
}
</script>

<style>
.musicMainPage {
  position: relative;
}
.playlist {
  position: absolute;
  right: 12px;
  bottom: 0;
}
</style>