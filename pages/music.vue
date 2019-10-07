<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar flat color="red">
      <v-toolbar-title to="/music" class="white--text">
        <v-btn to="/music" icon color="white">
          <v-icon>mdi-music-circle-outline</v-icon>
        </v-btn>网易云音乐
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn @click="$router.go(-1)" color="white" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn @click="$router.go(1)" color="white" icon>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
      <div class="flex-grow-1"></div>
      <v-row align="center">
        <v-text-field
          desnse
          hide-details
          color="white"
          single-line
          append-icon="mdi-magnify"
          @change="searchMusic"
          placeholder="Search..."
          prepend-inner-icon="mdi-mic"
          class="mx-4"
          flat
          rounded
          label="Search"
          solo-inverted
        ></v-text-field>
      </v-row>
      <div class="flex-grow-1"></div>
      <v-btn color="white" text>登录</v-btn>
    </v-toolbar>
    <v-row>
      <v-col lg="2" md="3" sm="4" xs="5">
        <v-list dense>
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
        </v-list>
      </v-col>
      <v-col class="mainPage" lg="10" md="9" sm="8" xs="7">
        <nuxt />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'green',
        'secondary',
        'yellow darken-4',
        'red lighten-2',
        'orange darken-1'
      ],

      musicImgSlides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],

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
    // 获取每日推荐专辑
    newgetMusic(e) {
      this.$axios.get('http://localhost:3000' + e).then(res => {
        // console.log(res)
        this.$store.commit('changeMusicAblumData', res.result)
      })
    },

    //音乐所搜
    searchMusic(e) {
      this.$axios
        .get('http://localhost:3000/search?keywords=' + e)
        .then(res => {
          //   this.musicCardFlag = false
          // console.log(res.result.songs)
          this.$store.commit('changeMusicData', res.result)
          //   this.musicData = res.result
        })
    }
  },
  created() {
    // this.newgetMusic('/search?keywords=踏行')
    if (this.$store.state.musicAblumData.length < 1) {
      this.newgetMusic('/personalized')
    }
  }
}
</script>
<style lang="scss">
.mainPage {
  position: relative;
}
tbody.tr:hover {
  background: #fb1818;
}
</style>