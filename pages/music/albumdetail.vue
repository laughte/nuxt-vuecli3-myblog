<template>
  <v-card :loading="$store.state.musicAlbum.length<2">
    <v-card flat>
      <v-list-item three-line>
        <v-list-item-avatar size="155" tile>
          <v-img :src="$store.state.albumNowIs.picUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="align-self-start">
          <v-list-item-title class="headline mb-2" v-text="$store.state.albumNowIs.name"></v-list-item-title>
          <v-list-item-subtitle v-text="$store.state.albumNowIs.copywriter"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-simple-table fixed-header height="650px">
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
            :style="{background:index%2?'#fff':'#FAFAFA'}"
            v-for="(item,index) in $store.state.musicAlbum"
            :key="item.id"
          >
            <td>
              <v-icon
                color="red"
              >{{$store.state.musicUrl.id===item.id?($store.state.audio.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"):""}}</v-icon>
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
      this.$store.commit('playlistPlay', e)
    }
  }
}
</script>

<style>
</style>