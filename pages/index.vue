<template>
  <!-- column justify-center align-center -->
  <v-layout>
    <v-flex>
      <v-row justify="center">
        <v-col xl="5" lg="7" md="8" sm="8" xs="12">
          <template
            v-for="(item,index) in [ 
            ...this.$store.state.dailyNews,
            
        ...this.$store.state.article,
        ...this.$store.state.jokes].slice((page-1)*7,7*page)"
          >
            <!-- **********用户文章卡片*********** -->
            <v-card v-if="item.blocks" hover flat class="mb-2" :key="index">
              <v-card-actions class="pt-0 pa-0 d-flex d-none d-sm-flex d-md-none">
                <v-btn
                  :color="getColor(item.articleType)"
                  text
                  class="pa-0"
                  :to="'/'+item.userName"
                >
                  <v-icon small>mdi-account-edit</v-icon>
                  {{ item.userName ? item.userName : "未知用户" }}
                </v-btn>
                <v-btn
                  :color="getColor(item.articletype)"
                  class="pa-0"
                  text
                  :to="'/'+item.articleType"
                >
                  <v-icon small>mdi-file</v-icon>
                  {{ item.articleType ? item.articleType : "未分类" }}
                </v-btn>
                <v-btn :color="getColor(item.articleType)" class="pa-0" text to="/timeline">
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
                  <v-card-actions
                    :color="getColor(item.articleType)"
                    class="pt-0 pa-0 d-none d-sm-none d-md-flex"
                  >
                    <v-btn
                      :color="getColor(item.articleType)"
                      text
                      class="pa-0"
                      :to="'/'+item.userName"
                    >
                      <v-icon small>mdi-account-edit</v-icon>
                      {{ item.userName ? item.userName : "未知用户" }}
                    </v-btn>
                    <v-btn
                      :color="getColor(item.articleType)"
                      class="pa-0"
                      text
                      :to="'/'+item.articleType"
                    >
                      <v-icon small>mdi-file</v-icon>
                      {{ item.articleType ? item.articleType : "未分类" }}
                    </v-btn>
                    <v-btn :color="getColor(item.articleType)" class="pa-0" text to="/timeline">
                      <v-icon small>mdi-calendar-range</v-icon>
                      {{ new Date(item.time).toLocaleString()}}
                    </v-btn>
                  </v-card-actions>
                  <v-list-item-title
                    class="mb-2 font-weight-black subtitle"
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
                <v-btn color="error" text @click="$store.commit('addArticleLike',item)">
                  <v-icon small>mdi-heart</v-icon>
                  <p>{{ item.like }}</p>
                  {{'喜欢'}}
                </v-btn>
                <!-- </v-badge> -->
                <!-- 
          <v-badge overlap class="mx-5">
                <template v-slot:badge>{{contentdata.articleCollect}}</template>-->
                <v-btn color="error" text @click="$store.commit('addArticleCollect',item)">
                  <v-icon small>mdi-star</v-icon>
                  <p v-text="item.collect.length"></p>
                  {{'收藏'}}
                </v-btn>
                <!-- </v-badge> -->

                <!-- <v-badge overlap class="mx-5">
                <template v-slot:badge>{{contentdata.articleReply}}</template>-->
                <v-btn color="error" text @click="showMsgBoard(item)">
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
                <!-- :to="'/'+item.userName+'/'+item._id"    {name:item.userName+'-id',params:{id:item._id}}-->
                <div class="flex-grow-1"></div>
                <v-btn
                  class="white--text"
                  :color="getColor(item.articleType)"
                  :to="'/'+item.userName+'/'+item._id"
                >阅读更多</v-btn>
              </v-card-actions>

              <msg-board :msgContents="item" v-show="item.msgFlag" />
            </v-card>

            <!--********知乎内容卡片******** -->
            <v-card hover flat class="mb-2" :key="index" v-else-if="item.hint">
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-avatar class="ma-3" width="220px" height="110px" tile>
                  <v-img v-if="item.images" :src="item.images[0]?item.images[0]:item.images[1]"></v-img>
                </v-avatar>
                <div>
                  <v-card-title v-text="item.hint"></v-card-title>
                  <v-card-text v-text="item.title"></v-card-text>
                </div>
              </div>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  class="white--text"
                  :color="getColor(item.articleType)"
                  :to="{name:'zhihuDetail',params:{id:item.id}}"
                >阅读更多</v-btn>
              </v-card-actions>
            </v-card>
            <!-- ***********新闻内容卡片************ -->
            <v-card hover flat class="mb-2" :key="item.newsId" v-else-if="item.newsId">
              <v-card-actions>
                <v-btn text class="pa-0">
                  <v-icon small>mdi-account-edit</v-icon>
                  {{ item.source ? item.source : "未知来源" }}
                </v-btn>
                <v-btn class="pa-0" text>
                  <v-icon small>mdi-file</v-icon>
                  {{ item.articleType ? item.articleType : "未分类" }}
                </v-btn>
                <v-btn class="pa-0" text>
                  <v-icon small>mdi-calendar-range</v-icon>
                  {{ item.postTime}}
                </v-btn>
              </v-card-actions>
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-avatar class="ma-3" width="220px" height="100px" size="125" tile>
                  <v-img v-if="item.imgList" :src="item.imgList[0]?item.imgList[0]:item.imgList[1]"></v-img>
                </v-avatar>
                <div>
                  <v-card-title class="font-weight-black subtitle-1" v-text="item.title"></v-card-title>
                  <v-card-text class="font-weight-regular" v-text="item.digest"></v-card-text>
                </div>
              </div>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  class="white--text"
                  :color="getColor(item.articleType)"
                  :to="{name:'newsDetail',params:{id:item.newsId}}"
                >阅读更多</v-btn>
              </v-card-actions>
            </v-card>

            <!-- ************笑话内容卡片********** -->
            <v-card
              dark
              :color="$store.state.colors[Math.ceil(Math.random()*15)]"
              flat
              class="mb-2"
              :key="index"
              v-else-if="item.content"
            >
              <v-card-text class="headline font-weight-bold" v-text="item.content"></v-card-text>
            </v-card>
          </template>

          <div
            class="text-center"
            v-if="Math.ceil([ ...this.$store.state.dailyNews, 
        ...this.$store.state.article,
        ...this.$store.state.jokes].length/7)>1"
          >
            <a href="#" style="text-decoration:none">
              <v-pagination
                circle
                v-model="page"
                :length="Math.ceil([  ...this.$store.state.dailyNews,
        ...this.$store.state.article,
        ...this.$store.state.jokes].length/7)"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
              ></v-pagination>
            </a>
          </div>
        </v-col>
        <v-col v-if="this.$store.state.article.length>0" xl="3" lg="4" md="4" sm="4">
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
      nowDate: new Date(),
      page: 1,
      length: 0,
      alldata: []

      // datas: [{ title: 'nimabi', article: 'woyaorinimabi' }]
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
    getColor(e) {
      switch (e) {
        case 'python':
          return 'red'

        case 'js':
          return 'pink accent-2'

        case 'PHP':
          return 'teal'

        case 'java':
          return 'purple'

        case '随笔':
          return 'amber darken-1'

        case '诗经':
          return 'brown lighten-3'

        case '散文':
          return 'cyan lighten-3'

        case '水彩':
          return 'light-blue'

        case '诗词':
          return 'orange'

        case '小说':
          return 'lime'
        case '素描':
          return 'light-green'
        case '油画':
          return 'amber'

        case '插画':
          return 'blue-grey'

        case 'photoshop':
          return 'cyan accent-2'

        case 'painter':
          return 'pink accent-1'

        default:
          return 'teal darken-2'
      }
    }
  },

  watch: {},
  mounted() {
    // ...this.$store.state.article,   this.$store.state.article.slice(0,i)
    //       ...this.$store.state.jokes
    // for(let i =0; i<this.$store.state.article.length;i++){
    //    for(let j =0; j<this.$store.state.jokes.length;j++){
    //      [...this.$store.state.article.slice(i*4,(i+1)*4),...this.$store.state.jokes.slice(i,(i+1))]
    //    }
    // }
  }
}
</script>
<style scoped>
.sidecard {
  position: sticky;
  top: 45px;
}
</style>