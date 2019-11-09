<template>
  <v-card flat color="transparent">
    <!-- <v-img
          v-if="musicData."
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title class="align-end fill-height">I'm a title</v-card-title>
    </v-img>-->

    <v-simple-table fixed-header v-if="$store.state.music.searchSong.songs" >
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
            @dblclick="getPlay(item)"

            v-for="(item,index) in $store.state.music.searchSong.songs"
            :key="item.id"
          >
            <td>
              <v-icon
                color="red"
              >{{$store.state.music.song.id===item.id?($store.state.music.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"):""}}</v-icon>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.artists[0].name }}</td>
            <td>{{ item.album.name }}</td>
            <td>{{ item.duration }}</td>
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
    getPlay(e) {
      this.$store.dispatch('playlist',e)
    }
  }
}
</script>

<style>
  tbody.tr:hover {
    background: #fff;
  }
</style>
