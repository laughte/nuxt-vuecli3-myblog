<template>
  <v-card flat>
    <v-toolbar color="cyan" dark flat>
      <!-- <v-carousel
      cycle
      show-arrows-on-hover
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="300"
    >
      <v-carousel-item v-for="(slide, i) in musicImgSlides" :key="i">
        <v-sheet :color="colors[i]" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      </v-carousel>-->
    </v-toolbar>

    <v-tabs background-color="white" color="deep-purple accent-4">
      <v-tab v-for="(e,i) in musicItems" :key="i">{{e.title}}</v-tab>

      <v-tab-item v-for="n in 4" :key="n">
        <v-container fluid>
          <v-row v-if="$store.state.musicAblumData.length>0" justify="center">
            <v-col
              lg="2"
              md="3"
              sm="4"
              xs="12"
              v-for="(item,index) in $store.state.musicAblumData.slice((page-1)*18,page*18)"
              :key="index"
            >
              <v-card>
                <v-img :src="item.picUrl" :lazy-src="item.picUrl">
                  <v-card-text class="white--text">{{item.copywriter}}</v-card-text>
                </v-img>

                <v-list-item three-line>
                  <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
                  <v-btn @click="getMusicAlbumm(item)" color="red" icon>
                    <v-icon>mdi-arrow-right-drop-circle</v-icon>
                  </v-btn>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <div v-if="Math.ceil($store.state.musicAblumData.length/18)>1" class="text-center">
            <v-pagination v-model="page" :length="Math.ceil($store.state.musicAblumData.length/18)"></v-pagination>
          </div>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      model: 'tab-2',
      musicItems: [
        { title: '个性推荐', url: '' },
        { title: '歌单', url: '' },
        { title: '歌手', url: '' },
        { title: '最新音乐', url: '' }
      ],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    getMusicAlbumm(e) {
      this.$store.commit('changeAlbum', e)
      this.$router.push('/music/albumDetail')
      this.$axios
        .get(this.$store.state.musicserve + '/playlist/detail?id=' + e.id)
        .then(res => {
          this.musicCardFlag = false //musicAlbum && !musicCardFlag
          // 获取歌单全部歌曲id来请求歌曲
          //   console.log(res.playlist.trackIds)
          let idlists = []
          res.playlist.trackIds.forEach((e, i) => {
            idlists.push(e.id)
          })

          this.$axios

            .get(
              this.$store.state.musicserve +
                '/song/detail?ids=' +
                idlists.join(',')
            )
            .then(res => {
              this.$store.commit('changeMusicAlbum', res.songs)
              //   this.musicAlbum = res.songs
            })
        })
    }
  }
}
</script>

<style>
</style>