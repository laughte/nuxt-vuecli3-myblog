<template>
  <v-app>
    <v-navigation-drawer
      floating
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevate-on-scroll hide-on-scroll :clipped-left="clipped" fixed app dense>
      <v-app-bar-nav-icon @click.stop="drawer=!drawer" />
      <v-btn class="d-none d-sm-none d-md-flex" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-row align="center">
        <v-switch
          hide-details
          v-model="$vuetify.theme.dark"
          primary
          :label="$vuetify.theme.dark?'light':'Dark'"
        ></v-switch>
        <v-btn @click="backhome()" depressed text class="ml-2 d-none d-sm-none d-md-flex">
          <span v-text="$store.state.user.userName?$store.state.user.userName:title"></span>
        </v-btn>
      </v-row>

      <v-row align="center">
        <weather />
      </v-row>

      <!-- <v-row align="center" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          @change="searchKeywords"
          append-icon="mdi-magnify"
          hide-details
        ></v-text-field>
      </v-row>-->
      <v-spacer />

      <v-btn
        v-if="$store.state.user.userName"
        v-text="$store.state.user.userName"
        text
        rounded
        class="my-2"
      ></v-btn>
      <v-btn v-else text to="/signin">sign in</v-btn>
      <v-divider class="mx-4" inset vertical :color="$store.state.sidecolor"></v-divider>
      <v-avatar size="50px">
        <img v-if="$store.state.user.imgsrc" :src=" $store.state.user.imgsrc" alt="avatar" />
        <img v-else src="https://i.loli.net/2019/08/31/QKl2uXoJa653HhC.jpg" alt="avatar" />
      </v-avatar>

      <v-btn icon @click.stop="showCollect()">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!-- <v-btn text @click="getdata">getdata</v-btn> -->
    </v-app-bar>
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
      <source
        :src="$store.state.musicUrl.url?$store.state.musicUrl.url:$store.state.musicUrl.mp3Url"
        type="audio/mpeg"
      />您的浏览器不支持 audio 元素。
    </audio>
    <div class="playButton">
      <v-bottom-sheet>
        <template v-slot:activator="{ on }">
          <v-btn @click="lastMusic()" icon>
            <v-icon large color="red">mdi-skip-previous-circle</v-icon>
          </v-btn>

          <v-btn icon color="red" dark v-on="on">
            <v-icon large>mdi-music-circle</v-icon>
          </v-btn>

          <v-btn icon color="red" @click="startPlayOrPause()">
            <v-icon
              large
              color="red"
            >{{$store.state.audio.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"}}</v-icon>
          </v-btn>
          <v-btn @click="nextMusic()" icon>
            <v-icon large color="red">mdi-skip-next-circle</v-icon>
          </v-btn>
        </template>

        <v-card tile>
          <!-- 音乐播放列表 -->
          <v-card class="palylist" v-show="playListFlag">
            <v-simple-table fixed-header height="650px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" style="width:20px"></th>
                    <th class="text-left" style="width:180px">歌曲</th>
                    <th class="text-left" style="width:150px">歌手</th>
                    <th class="text-left" style="width:60px">时长</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    @dblclick="playMusic(item)"
                    :style="{background:index%2?'#fff':'#FAFAFA'}"
                    v-for="(item,index) in $store.state.musicPlayList"
                    :key="item.id"
                  >
                    <td>
                      <v-icon color="red">
                        {{
                        $store.state.musicUrl.id===item.id?($store.state.audio.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"):""
                        }}
                      </v-icon>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.artists?item.artists[0].name:item.ar[0].name }}</td>
                    <td>{{ item.duration?item.duration:item.dt }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <!-- 音乐播放列表 -->
          <v-progress-linear
            buffer-value="100"
            :value="$store.state.audio.sliderTime"
            class="my-0"
            height="3"
            stream
            color="orange"
          ></v-progress-linear>
          <!-- <v-progress-linear v-if="pregressflag" :value="audio.sliderTime" class="my-0" height="3"></v-progress-linear>
          <v-progress-linear v-else :value="audio.sliderTime" class="my-0" height="3"></v-progress-linear>-->

          <v-list>
            <v-list-item>
              <v-list-item-avatar size="65" tile>
                <v-img v-if="$store.state.songAlbumPic" :src="$store.state.songAlbumPic.picUrl"></v-img>
                <v-img
                  v-else
                  src="https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-icon>
                <v-btn @click="lastMusic()" icon>
                  <v-icon large color="red">mdi-skip-previous-circle</v-icon>
                </v-btn>

                <v-btn icon @click="startPlayOrPause()">
                  <v-icon
                    large
                    color="red"
                  >{{$store.state.audio.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"}}</v-icon>
                </v-btn>

                <v-btn @click="nextMusic()" icon>
                  <v-icon large color="red">mdi-skip-next-circle</v-icon>
                </v-btn>
              </v-list-item-icon>

              <div class="flex-grow-1"></div>
              <v-list-item-content>
                <v-list-item-title>{{$store.state.audio.songsInfo.name}}</v-list-item-title>
                <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
              </v-list-item-content>

              <!-- <div class="flex-grow-1"></div> -->
              <!-- <span>{{audio.maxTime|formatSecond }}</span> -->
              <v-row align="center">
                <v-slider
                  hide-details
                  color="red"
                  @change="changeVolume"
                  prepend-icon="mdi-volume-high"
                ></v-slider>
              </v-row>
              <v-list-item-icon>
                <v-btn color="red" @click="playListFlag=!playListFlag" icon>
                  <v-icon>mdi-playlist-music</v-icon>
                </v-btn>
              </v-list-item-icon>
              <!-- <v-progress-linear color="red lighten-2" buffer-value="0" stream></v-progress-linear> -->
            </v-list-item>
          </v-list>
        </v-card>
      </v-bottom-sheet>
    </div>
    <v-content class="pt-10">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-card flat>
        <v-card-actions>
          <v-btn icon @click.native="right = !right">
            <v-icon light>mdi-repeat</v-icon>
          </v-btn>
          <v-btn text class="pa-0" :to="'/'+$store.state.user.userName">
            <v-icon small>mdi-account-edit</v-icon>
            {{ $store.state.user.userName ? $store.state.user.userName : "未知用户" }}
          </v-btn>
          <v-btn text class="pa-0">{{ '已收藏的文章' }}</v-btn>
        </v-card-actions>
        <v-divider :inset="false"></v-divider>
        <v-list three-line>
          <template v-for="(item, index) in $store.state.userCollect">
            <!-- <v-subheader :key="index" v-text="item.time"></v-subheader> -->
            <v-list-item @click="showItem(item)" :key="item._id">
              <!-- <v-list-item-avatar>
                <v-img :src="$store.state.user.imgsrc"></v-img>
              </v-list-item-avatar>-->
              <v-list-item-content class="pt-0">
                <v-list-item-title
                  class="headline mb-2"
                  v-if="item.blocks[0]"
                >{{item.blocks[0].data.text}}</v-list-item-title>
                <v-list-item-subtitle v-if="item.blocks[1]" v-text="item.blocks[1].data.text"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.blocks[2]" v-text="item.blocks[2].data.text"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.blocks[3]" v-text="item.blocks[3].data.text"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.blocks[4]" v-text="item.blocks[4].data.text"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="index + 1 < $store.state.userCollect.length"
              :key="index"
              :inset="false"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-footer absolute app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import weather from '~/components/weather.vue'
import axios from 'axios'
export default {
  components: { weather },
  data() {
    return {
      playListFlag: false,
      switch1: true,
      signupflag: false,
      signinflag: false,
      clipped: true,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: '广场',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: '个人主页',
          to: `/${this.$store.state.user.userName}`
        },
        {
          icon: 'mdi-border-color',
          title: '写作',
          to: '/writeboard'
        },
        {
          icon: 'mdi-star',
          title: '星空(谨慎打开,没有优化好可能会卡到爆))',
          to: '/starSky'
        },
        {
          icon: 'mdi-image',
          title: '图片',
          to: '/picture'
        },
        {
          icon: 'mdi-music',
          title: '音乐',
          to: '/music'
        },
        {
          icon: 'mdi-database-edit',
          title: '管理',
          to: '/manage'
        },
        {
          icon: 'mdi-settings',
          title: '设置',
          to: '/setting'
        },
        {
          icon: 'mdi-youtube',
          title: '视频',
          to: '/newtemplate'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '自在飞花轻似梦'
    }
  },
  methods: {
    // 返回主页
    backhome() {
      this.$router.push('/')
    },

    // 文章搜索 searchKeywords
    searchKeywords(e) {
      this.$store.commit('searchKeywords', e)
    },

    getdata() {
      this.$axios
        .get('/api/myblog', {
          params: {
            page: 1
          }
        })
        .then(res => {
          // console.log(res)
          this.$store.commit('readData', res.reverse())
        })
        .catch(err => {
          console.log(err)
        })
    },

    getZhiHuData() {
      this.$axios
        .get('https://api.isoyu.com/api/Zhihu/zhihu_daily')
        .then(res => {
          // console.log(res)
          this.$store.commit('getzhihu', res.data.stories)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getNews() {
      this.$axios
        .get('https://www.mxnzp.com/api/news/list?typeId=521&page=1')
        .then(res => {
          // console.log(res)
          this.$store.commit('getnews', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getJokeData() {
      this.$axios
        .get('https://www.mxnzp.com/api/jokes/list?page=1')
        .then(res => {
          this.$store.commit('getjoke', res.data.list)
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },

    showCollect() {
      if (this.rightDrawer) {
        this.rightDrawer = false
      } else {
        this.$store.commit('userCollectFunc')
        this.rightDrawer = true
      }
    },
    showItem(e) {
      this.$router.push({
        path: `/${e.userName}/${e._id}`,
        query: { id: e._id }
      })
    },

    //侧边栏切换
    // changedrawer() {
    //   this.drawer = !this.drawer
    // },

    //选择播放音乐
    playMusic(e) {
      // this.$store.state.audio.songsInfo = e
      this.$store.commit('playlistPlay', e)
      //根据歌曲专辑id获取对应专辑
      // /album?id=38991
    },

    // 获取推荐音乐
    getNewSongs() {
      //
      this.$axios
        .get(this.$store.state.musicserve + '/personalized/newsong')
        .then(res => {})
    },
    // 获取每日推荐专辑
    newgetMusic(e) {
      this.$axios.get(this.$store.state.musicserve + +e).then(res => {
        // console.log(res)
        this.$store.commit('changeMusicAblumData', res.result)
      })
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      // this.$store.commit('starOrpause')
      return this.$store.state.audio.playing ? this.pause() : this.play()
    },
    //上一曲 $store.state.musicPlayList
    lastMusic() {
      this.$store.commit('lastMusic')
    },
    // 下一曲
    nextMusic() {
      this.$store.commit('nextMusic')
    },

    //加载音乐
    load() {
      this.pregressflag = true
      this.$refs.audio.load()
      // console.log(this.$refs.audio)
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
      this.$store.commit('onPlay')
      // this.$store.state.audio.playing = true
    },
    // 当音频暂停
    onPause() {
      this.$store.commit('onPause')
      // this.$store.state.audio.playing = false
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      // console.log('timeupdate')
      // console.log(res)
      this.$store.commit('onTimeupdate', res)
      // this.$store.state.audio.currentTime = res.target.currentTime
    },
    // 当加载音蘋流元数据完成后，会触发该事件的回调函数
    // 音蘋元数据主要是音蘋的长度之类的数据
    onLoadedmetadata(res) {
      // console.log('loadedmetadata')
      // console.log(res)
      this.pregressflag = false
      this.$store.commit('onLoadedmetadata', res)
      // this.$store.state.audio.maxTime = parseInt(res.target.duration)
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.$store.state.audio.maxTime
      )
    },

    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.$store.state.audio.maxTime / 100) * index)
      return realFormatSecond(index)
    },
    // 声音调整
    changeVolume(n) {
      // console.log(n / 100)
      this.$refs.audio.volume = n / 100
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

  computed: {
    musicUrl: function() {
      return this.$store.state.musicUrl
    },
    playOrpause: function() {
      return this.$store.state.sideMusicFlag
    }
  },
  watch: {
    musicUrl: function() {
      this.load()
      this.play()
    },
    playOrpause: function() {
      this.startPlayOrPause()
    }
  },

  created() {
    // this.newgetMusic('/search?keywords=踏行')
    // this.newgetMusic('/personalized')

    if (this.$store.state.article.length < 1) {
      this.getdata()
    }
    if (this.$store.state.zhihuData.length < 1) {
      this.getZhiHuData()
    }
    if (this.$store.state.jokes.length < 1) {
      this.getJokeData()
    }
    if (this.$store.state.dailyNews.length < 1) {
      this.getNews()
    }
  },
  mounted() {
    // this.load()
    // this.paly()
  }
}
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
</script>
<style lang="scss" scoped>
.playButton {
  position: fixed;
  top: 80%;
  z-index: 9;
  left: -120px;

  transition: all 0.3s; //0.5, 0.05, 1, 0.5
  animation: playtag 1s cubic-bezier(0.5, 0.05, 1, 0.5) 1s 3 alternate;
}
@keyframes playtag {
  0% {
    transform: translate3d(0, -500px, 0);
  }
  100% {
    transform: translate3d(0, 0px, 0);
  }
}
.playButton:hover {
  left: 0px;
}
.palylist {
  /* right: 0px; */
  /* bottom: 75px; */
  /* position: absolute; */
}
</style>