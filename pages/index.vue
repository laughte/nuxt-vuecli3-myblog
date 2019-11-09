
<template>

    <v-row class="d-flex flex-row" justify="center">
      <v-col class="pa-0" xl="9" lg="11" >
        <carousel :items="pictures"/>
      </v-col>
      <v-col class="pa-0 pt-3" xl="6" lg="7" md="12" sm="12" xs="12">


        <h2 class="cyan--text">国内新闻</h2>
        <transition-group appear>
        <news :key="index" :item="item" v-for="(item,index)  in $store.state.content.news.slice((page-1)*4,4*page)"/>
        </transition-group>
        <div class="text-center" v-if="Math.ceil($store.state.content.news.length/4)>1">

            <v-pagination
              circle
              :color="$vuetify.theme.dark?'listbgcolor':'textcolor'"
              v-model="page"
              :length="Math.ceil($store.state.content.news.length/4)"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            ></v-pagination>

        </div>
        <h2 class="cyan--text">全部文章</h2>
        <transition-group appear>
        <card :key="item._id" :item="item" v-for="item  in $store.state.content.article.slice((page1-1)*7,7*page1)"/>
        </transition-group>
        <div class="text-center" v-if="Math.ceil($store.state.content.article.length/7)>1">

            <v-pagination
              :color="$vuetify.theme.dark?'listbgcolor':'textcolor'"
              circle
              v-model="page1"
              :length="Math.ceil($store.state.content.article.length/7)"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            ></v-pagination>

        </div>

        <h2 class="cyan--text">推荐歌单</h2>
        <transition-group appear>
          <music-card :item="item"
                      v-for="(item,index) in $store.state.music.albums.slice((page2-1)*6,6*page2)"
                      :key="index" />
        </transition-group>
        <div class="text-center" v-if="Math.ceil($store.state.music.albums.length/6)>1">

          <v-pagination
            :color="$vuetify.theme.dark?'listbgcolor':'textcolor'"
            circle
            v-model="page2"
            :length="Math.ceil($store.state.music.albums.length/6)"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>

        </div>

      </v-col>
      <v-col xl="3" lg="4">
        <v-row class="sideCard pa-0" justify="end" >
          <v-col class="pa-0" lg="11" xl="10" md="12" >
           <h2 class="cyan--text">开心笑话</h2>
            <v-card
              :dark="$vuetify.theme.dark"
              :color="$vuetify.theme.dark?$store.state.colors[Math.ceil(Math.random()*15)] :'white'"
              flat
              class="mb-2"
              :key="item.id"
              v-for="item in $store.state.content.jokes.slice(0,3)"
            >
              <v-card-text   class="font-weight-bold textcolor--text" v-text="item.content"></v-card-text>
            </v-card>

            <side v-if="$store.state.content.article.length>0" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
  import musicCard from '~/components/musicCard'
  import card from '~/components/card.vue'
  import news from '~/components/news.vue'
import side from '~/components/side.vue'
import msgBoard from '~/components/msgBoard.vue'
import carousel from '~/components/carousel.vue'
export default {
  components: { side, msgBoard,carousel,card,news,musicCard },
  async asyncData() {},
  data() {
    return {
      nowDate: new Date(),
      page: 2,
      page1: 1,
      page2:1,
      length: 0,
      alldata: [],
      pictures: [
      {
        src: 'https://i.loli.net/2019/11/03/FILK8AOZsd3ykQo.jpg',
      },
      {
        src: 'https://i.loli.net/2019/11/03/ShRIkmuvKeCBLgE.jpg',
      },
      {
        src: 'https://i.loli.net/2019/11/03/Ga6gdADXFjo7iL1.jpg',
      },
      {
        src: 'https://i.loli.net/2019/11/03/Zw3kGHJiObqfa4z.jpg',
      },
        {
          src: 'https://i.loli.net/2019/11/03/3etF5A7m9ZkEI1o.jpg',
        },
        {
          src: 'https://i.loli.net/2019/11/03/V9ugmoQ2yEaxfpr.jpg',
        },
        {
          src: 'https://i.loli.net/2019/11/03/P9p8uaw2eD4GA1C.jpg',
        },
        {
          src: 'https://i.loli.net/2019/11/03/u3JgRqLN75Cy2rl.jpg',
        },
        {
          src: 'https://i.loli.net/2019/11/03/JMwCOpkG8e6IPRU.jpg',
        },
        {
          src: 'https://i.loli.net/2019/11/03/LEChzx6vUX9qotf.jpg',
        },
    ],
    }
  },
  methods: {

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
    }
  },
  watch: {},
  mounted() {}
}
</script>

<style scoped>
  .sideCard {
    position: sticky;
    top: 45px;
  }
  .v-pagination__item--active {
    box-shadow: none !important;
  }
  .v-pagination__navigation {
    box-shadow: none !important;
  }
  .v-pagination__item--active {
    box-shadow: none !important;
  }
</style>
