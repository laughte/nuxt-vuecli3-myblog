<template>
    <v-row justify="center" >
      <v-col  lg="2"
              md="3"
              sm="4"
              xs="6" :key="i" v-for="i in 23">
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="card"
      ></v-skeleton-loader>
      </v-col>
    </v-row>
</template>

<script>
  export default {
    name: 'video'
  }
</script>

<style scoped>

</style>
