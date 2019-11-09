<template>
  <v-card  color="rgba(0,0,0,0)"  flat>
    <v-img
      class="white--text"
      height="200px"
      src="https://i.loli.net/2019/09/21/lYfBxjFw1JucHvg.jpg"
    >
      <v-card-title class="align-end fill-height pa-0">自在飞花轻似梦</v-card-title>
    </v-img>

    <div class="mt-10">
      <v-card-title class="pa-0 font-weight-black cyan--text">近期文章</v-card-title>
      <v-divider ></v-divider>
      <v-chip
        class="pa-2 font-weight-light textcolor--text ma-1 pa-1"
        @click="showarticlepage(e)"
        color="listbgcolor"
        :key="i"
        v-for="(e, i) in $store.state.content.article.slice(0, 7)"
      >{{ e.title }}</v-chip>
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
      <v-card-title class="pa-0 font-weight-black cyan--text">活跃用户</v-card-title>
      <v-divider></v-divider>

      <v-chip
        :to="'/'+e"
        color="listbgcolor"
        style="font-family: Lucida Calligraphy"
        class="ma-2 textcolor--text"
        :key="i"
        v-for="(e, i) in $store.state.content.userList"
      >
        <!-- <v-icon color="white" left>mdi-account</v-icon> -->
        <v-icon left color="textcolor" >mdi-account-circle</v-icon>
        {{ e }}
      </v-chip>
    </div>

    <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black cyan--text">文章标签</v-card-title>
      <v-divider></v-divider>

      <v-chip
        class="ma-2 textcolor--text"
        style="font-family: Lucida Calligraphy"
        dark
        color="listbgcolor"
        :key="i"
        v-for="(e, i) in $store.state.content.types"
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
      keywords: ''
    }
  },
  methods: {
    showarticlepage(e) {
      this.$router.push({
        path: `/${e.userName}/${e._id}`
        // query: { id: e._id }
      })
    }

  },
  created() {
    this.$store.commit('filterUser')
  }
}
</script>

<style></style>
