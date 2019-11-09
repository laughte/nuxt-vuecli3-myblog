<template>

    <v-card  color="transparent" flat hover width="100%">
      <v-img
        class="white--text"
        height="auto"
        min-height="220px"
        :src="item.srclist[0]"
        :lazy-src="item.srclist[0]"
        @click="$emit('showlist',item)"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
        <v-list-item-subtitle class="align-end">
          {{
          item.title
          }}
        </v-list-item-subtitle>
      </v-img>
      <v-card-actions>
        <cardaction :src="item" />
      </v-card-actions>



    </v-card>
</template>

<script>
  import cardaction from '../components/cardaction.vue'
  export default {
    name: 'pictureCard',
    components:{cardaction},
    props:{item:Object},
    data(){
      return  {
        loading:true
      }
    },
    methods:{
      loaded(){
        this.loading = false
      },


    },

  }
</script>

<style scoped>

</style>
