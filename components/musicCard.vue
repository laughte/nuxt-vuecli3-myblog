<template>
  <v-card flat class="mx-auto mb-4" @click.stop="getMusicAlbumm(item)" >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="title"
              v-text="item.name"
            ></v-card-title>
            <p class="subtitle-2 pl-4 pr-4 ma-0" v-text="item.copywriter"></p>
            <v-btn class="pl-4" @click.stop="playlist(item)" color="red" icon>
              <v-icon>mdi-arrow-right-drop-circle</v-icon>
            </v-btn>
          </div>

          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
            <v-img :src="item.picUrl" :lazy-src="item.picUrl">
            </v-img>
          </v-avatar>
        </div>


  </v-card>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'musicCard',
    props:{item:Object},
    methods:{
      ...mapActions(['reqSong' ,'reqMusic','lastMusic','nextMusic']),
      getMusicAlbumm(e) {
        this.$router.push('/music/albumDetail')
        this.playlist(e)
      },
      playlist(e){
        this.$store.commit('getmusic', { type: 'album', data: e })
        this.$axios
          .get(this.$store.state.musicserve + '/playlist/detail?id=' + e.id)
          .then(res => {
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
                this.$store.commit('getmusic', { type: 'songs', data: res.songs });
                this.$store.commit('getmusic',{type:'playlist',data:res.songs});
              })
            this.nextMusic()
          })
      }
    },

  }
</script>

<style scoped>

</style>
