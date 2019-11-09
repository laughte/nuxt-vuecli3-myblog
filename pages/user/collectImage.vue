<template>
<v-row justify="center">
  <v-col  lg="3"
          md="4"
          sm="6"
          xs="12"
          :key="index" v-for="(item,index) in $store.state.content.collectPic">
    <picturecard :item="item"  />
  </v-col>

</v-row>
</template>

<script>
  import picturecard from '~/components/pictureCard.vue'
  export default {
    name: 'collectImage',
    components:{picturecard},

  }
</script>

<style scoped>

</style>
