<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    getDetail(id) {
      this.$axios
        .get('https//api.isoyu.com/api/Zhihu/news?id=' + id)
        .then(res => {
          console.log(res)
        })
    }
  },
  created() {
    this.getDetail(this.$route.params.id)
  }
}
</script>

<style>
</style>