<template>
  <v-card flat>
    <v-list-item three-line>
      <v-list-item-avatar size="220">
        <v-img v-if="$store.state.songAlbumPic" :src="$store.state.songAlbumPic.picUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item-content class="align-self-start">
        <v-list-item-title class="mb-2" v-text="$store.state.audio.songsInfo.name"></v-list-item-title>
        <v-list-item-subtitle v-text="'专辑名'"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>{{musicLyric?musicLyric.lyric:'没有歌词'}}</v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn @click icon>
        <v-icon large color="red">mdi-skip-previous-circle</v-icon>
      </v-btn>
      <v-btn icon @click>
        <v-icon
          large
          color="red"
        >{{$store.state.audio.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"}}</v-icon>
      </v-btn>
      <v-btn @click icon>
        <v-icon large color="red">mdi-skip-next-circle</v-icon>
      </v-btn>
      <v-btn to="/music/songDetail" icon>
        <v-icon color="red" large>mdi-music-circle</v-icon>
      </v-btn>
    </v-card-actions>
    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-row>
        <v-col lg="8">
          <template v-for="(item, index) in musicCommentHot">
            <v-list-item three-line :key="item.id" @click>
              <v-list-item-avatar>
                <v-img :src="item.user.avatarUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="pt-0">
                <v-list-item-subtitle>
                  <a style="text-decoration:none" href>{{item.user.nickname}}</a>
                  : {{item.content}}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <span>{{new Date(item.time).toLocaleDateString() }}</span>
                  <v-list-item-icon>
                    <v-icon x-small color="red">mdi-music-circle</v-icon>
                  </v-list-item-icon>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index + 1 < musicCommentHot.length" inset :key="index"></v-divider>
          </template>
        </v-col>
        <v-col lg="4">
          <v-list three-line>
            <v-subheader v-text="'包含此歌的歌单'"></v-subheader>
            <v-divider inset></v-divider>
            <template v-for="(item) in RelatedRecommend">
              <v-list-item :key="item.title" @click>
                <v-list-item-avatar tile>
                  <v-img :src="item.coverImgUrl"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-subheader>相似歌曲</v-subheader>
            <v-divider inset></v-divider>
            <template v-for="(item) in similarSongs">
              <v-list-item :key="item.id" @click="getPlay(item)">
                <v-list-item-avatar size="45" tile>
                  <v-img :src="item.album.blurPicUrl"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>{{item.name}}({{item.alias[0]}})</v-list-item-subtitle>
                  <v-list-item-subtitle>{{item.artists[0].name}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-subheader>喜欢这首歌的人</v-subheader>
            <v-divider inset></v-divider>
            <!-- <template v-for="(item) in similarSongs">
              <v-list-item :key="item.id" @click>
                <v-list-item-avatar size="45" tile>
                  <v-img :src="item.album.blurPicUrl"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>{{item.name}}({{item.alias[0]}})</v-list-item-subtitle>
                  <v-list-item-subtitle>{{item.artists[0].name}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>-->
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      // 歌曲评论
      musicCommentHot: [],
      musicComment: [],
      //相关推荐歌单
      RelatedRecommend: [],
      // 相似歌曲
      similarSongs: [],
      // 喜欢此歌的人
      likeUser: [],
      // 歌词
      musicLyric: {}
    }
  },

  methods: {
    // 获取歌曲评论
    getMusicComment() {
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/comment/music?id=' +
            this.$store.state.musicUrl.id
        )
        .then(res => {
          //   console.log(res)
          this.musicCommentHot = res.hotComments
          this.musicComment = res.comments
        })
    },
    // 获取歌词
    // /lyric?id=33894312
    getMusicLyric() {
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/lyric?id=' +
            this.$store.state.musicUrl.id
        )
        .then(res => {
          //   console.log(res)

          this.musicLyric = res.lrc
        })
    },
    // 获取相关歌单
    getRelatedRecommend() {
      // /simi/playlist?id=
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/simi/playlist?id=' +
            this.$store.state.musicUrl.id
        )
        .then(res => {
          //   console.log(res)  sideTitle
          this.RelatedRecommend = res.playlists
        })
    },
    // 获取相似歌曲 similarSongs
    getSimilarSongs() {
      // /simi/playlist?id=
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/simi/song?id=' +
            this.$store.state.musicUrl.id
        )
        .then(res => {
          //   console.log(res)
          this.similarSongs = res.songs
        })
    },
    // 播放相似歌曲
    getPlay(e) {
      this.$store.commit('updateMusicPlayList', e)
      this.$store.commit('changeSong', e)
      //   console.log(e)
      //   this.$store.commit('getSongAlbum', e)
    },
    getLikeUser() {
      //  /simi/user?id=
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/simi/user?id=' +
            this.$store.state.musicUrl.id
        )
        .then(res => {
          console.log(res)
          //   this.likeUser = res
        })
    }
  },
  created() {
    this.getMusicComment()
    this.getMusicLyric()
    this.getRelatedRecommend()
    this.getSimilarSongs()
    // this.getLikeUser()
  }
}
</script>

<style>
</style>