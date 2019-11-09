<template>
  <v-carousel height="500px" hide-delimiters show-arrows-on-hover cycle>
    <v-carousel-item

      v-for="(item,i) in items"
      :key="i"
      :src="item.src"

    ></v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    props:{
      items:Array,
    },
  }
</script>
