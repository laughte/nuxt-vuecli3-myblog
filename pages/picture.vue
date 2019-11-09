<template>
  <v-card flat>
    <v-container class="pa-2" fluid>
      <v-row justify="start">

        <v-col
          lg="2"
          md="3"
          sm="4"
          xs="6"
          :key="item._id"
          v-for="item in $store.state.content.pictures.slice((page-1)*24,page*24)"
        >
          <transition appear>
          <picture-card :item="item" @showlist="switchshow" />
          </transition>
        </v-col>

        <div v-if="Math.ceil($store.state.content.pictures.length/24)>1" class="text-center">
          <v-pagination :color="$vuetify.theme.dark?'listbgcolor':'textcolor'" v-model="page" :length="Math.ceil($store.state.content.pictures.length/24)"></v-pagination>
        </div>

        <v-overlay v-show="overlayflag" z-index="999" opacity="0.8">
          <v-btn icon style="z-index: 10000;position: fixed;right: 15px;top: 15px;" color="red" @click="overlayflag = false">
            <v-icon large>mdi-close</v-icon>
          </v-btn>

          <picture-list :items="srclists" />
        </v-overlay>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import pictureList from '../components/pictureList'
  import pictureCard from '../components/pictureCard'
import cardaction from '../components/cardaction.vue'
export default {
  components: { cardaction,pictureCard,pictureList },
  data() {
    return {
      page: 1,
      srclists: [],
      overlayflag: false,
      model: null,
      picturename: '',
      loadingFlag: true
    }
  },
  methods: {
    requestImg() {
      this.$axios.get(`/api/picture`, {}).then(res => {
        this.$store.commit('getdata', { type: 'pictures', data: res })
        this.loadingFlag = false
        // console.log(res)
      })
    },
    switchshow(src) {
      this.srclists = src.srclist
      this.overlayflag = true
    }
  },
  created() {
    this.requestImg()
  }
}
</script>
