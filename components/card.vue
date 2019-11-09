
<template>
    <v-card
      flat
      class="mt-4"
    >

      <v-toolbar flat dense class="cyan--text">
        <v-toolbar-title>{{item.title}}</v-toolbar-title>
        <v-btn color="cyan" text class="ma-0 pa-0" :to="'/'+item.userName">
          <v-icon small>mdi-account-edit</v-icon>
          {{ item.userName ? item.userName : "未知用户" }}
        </v-btn>
        <v-btn color="cyan" class="ma-0 pa-0" text :to="'/'+item.type">
          <v-icon small>mdi-file</v-icon>
          {{ item.type ? item.type : "未分类" }}
        </v-btn>
      </v-toolbar>
      <v-btn style="opacity: 0.3"  class="pa-0 pl-2" text to="/timeline">
        {{ new Date(item.time).toLocaleString()}}
      </v-btn>
      <no-ssr>
        <mavon-editor
          :toolbars="markdownOption"
          style="overflow: hidden"
          boxShadowStyle="none"
          :value="item.content"
          defaultOpen="preview"
          previewBackground="transparent"
          :ishljs = "true"
          :subfield="false"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
        />
      </no-ssr>

      <v-card-actions flut>


        <v-btn  class="mx-3 textcolor--text" icon @click="addLike">
          <v-icon small>mdi-heart</v-icon>
          <p>{{ item.like }}</p>
        </v-btn>

        <v-btn  class="mx-3 textcolor--text" icon @click="addCollect">
          <v-icon small>mdi-star</v-icon>
          <p v-text="item.collect.length"></p>
        </v-btn>

        <v-btn
          class="mx-3 textcolor--text"
          icon
          @click="showMsgBoard"
        >
          <v-icon small>mdi-chat-processing</v-icon>
          <p v-text="item.reply"></p>
        </v-btn>

        <v-btn  class="mx-3 textcolor--text" icon>
          <v-icon small>mdi-eye</v-icon>
          <p v-text="item.see"></p>
        </v-btn>

        <div class="flex-grow-1"></div>

        <v-btn
          class="textcolor--text"
          @click="showPage(item)"
          text
        >展开阅读</v-btn>
      </v-card-actions>
      <msgboard
        :contdata="item"
        :comments = "msgComments"
        @addReply="addReply"
        class="MsgBoard"
        v-show="msgBoardFlag"
        @appendItem="appendItem"
      />

    </v-card>
</template>
<script>
  import msgboard from "@/components/msgBoard";
  import {mapMutations} from 'vuex'
  export default {
    components:{msgboard},
    props:{item:{}},
    data(){
      return{
        markdownOption: {
          bold: true, // 粗体
        },
        msgComments:[],
        msgBoardFlag:false
      }
    },
    methods:{
      ...mapMutations(['articleEdit']),
      showPage(e){
        this.$router.push(
          {
            path: `/${e.userName}/${e._id}`
          }
        )
        this.addSee()
      },
      showMsgBoard() {
        this.msgBoardFlag = !this.msgBoardFlag;
        if(this.msgComments.length===0){
          let Json = {
            articleId: this.item._id
          };
          this.$axios.post('/api/msgSearch', Json).then(res => {
            this.msgComments = res.reverse();
          });
        }

      },
      appendItem(e) {
        this.msgComments.unshift(e);
      },
      addReply() { //reply
        this.articleEdit(
          {type:'reply',data:this.item}
        )
      },
      addCollect(){
        this.articleEdit(
          {type:'collect',data:this.item}
          )
      },
      addLike(){
        this.articleEdit(
          {type:'like',data:this.item}
        )
      },
      addSee(){
        this.articleEdit(
          {type:'see',data:this.item}
        )
      }
    },
  }
</script>
<style scoped>
  .markdown-body{
  color:unset;
  }
  .v-note-wrapper{
    min-height: 55px;
    max-height: 200px;
    z-index: 1 !important;
    background-color:unset
  }
  .v-show-content{
    background-color: white !important;
  }
</style>
