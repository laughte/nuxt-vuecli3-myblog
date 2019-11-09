<template>
    <v-card
      flat
      class="mb-2"
    >
      <v-card-actions class="pt-0 pa-0" style="width: 100%;overflow: hidden">
        <v-btn color="cyan" text class="ma-0 pa-0" :to="'/'+item.userName">
          <v-icon small>mdi-account-edit</v-icon>
          {{ item.userName ? item.userName : "未知用户" }}
        </v-btn>
        <v-btn color="cyan" class="ma-0 pa-0" text :to="'/'+item.articleType">
          <v-icon small>mdi-file</v-icon>
          {{ item.articleType ? item.articleType : "未分类" }}
        </v-btn>

        <v-btn class="ma-0 pa-0" color="cyan" text @click="$store.commit('addArticleLike',item)">
          <v-icon small>mdi-heart</v-icon>
          <p>{{ item.like }}</p>
          {{'喜欢'}}
        </v-btn>

        <v-btn class="ma-0 pa-0" color="cyan" text @click="$store.commit('addArticleCollect',item)">
          <v-icon small>mdi-star</v-icon>
          <p v-text="item.collect.length"></p>
          {{'收藏'}}
        </v-btn>

        <v-btn class="ma-0 pa-0" color="cyan" text @click="showMsgBoard(item)">
          <v-icon small>mdi-chat-processing</v-icon>
          <p v-text="item.reply"></p>
          {{'评论'}}
        </v-btn>
<!--        <v-btn-->
<!--           class="d-none d-sm-none d-md-flex"-->
<!--           icon-->
<!--           @click="$store.commit('deleteArticle',item)"-->
<!--         >-->
<!--           <v-icon small>mdi-delete</v-icon>-->
<!--           {{'删除'}}-->
<!--   </v-btn>-->
      </v-card-actions >
      <v-list-item three-line @click="showMsgBoard(item)">
        <v-list-item-content class="align-self-start">

          <v-list-item-title
            class="subtitle mb-2 font-weight-bold cyan--text"
            v-if="item.blocks[0]"

          >{{item.blocks[0].data.text}}</v-list-item-title>
          <v-list-item-subtitle class="cyan--text" v-if="item.blocks[1]" v-text="item.blocks[1].data.text"></v-list-item-subtitle>
          <v-list-item-subtitle class="cyan--text" v-if="item.blocks[2]" v-text="item.blocks[2].data.text"></v-list-item-subtitle>
          <v-list-item-subtitle class="cyan--text" v-if="item.blocks[3]" v-text="item.blocks[3].data.text"></v-list-item-subtitle>
          <v-list-item-subtitle class="cyan--text" v-if="item.blocks[4]" v-text="item.blocks[4].data.text"></v-list-item-subtitle>
          <v-spacer />
          <div class="flex-grow-1"></div>
        </v-list-item-content>
      </v-list-item>



    <v-card-actions>
      <v-btn color="cyan" class="ma-0 pa-0" text to="/timeline">
        <v-icon small>mdi-calendar-range</v-icon>
        {{ new Date(item.time).toLocaleString() }}
      </v-btn>
    </v-card-actions>
    </v-card>
</template>
<script>
  export default {
    props:{item:{}},
    data(){
      return{

      }
    },
    methods:{
      showMsgBoard(e){
        this.$router.push(
          {
            path: `/${e.userName}/${e._id}`
          }
        )
      }
    }
  }
</script>
