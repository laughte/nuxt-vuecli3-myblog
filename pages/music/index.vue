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

      <template v-slot:extension>
        <v-tabs v-model="model" centered slider-color="yellow" background-color="transparent">
          <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`">Item {{ i }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-row v-if="$store.state.musicAblumData.length>0" justify="center">
      <v-col
        lg="2"
        md="3"
        sm="4"
        xs="12"
        v-for="(item,index) in $store.state.musicAblumData.slice((page-1)*12,page*12)"
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
    <div v-if="Math.ceil($store.state.musicAblumData.length/12)>1" class="text-center">
      <v-pagination v-model="page" :length="Math.ceil($store.state.musicAblumData.length/12)"></v-pagination>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      model: 'tab-2'
    }
  },
  methods: {
    getMusicAlbumm(e) {
      this.$store.commit('changeAlbum', e)
      this.$router.push('/music/albumDetail')
      this.$axios
        .get('http://localhost:3000/playlist/detail?id=' + e.id)
        .then(res => {
          this.musicCardFlag = false //musicAlbum && !musicCardFlag
          // 获取歌单全部歌曲id来请求歌曲
          //   console.log(res.playlist.trackIds)
          let idlists = []
          res.playlist.trackIds.forEach((e, i) => {
            idlists.push(e.id)
          })

          this.$axios

            .get('http://localhost:3000/song/detail?ids=' + idlists.join(','))
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