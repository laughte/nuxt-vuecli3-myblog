<template>
  <div>
  <card :key="index" :item="item" v-for="(item,index)  in $store.state.content.collect.slice((page-1)*7,7*page)"/>
  <div class="text-center" v-if="Math.ceil($store.state.content.collect.length/7)>1">

    <v-pagination
      color="textcolor"
      circle
      v-model="page"
      :length="Math.ceil($store.state.content.collect.length/7)"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
  </div>
</template>

<script>
  import card from '~/components/card.vue'
  export default {
    name: 'index',
    components:{card},
    data(){
      return{
        page:1,
      }
    }
  }
</script>

<style scoped>

</style>
