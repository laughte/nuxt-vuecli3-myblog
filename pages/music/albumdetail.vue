<template>
  <v-card flat color="transparent" :loading="$store.state.music.albums.length<2">
    <v-card flat color="transparent">
      <v-list-item three-line>
        <v-list-item-avatar size="155" tile>
          <v-img :src="$store.state.music.album.picUrl?$store.state.music.album.picUrl:$store.state.music.album.coverImgUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="align-self-start">
          <v-list-item-title class="headline mb-2" v-text="$store.state.music.album.name"></v-list-item-title>
          <v-list-item-subtitle v-text="$store.state.music.album.copywriter"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" style="width:20px"></th>
            <th class="text-left">歌曲</th>
            <th class="text-left">歌手</th>
            <th class="text-left">专辑</th>
            <th class="text-left">时长</th>
            <th class="text-left" style="width:40px">热度</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @dblclick="playMusic(item)"
            v-for="(item,index) in $store.state.music.songs"
            :key="item.id"
          >
            <td>
              <v-icon
                color="red"
              >{{$store.state.music.song.id===item.id?($store.state.music.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"):""}}</v-icon>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.ar[0].name}}</td>
            <td>{{ item.al.name }}</td>
            <td>{{ item.dt }}</td>
            <td>{{ item.mark }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  methods: {
    playMusic(e) {
      this.$store.dispatch('playlist', e)
      console.log(e)
    }
  }
}
</script>

<style>
</style>
