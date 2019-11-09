<template>

      <v-row
        justify="center"
      >
        <v-col xl="9" lg="11" class="pa-0">
          <v-img
            class="white--text align-end"
            height="500px"
            src="https://i.loli.net/2019/11/03/P9p8uaw2eD4GA1C.jpg"
          >
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>
        </v-col>
        <v-col xl="6" lg="7" md="12" sm="12" xs="12" >
        <h2 class="mb-2 textcolor--text">我的收藏</h2>
          <v-card flat color="transparent">
            <v-app-bar dense flat color="cyan" dark>
              <v-btn to="/user/" icon>
                <v-icon>mdi-book-open-page-variant</v-icon>
              </v-btn>
              <v-btn to="/user/collectImage" icon>
                <v-icon>mdi-image</v-icon>
              </v-btn>
            </v-app-bar>

              <nuxt-child keep-alive />

          </v-card>

        <h2 class="mt-4 mb-2 textcolor--text">我的文章</h2>

          <v-card flat color="transparent">
            <v-app-bar dense flat color="cyan" dark>
              <v-btn icon>
                <v-icon>mdi-book-open-page-variant</v-icon>
              </v-btn>
            </v-app-bar>

              <card :key="index" :item="item" v-for="(item,index)  in $store.state.content.myArticle.slice((page-1)*7,7*page)"/>
              <div class="text-center" v-if="Math.ceil($store.state.content.myArticle.length/7)>1">
                <v-pagination
                  color="textcolor"
                  circle
                  v-model="page"
                  :length="Math.ceil($store.state.content.myArticle.length/7)"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                ></v-pagination>
              </div>


          </v-card>
      </v-col>

        <v-col  xl="3" lg="4" >
              <h2 class="mb-2 textcolor--text">消息中心</h2>
                <systemmsg :items="fadedata"/>

        </v-col>
      </v-row>


</template>

<script>
  import card from '~/components/card.vue';
  import systemmsg from '~/components/systemMsg'
  export default {
    components:{card,systemmsg},
    name: 'user',
    data(){
      return{
        fadedata:[{title:'系统消息',avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',msg:"姬长信API For Docker 一个基于多种编程语言开源免费不限制提供生活常用,出行服务,开发工具,金融服务,通讯服务和公益大数据的平台.!",time:'1hr'},
          {title:'系统消息',msg:"恭喜你注册成功!",time:'3hr',action: 'mdi-account-multiple'}],
        page:1,
      }
    },
    activated() {
      if(this.$store.state.user.id){
        this.$store.commit('userCollect')
        this.$store.commit('imgCollect')
        this.$store.commit('myArticle')
      }else{
        this.$router.push('/signin')
      }

    },


  }
</script>

<style scoped>
.dd{
  justify-content: space-between;
}

</style>
