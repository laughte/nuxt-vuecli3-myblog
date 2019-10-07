<template>
  <v-card :loading="loadingFlag">
    <v-container class="pa-2" fluid>
      <v-row>
        <v-col lg="2" md="3" sm="4" xs="12" :key="src._id" v-for="src in $store.state.urls">
          <v-card flat hover width="100%" justify="start">
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
