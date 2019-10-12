<template>
  <v-card class="pa-4" flat>
    <v-img
      class="white--text"
      height="200px"
      src="https://i.loli.net/2019/09/21/lYfBxjFw1JucHvg.jpg"
    >
      <v-card-title class="align-end fill-height">自在飞花轻似梦</v-card-title>
    </v-img>
    <!-- <v-text-field
      @change="searkeywords"
      v-model="keywords"
      hide-details
      single-line
      placeholder="搜搜看"
    ></v-text-field>-->
    <div class="mt-10">
      <v-card-title class="pa-0 font-weight-black">近期文章</v-card-title>
      <v-divider></v-divider>
      <v-sheet
        tag="li"
        class="font-weight-light white--text ma-1 pa-1"
        @click="showarticlepage(e)"
        :color="getColor(e.articleType)"
        :key="i"
        v-for="(e, i) in $store.state.article.slice(0, 7)"
      >{{ e.blocks[0].data.text }}</v-sheet>
    </div>

    <!-- <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black">近期评论</v-card-title>
      <v-divider></v-divider>
    </div>-->

    <!-- <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black">文章归档</v-card-title>
      <v-divider></v-divider>
      <p>2019年9月</p>
    </div>-->

    <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black">活跃用户</v-card-title>
      <v-divider></v-divider>

      <v-chip
        :color="colors[Math.ceil(Math.random()*15)]"
        :to="'/'+e"
        class="ma-2"
        :key="i"
        v-for="(e, i) in $store.state.userList"
      >
        <!-- <v-icon color="white" left>mdi-account</v-icon> -->
        <v-icon left color="white">mdi-account-circle</v-icon>
        {{ e }}
      </v-chip>
    </div>

    <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black">文章标签</v-card-title>
      <v-divider></v-divider>

      <v-chip
        class="ma-2"
        dark
        :color="getColor(e)"
        :key="i"
        v-for="(e, i) in $store.state.artype"
        :to="'/'+e"
      >{{ e }}</v-chip>
    </div>
  </v-card>
</template>

<script>
export default {
  props: { isartpage: Boolean },
  data() {
    return {
      keywords: '',
      colors: [
        'red',
        'pink',
        'purple',
        'indigo',
        'blue',
        'deep-purple',
        'light-blue',
        'cyan',
        'teal',
        'lime',
        'amber',
        'orange',
        'yellow darken-1',
        'deep-orange',
        'brown',
        'blue-grey'
      ]
    }
  },
  methods: {
    showarticlepage(e) {
      this.$router.push({
        path: `/${e.userName}/${e._id}`
        // query: { id: e._id }
      })
    },

    async searkeywords(e) {
      // if (!e) {
      //   let Json = { delete: false }
      //   this.$axios
      //   .get('/api/myblog', Json)
      //   .then(res => {
      //     // console.log(res)
      //     this.$store.commit('readData', res.reverse())
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      // } else {
      //   let Json = {
      //     $or: [
      //       { articleTitle: { $regex: `${e}` } },
      //       { articleComment: { $regex: `${e}` } }
      //     ],
      //     delete: false
      //   }
      //   this.$axios
      //   .get('/api/myblog', Json)
      //   .then(res => {
      //     // console.log(res)
      //     this.$store.commit('readData', res.reverse())
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      // }
    },
    // selectName(e) {
    //   // this.$router.push(`/user/${e}`)
    //   let Json = {
    //     data: e,
    //     type: 'userName'
    //   }
    //   this.$store.commit('selectArticle', Json)
    // },
    // selectType(e) {
    //   // this.$router.push(`/article/${e}`)
    //   let Json = {
    //     data: e,
    //     type: 'articleType'
    //   }
    //   this.$store.commit('selectArticle', Json)
    // },

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
  },
  created() {
    this.$store.commit('filterUser')
  }
}
</script>

<style></style>
