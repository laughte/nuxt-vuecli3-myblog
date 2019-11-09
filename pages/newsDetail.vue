<template>
  <v-row justify="center">
    <v-col xl="8" lg="10">

    <v-card flat color="transparent" :loading="loading" class="mx-auto my-12">
      <v-img :src="newsdata.cover"></v-img>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{newsdata.title}}</v-list-item-title>
          <v-list-item-subtitle>{{newsdata.source}} {{newsdata.ptime}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text v-html="newsdata.content"></v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title v-if="newsdata.images">相关图片</v-card-title>
      <v-card-text>
        <v-img :key="i" :src="e.imgSrc" v-for="(e,i) in newsdata.images"></v-img>
      </v-card-text>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      newsdata: {},
      loading: true
    }
  },
  methods: {
    getDetail(id) {
      this.$axios ///news/details?newsId=
        .get('https://www.mxnzp.com/api/news/details?newsId=' + id)
        .then(res => {
          // console.log(res)
          this.newsdata = res.data
          this.loading = false
        })
    }
  },
  activated() {
    this.getDetail(this.$route.params.id)
  }
}
</script>

<style>
</style>
