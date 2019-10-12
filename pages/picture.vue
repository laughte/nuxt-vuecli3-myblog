<template>
  <v-card flat :loading="loadingFlag">
    <v-container class="pa-2" fluid>
      <v-row justify="start">
        <v-col
          lg="2"
          md="3"
          sm="4"
          xs="6"
          :key="src._id"
          v-for="src in $store.state.urls.slice((page-1)*24,page*24)"
        >
          <v-card flat hover width="100%">
            <v-img
              @click="switchshow(src)"
              class="white--text"
              height="auto"
              :src="src.srclist[0]"
              :lazy-src="src.srclist[0]"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
              <v-list-item-subtitle class="align-end">
                {{
                src.title
                }}
              </v-list-item-subtitle>
            </v-img>
            <v-card-actions>
              <cardaction :src="src" />
            </v-card-actions>
          </v-card>
        </v-col>

        <div v-if="Math.ceil($store.state.urls.length/24)>1" class="text-center">
          <v-pagination v-model="page" :length="Math.ceil($store.state.urls.length/24)"></v-pagination>
        </div>

        <v-overlay v-show="overlayflag" z-index="3">
          <v-btn icon color="red" @click="overlayflag = false" right>
            <v-icon large>mdi-close</v-icon>
          </v-btn>
          <v-sheet light class="mx-auto" elevation="8" max-width="1920">
            <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
              <v-slide-item v-for="(e, i) in srclists" :key="i" v-slot:default="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : 'grey lighten-1'"
                  class="ma-2"
                  height="100%"
                  width="600"
                  @click="toggle"
                >
                  <v-img width="auto" height="100%" :src="e">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-overlay>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import cardaction from '../components/cardaction.vue'
export default {
  components: { cardaction },
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
        this.$store.commit('imgData', res)
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
