<template>
  <v-app >

<!--      -->
    <music @musiclistf="rightDraFunc" draggable="true" />



    <v-navigation-drawer floating  color="transparent" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped"  fixed app>
      <v-list light class="pa-0">
        <v-list-item class="listbgcolor mb-2 pa-4 pt-6" >
          <v-list-item-title class="textcolor--text" style="font-family: Lucida Calligraphy;font-size:30px;text-align: center">LAUGHTER</v-list-item-title>
        </v-list-item>
        <v-list-item  class="listbgcolor textcolor--text mb-2" v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action >
            <v-icon class="textcolor--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="textcolor--text" style="font-family: Lucida Calligraphy">
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>


        <v-list-item class="listbgcolor textcolor--text mb-2">
          <v-list-item-action  @click.stop="$vuetify.theme.dark=!$vuetify.theme.dark" >
            <v-icon class="textcolor--text">mdi-moon-waxing-crescent</v-icon>
          </v-list-item-action>
          <v-list-item-content class="textcolor--text" style="font-family: Lucida Calligraphy">
            <v-list-item-title v-text="'night model'" />
          </v-list-item-content>
          <v-switch
            color="textcolor"
            v-model="$vuetify.theme.dark"
            primary
          ></v-switch>
        </v-list-item>

        <v-list-item class="listbgcolor textcolor--text mb-2">
          <v-list-item-action icon @click.stop="miniVariant = !miniVariant" >
            <v-icon class="textcolor--text">mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-list-item-action>
        <v-list-item-content class="textcolor--text" style="font-family: Lucida Calligraphy">
          <v-list-item-title v-text="'miniVariant'" />
        </v-list-item-content>
        <v-switch
          color="textcolor"
          v-model="miniVariant"
          primary
        ></v-switch>
        </v-list-item>

        <v-list-item class="listbgcolor textcolor--text mb-2">
          <v-list-item-action icon @click.stop="rightDraFunc" >
            <v-icon class="textcolor--text">mdi-menu</v-icon>
          </v-list-item-action>
          <v-list-item-content class="textcolor--text" style="font-family: Lucida Calligraphy">
            <v-list-item-title v-text="'musiclist'" />
          </v-list-item-content>
          <v-switch
            color="textcolor"
            v-model="rightDrawer"
            primary
          ></v-switch>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar  hide-on-scroll  flat color="transparent" app>
      <v-app-bar-nav-icon class="textcolor--text" @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <v-btn rounded depressed class="mr-4 textcolor--text" color="listbgcolor" v-if="$store.state.user.userName" v-text="$store.state.user.userName"></v-btn>
      <div v-else>
        <v-btn  rounded depressed class="mr-4 textcolor--text" color="listbgcolor" to="/signin">signin</v-btn>
        <v-btn rounded depressed class="mr-4 textcolor--text" color="listbgcolor" to="/signup">login</v-btn>
      </div>
      <v-avatar size="50px">
        <img v-if="$store.state.user.imgsrc" :src=" $store.state.user.imgsrc" alt="avatar" />
        <img v-else src="https://i.loli.net/2019/08/31/QKl2uXoJa653HhC.jpg" alt="avatar" />
      </v-avatar>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon class="textcolor--text">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item,index) in userItems"
            :key="index"
            @click="item.action"
          >
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>


    <v-content>

      <v-btn
        :class="arrowUp[arrowflag]"
        icon
        fixed
        fab
        bottom
        right
        color="textcolor"
        href="#"
        large
      >
      <v-icon large>mdi-chevron-up-circle </v-icon>
      </v-btn>
      <v-container>
        <transition>
        <nuxt keep-alive/>
        </transition>
      </v-container>
    </v-content>

    <v-navigation-drawer hide-overlay disable-route-watcher disable-resize-watcher v-model="rightDrawer" :right="right"    fixed>

          <!-- 音乐播放列表 -->
            <v-simple-table fixed-header>
              <template v-slot:default class="musiclist">
                <thead>
                <tr>
                  <th class="text-left" style="width:20px"></th>
                  <th class="text-left" style="width:180px">歌曲</th>
                  <th class="text-left" style="width:150px">歌手</th>
                </tr>
                </thead>
                <tbody>
                <tr
                  @dblclick="playlist(item)"
                  v-for="(item,index) in $store.state.music.playlist"
                  :key="item.id"
                >
                  <td>
                    <v-icon color="red">
                      {{
                      $store.state.music.song.id===item.id?($store.state.music.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"):""
                      }}
                    </v-icon>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.artists?item.artists[0].name:item.ar[0].name }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
    </v-navigation-drawer>

    <v-footer absolute app color="transparent" class="textcolor--text">
      <span class="ml-4" style="opacity: 0.3">&copy; 2019 <b style="font-family: Lucida Calligraphy"> laughter </b>  Design by : laughter <b> version: </b> 3.0.1</span>
    </v-footer>
  </v-app>
</template>

<script>
import music from '~/components/music.vue'
  import { mapActions } from 'vuex'
export default {
components:{music},

  data() {
    return {

      dialog:false,
      timeout:Function,
      arrowflag:false,
      arrowUp:{true:'arrowUpTrue',false:'arrowUpFalse'},
      clipped: false,
      drawer: true,
      fixed: false,
      playListFlag: false,
      userItems:[{title:'注销',action:this.registUer}],
      items: [
        {
          icon: 'mdi-apps',
          title: 'home',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'user',
          to: '/user'
        },
        {
          icon: 'mdi-border-color',
          title: 'write',
          to: '/writeboard'
        },
        {
          icon: 'mdi-star',
          title: 'star',
          to: '/starSky'
        },
        {
          icon: 'mdi-image',
          title: 'image',
          to: '/picture'
        },
        {
          icon: 'mdi-music',
          title: 'music',
          to: '/music'
        },
        {
          icon: 'mdi-youtube',
          title: 'video',
          to: '/video'
        },
        {
          icon: 'mdi-database-edit',
          title: 'manage',
          to: '/manage'
        },
        {
          icon: 'mdi-settings',
          title: 'setting',
          to: '/setting'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '自在飞花'
    }
  },
  methods: {
    ...mapActions(['nextMusic','reqMusic','getMavdata','userlogin','userexit','requestImg','getdata','playlist']),
    scrollGet() {
      this.arrowflag = window.scrollY > 5;
    },
    registUer(){
      this.userexit();
    },

    rightDraFunc(){
      this.rightDrawer = !this.rightDrawer
    },
  },
  computed: {},
  watch: {

  },
  mounted(){
    window.addEventListener('scroll',this.scrollGet,true);

    let user = window.sessionStorage.getItem('user')
    if(user){
      this.userlogin(JSON.parse(user));
    }

  },
  created() {  // '/api/myblog'
    if(this.$store.state.music.albums.length<1){
      this.reqMusic({ type:'albums', api: '/personalized' })
    }

    if (this.$store.state.content.article.length < 1) {
      this.getdata({ api: '/api/myblog', type: 'article' })
    }

    if (this.$store.state.content.jokes.length < 1) {
      this.getdata( {
        api: 'https://www.mxnzp.com/api/jokes/list?page=1',
        type: 'jokes'
      })
    }
    if (this.$store.state.content.news.length < 1) {
      this.getdata( {
        api: 'https://www.mxnzp.com/api/news/list?typeId=521&page=1',
        type: 'news'
      })
    }
    if(this.$store.state.content.pictures.length<1){
      this.requestImg()
    }

  },



}
</script>
<style lang="scss">
  .v-enter,
  .v-leave-to {
    opacity: 0;

    transform: translateX(-100px);
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.6s ease;
  }
  .v-move {
    transition: all 0.6s ease;
  }
  .v-leave-active {
    margin: auto;
    left: 0;
    right: 0;
    position: absolute !important;
  }

.palylist {
  /* right: 0px; */
  /* bottom: 75px; */
  /* position: absolute; */
}
.arrowUp{
  opacity: 0;
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}
.arrowUpTrue{
  opacity: 1; transform: translate3d(0, -100px, 0)
}

  .arrowUpFalse{
    opacity: 0; transform: translate3d(0, 0px, 0)
  }

  /*滚动条样式*/
  html::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }

  html::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(230, 203, 233, 0.2);
    background: rgba(255,255,255,0.3);
  }

  html::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(223, 206, 235, 0.2);
    border-radius: 5px;
    background: rgba(234, 204, 235, 0.1);
  }

  /*滚动条样式*/
  .v-navigation-drawer__content::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }

  .v-navigation-drawer__content::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(230, 203, 233, 0.2);
    background: rgba(255,255,255,0.3);
  }

  .v-navigation-drawer__content::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(223, 206, 235, 0.2);
    border-radius: 5px;
    background: rgba(234, 204, 235, 0.1);
  }


  /*滚动条样式*/
  .v-navigation-drawer::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }

  .v-navigation-drawer::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(230, 203, 233, 0.2);
    background: rgba(255,255,255,0.3);
  }

  .v-navigation-drawer::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(223, 206, 235, 0.2);
    border-radius: 5px;
    background: rgba(234, 204, 235, 0.1);
  }


</style>
