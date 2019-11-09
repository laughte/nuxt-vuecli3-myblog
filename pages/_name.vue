<template>
  <v-layout column>
    <v-flex>
      <v-row justify="center">
        <v-col class="pa-0"  xl="6" lg="7" md="12" sm="12" xs="12">
          <!-- <v-breadcrumbs :items="links"></v-breadcrumbs> -->
          <nuxt-child keep-alive />
        </v-col>
        <v-col  xl="3" lg="4">
          <v-row class="sidecard" justify="center">
            <v-col xl="10" lg="10" md="12" sm="12">
              <side />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>

import side from '~/components/side.vue'
export default {
  components: { side },
  async asyncData() {},
  data() {
    return {
      page: 1,
      length: 0,
      links: [
        {
          text: 'home',
          disabled: false,
          to: '/'
        },
        {
          text: this.$route.params.name,
          disabled: false,
          to: '/' + this.$route.params.name
        },
        {
          text: this.$route.params.id,
          disabled: true,
          to: '/' + this.$route.params.name + '/' + this.$route.params.id
        }
      ]
    }
  },
  methods: {
    showMsgBoard(e) {
      if (!e.msgFlag) {
        if (!e.msgData) {
          this.$axios
            .post('/api/msgSearch', {
              articleId: e._id
            })
            .then(res => {
              this.$store.commit('showArticleMsg', {
                id: e._id,
                res: res
              })
            })
        } else {
          this.$store.commit('showArticleMsg', { id: e._id })
        }
      } else {
        this.$store.commit('showArticleMsg', { id: e._id })
      }
    },
    selectArticle(e) {
      let Json = {}
      if (this.$store.state.content.types.indexOf(e) > -1) {
        Json = {
          data: e,
          type: 'type'
        }
      } else {
        Json = {
          data: e,
          type: 'userName'
        }
      }
      this.$store.commit('selectArticle', Json)
    },

  },
  watch: {
    routerData: function(n) {
      this.selectArticle(n)
    }
  },
  computed: {
    routerData: function() {
      return this.$route.params.name
    }
  },
  activated() {
    // console.log(this.$route.params.name)
    this.selectArticle(this.$route.params.name)
    // this.selectName(this.$route.params.name)
  }
}
</script>
<style scoped>
.sidecard {
  position: sticky;
  top: 45px;
}
</style>
