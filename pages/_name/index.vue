<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-row justify="center">
        <v-col xl="5" lg="7" md="8" sm="8" xs="12">
          <v-breadcrumbs :items="links"></v-breadcrumbs>
          <v-card
            flat
            class="mb-2"
            v-for="(item,index) in $store.state.userArticle.slice((page-1)*7,7*page)"
            :key="index"
          >
            <v-card-actions class="pt-0 pa-0 d-flex d-none d-sm-flex d-md-none">
              <v-btn text class="pa-0" :to="'/'+item.userName">
                <v-icon small>mdi-account-edit</v-icon>
                {{ item.userName ? item.userName : "未知用户" }}
              </v-btn>
              <v-btn class="pa-0" text :to="'/'+item.articleType">
                <v-icon small>mdi-file</v-icon>
                {{ item.articleType ? item.articleType : "未分类" }}
              </v-btn>
              <v-btn class="pa-0" text to="/timeline">
                <v-icon small>mdi-calendar-range</v-icon>
                {{ new Date(item.time).toLocaleDateString() }}
              </v-btn>
            </v-card-actions>
            <v-list-item three-line>
              <!-- <v-list-item-avatar height="140px" width="220px" size="125" tile>
                <v-img v-if="item.src" :src="item.src"></v-img>
                <v-img v-else src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
              </v-list-item-avatar>-->
              <v-list-item-content class="align-self-start">
                <v-card-actions class="pt-0 pa-0 d-none d-sm-none d-md-flex">
                  <v-btn text class="pa-0" :to="'/'+item.userName">
                    <v-icon small>mdi-account-edit</v-icon>
                    {{ item.userName ? item.userName : "未知用户" }}
                  </v-btn>
                  <v-btn class="pa-0" text :to="'/'+item.articleType">
                    <v-icon small>mdi-file</v-icon>
                    {{ item.articleType ? item.articleType : "未分类" }}
                  </v-btn>
                  <v-btn class="pa-0" text to="/timeline">
                    <v-icon small>mdi-calendar-range</v-icon>
                    {{ new Date(item.time).toLocaleString() }}
                  </v-btn>
                </v-card-actions>
                <v-list-item-title
                  class="headline mb-2"
                  v-if="item.blocks[0]"
                >{{item.blocks[0].data.text}}</v-list-item-title>
                <v-list-item-subtitle v-if="item.blocks[1]" v-text="item.blocks[1].data.text"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.blocks[2]" v-text="item.blocks[2].data.text"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.blocks[3]" v-text="item.blocks[3].data.text"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.blocks[4]" v-text="item.blocks[4].data.text"></v-list-item-subtitle>
                <v-spacer />
                <div class="flex-grow-1"></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions class="pt-0">
              <v-btn text @click="$store.commit('addArticleLike',item)">
                <v-icon small>mdi-heart</v-icon>
                <p>{{ item.like }}</p>
                {{'喜欢'}}
              </v-btn>
              <!-- </v-badge> -->
              <!-- 
          <v-badge overlap class="mx-5">
              <template v-slot:badge>{{contentdata.articleCollect}}</template>-->
              <v-btn text @click="$store.commit('addArticleCollect',item)">
                <v-icon small>mdi-star</v-icon>
                <p v-text="item.collect.length"></p>
                {{'收藏'}}
              </v-btn>
              <!-- </v-badge> -->

              <!-- <v-badge overlap class="mx-5">
              <template v-slot:badge>{{contentdata.articleReply}}</template>-->
              <v-btn text @click="showMsgBoard(item)">
                <v-icon small>mdi-chat-processing</v-icon>
                <p v-text="item.reply"></p>
                {{'评论'}}
              </v-btn>
              <!-- </v-badge> -->

              <!-- <v-btn
                class="d-none d-sm-none d-md-flex"
                icon
                @click="$store.commit('deleteArticle',item)"
              >
                <v-icon small>mdi-delete</v-icon>
                {{'删除'}}
              </v-btn>-->
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" :to="'/'+$route.params.name+'/'+item._id">阅读更多</v-btn>
            </v-card-actions>

            <msg-board :msgContents="item" v-show="item.msgFlag" />
          </v-card>
          <div class="text-center" v-if="Math.ceil($store.state.userArticle.length/7)>1">
            <a href="#" style="text-decoration:none">
              <v-pagination
                circle
                v-model="page"
                :length="Math.ceil($store.state.userArticle.length/7)"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
              ></v-pagination>
            </a>
          </div>
        </v-col>
        <v-col xl="3" lg="4" md="4" sm="4">
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
import axios from 'axios'
import side from '~/components/side.vue'
import msgBoard from '~/components/msgBoard.vue'
export default {
  components: { side, msgBoard },
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
      // datas: [{ title: 'nimabi', article: 'woyaorinimabi' }]
    }
  },
  methods: {
    readMore(e) {
      this.$router.push({ path: '/inspire', query: { content: e } })
    },
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
      if (this.$store.state.artype.indexOf(e) > -1) {
        Json = {
          data: e,
          type: 'articleType'
        }
      } else {
        Json = {
          data: e,
          type: 'userName'
        }
      }
      this.$store.commit('selectArticle', Json)
    }
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
  created() {
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