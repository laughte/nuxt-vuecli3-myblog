<template>
  <v-row justify="center">
    <v-col lg="8" md="10" sm="12">
      <v-timeline>
        <v-timeline-item
          v-for="(item,index) in $store.state.content.article"
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
          <card class="elevation-2" :item="item" />
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script>
  import card from '~/components/card.vue'
export default {
    components:{card},
  methods: {
    getColor(e) {
      switch (e) {
        case 'python':
          return 'red'

        case 'js':
          return 'pink accent-2'

        case 'PHP':
          return 'teal'

        case 'java':
          return 'purple'

        case '随笔':
          return 'amber darken-1'

        case '诗经':
          return 'brown lighten-3'

        case '散文':
          return 'cyan lighten-3'

        case '水彩':
          return 'light-blue'

        case '诗词':
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
          return 'teal darken-2'
      }
    }
  }
}
</script>

<style>
</style>
