<template>
  <v-card flat >
    <v-card-actions  class="pt-0 pa-0" style="width: 100%;overflow: hidden">

      <v-btn color="textcolor" text class="pa-0" :to="'/'+initData.userName">
        <v-icon small>mdi-account-edit</v-icon>
        {{ initData.userName ? initData.userName : "未知用户" }}
      </v-btn>
      <v-btn
        color="textcolor"
        class="pa-0"
        text
        :to="'/'+initData.type"
      >
        <v-icon small>mdi-file</v-icon>
        {{ initData.type ? initData.type : "未分类" }}
      </v-btn>
    </v-card-actions>
    <v-btn style="opacity: 0.3"  class="pa-0 pl-2" text to="/timeline">
      {{ new Date(initData.time).toLocaleString()}}
    </v-btn>
    <v-card-title class="cyan--text">{{initData.title}}</v-card-title>

    <no-ssr>
      <mavon-editor
        boxShadowStyle="none"
        :scrollStyle="true"
        defaultOpen="preview"
        previewBackground="transparent"
        :ishljs = "true"
        :subfield="false"
        :toolbarsFlag="false"
        :editable="false"
        :value="initData.content" />
    </no-ssr>


    <v-spacer />

    <v-card-actions class="pt-0">
      <v-btn color="textcolor" text @click="addLike">
        <v-icon small>mdi-heart</v-icon>
        <p>{{ initData.like }}</p>
        {{'喜欢'}}
      </v-btn>

      <v-btn color="textcolor" text @click="addCollect">
        <v-icon small>mdi-star</v-icon>
        <p v-text="initData.collect?initData.collect.length:'0'"></p>
        {{'收藏'}}
      </v-btn>

      <v-btn color="textcolor" text>
        <v-icon small>mdi-chat-processing</v-icon>
        <p v-text="initData.reply"></p>
        {{'评论'}}
      </v-btn>
      <v-btn  class="mx-3 textcolor--text" icon>
        <v-icon small>mdi-eye</v-icon>
        <p v-text="initData.see"></p>
      </v-btn>

      <div class="flex-grow-1"></div>
<!--      <v-btn v-if="$store.state.ifEdite" @click="save">保存更改</v-btn>-->
    </v-card-actions>
    <msg-board :contdata="initData" :comments = "msgComments"  @appendItem="appendItem" />
  </v-card>
</template>
<script>
import msgBoard from '~/components/msgBoard.vue';
import {mapMutations} from 'vuex'
export default {
  components: { msgBoard },
  data() {
    return {
      initData: {},
      msgComments:[],
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
          to: '/' + this.$route.params.id
        }
      ]
    }
  },

  methods: {
    ...mapMutations(['articleEdit']),
    save() {
      this.$refs.editor.save()
    },
    getInitData(id) {
      this.$store.state.content.article.forEach(e => {
        if (e._id === id) {
          this.initData = e
          this.showMsgBoard(e)
        }
      })
    },
    showMsgBoard(item) {
      if(this.msgComments.length===0){
        let Json = {
          articleId: item._id
        };
        this.$axios.post('/api/msgSearch', Json).then(res => {
          this.msgComments = res.reverse();
        });
      }
    },
    appendItem(e) {
      this.msgComments.unshift(e);
    },

    onSave(response) {
      this.$store.commit('changeArticle', {
        id: this.initData._id,
        data: response.blocks
      })
    },
    addCollect(){
      this.articleEdit(
        {type:'collect',data:this.initData}
      )
    },
    addLike(){
      this.articleEdit(
        {type:'like',data:this.initData}
      )
    },

  },
  watch: {
    routeridData: function(n) {
      this.getInitData(n)
    }
  },
  computed: {
    routeridData: function() {
      return this.$route.params.id
    }
  },
  activated() {

    this.getInitData(this.$route.params.id)

    // console.log(this.$route.query.content)
  },
  mounted() {
    this.showMsgBoard(this.initData)
  }

}
</script>
<style scoped>
  .v-note-wrapper{
    background-color: rgba(255, 255, 255, 0) !important;
    z-index: 1 !important;
  }
  .markdown-body{
    color:unset;
  }
</style>
