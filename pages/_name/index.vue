<template>
  <div>

  <card class="mb-2" :key="index" :item="item" v-for="(item,index) in $store.state.content.userArticle.slice((page-1)*7,7*page)" />
    <div class="text-center" v-if="Math.ceil($store.state.content.userArticle.length/7)>1">
      <a href="#" style="text-decoration:none">
        <v-pagination
          circle
          :color="$vuetify.theme.dark?'listbgcolor':'textcolor'"
          v-model="page"
          :length="Math.ceil($store.state.content.userArticle.length/7)"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </a>
    </div>
  </div>
</template>

<script>
import card from '~/components/card.vue'
export default {
  components: { card },
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
          disabled: true,
          to: '/' + this.$route.params.name
        }
      ]
    }
  },
  methods: {
    readMore(e) {
      this.$router.push({ path: '/inspire', query: { content: e } })
    },
    showMsgBoard(e) {
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
    if (this.$route.params.name !== 'undefined') {
      this.selectArticle(this.$route.params.name)
    } else {
      this.$router.push('/signin')
    }

    // this.selectName(this.$route.params.name)
  }
}
</script>
