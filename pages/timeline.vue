<template>
  <v-row justify="center">
    <v-col lg="8" md="10" sm="12">
      <v-timeline>
        <v-timeline-item
          v-for="(item,index) in $store.state.article"
          :key="index"
          :color="getColor(item.articleType)"
          small
        >
          <template v-slot:opposite>
            <span
              :class="`headline font-weight-bold ${getColor(item.articleType)}--text`"
              v-text="new Date(item.time).toLocaleString()"
            ></span>
          </template>
          <v-card class="elevation-2">
            <v-card-title
              :class="`headline font-weight-light mb-4 ${getColor(item.articleType)}--text`"
              v-if="item.blocks[0]"
            >{{item.blocks[0].data.text}}</v-card-title>
            <v-card-text>
              <v-list-item-subtitle v-if="item.blocks[1]" v-text="item.blocks[1].data.text"></v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.blocks[2]" v-text="item.blocks[2].data.text"></v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.blocks[3]" v-text="item.blocks[3].data.text"></v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.blocks[4]" v-text="item.blocks[4].data.text"></v-list-item-subtitle>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    getColor(e) {
      switch (e) {
        case 'python':
          return 'red'

        case 'JavaScript':
          return 'pink accent-2'

        case 'PHP':
          return 'teal'

        case 'java':
          return 'purple'

        case '诗经':
          return 'brown lighten-3'

        case '散文':
          return 'cyan lighten-3'

        case '水彩':
          return 'light-blue'

        case '古诗词':
          return 'orange'

        case '小说':
          return 'lime'
        case '素描':
          return 'light-green'
        case '油画':
          return 'amber'

        case '插画':
          return 'blue-grey'

        case 'photoshop':
          return 'cyan accent-2'

        case 'painter':
          return 'pink accent-1'

        default:
          return 'yellow'
      }
    }
  }
}
</script>

<style>
</style>