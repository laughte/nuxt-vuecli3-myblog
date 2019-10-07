<template>
  <v-layout>
    <v-flex>
      <v-breadcrumbs :items="links"></v-breadcrumbs>
      <v-card flat>
        <v-card-actions class="pt-0 pa-0">
          <v-btn text class="pa-0" :to="'/'+initData.userName">
            <!-- <v-avatar class="profile" size="35">
            <img :src="contentdata.avatar" alt />
            </v-avatar>-->
            <v-icon small>mdi-account-edit</v-icon>
            {{ initData.userName ? initData.userName : "未知用户" }}
          </v-btn>
          <v-btn class="pa-0" text :to="'/'+initData.articleType">
            <v-icon small>mdi-file</v-icon>
            {{ initData.articleType ? initData.articleType : "未分类" }}
          </v-btn>
          <v-btn class="pa-0" text to="/timeline">
            <v-icon small>mdi-calendar-range</v-icon>
            {{ new Date(initData.time).toLocaleString()}}
          </v-btn>
        </v-card-actions>
        <editor
          :autofocus="true"
          :init-data="initData"
          ref="editor"
          @save="onSave"
          @ready="onReady"
          @change="onChange"
        />
        <v-spacer />

        <v-card-actions class="pt-0">
          <v-btn text @click="$store.commit('addArticleLike',initData)">
            <v-icon small>mdi-heart</v-icon>
            <p>{{ initData.like }}</p>
            {{'喜欢'}}
          </v-btn>
          <!-- </v-badge> -->
          <!-- 
          <v-badge overlap class="mx-5">
          <template v-slot:badge>{{contentdata.articleCollect}}</template>-->
          <v-btn text @click="$store.commit('addArticleCollect',initData)">
            <v-icon small>mdi-star</v-icon>
            <p v-text="initData.collect.length"></p>
            {{'收藏'}}
          </v-btn>
          <!-- </v-badge> -->

          <!-- <v-badge overlap class="mx-5">
          <template v-slot:badge>{{contentdata.articleReply}}</template>-->
          <v-btn text @click="showMsgBoard(initData)">
            <v-icon small>mdi-chat-processing</v-icon>
            <p v-text="initData.reply"></p>
            {{'评论'}}
          </v-btn>
          <!-- </v-badge> -->

          <div class="flex-grow-1"></div>
          <v-btn @click="save">保存更改</v-btn>
        </v-card-actions>
        <msg-board :msgContents="initData" v-show="initData.msgFlag" />
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import msgBoard from '~/components/msgBoard.vue'
import axios from 'axios'
export default {
  components: { msgBoard },
  data() {
    return {
      initData: {},
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
    save() {
      this.$refs.editor.save()
    },
    getInitData(id) {
      this.$store.state.article.forEach(element => {
        if (element._id === id) {
          this.initData = element
        }
      })
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

    onSave(response) {
      this.$store.commit('changeArticle', {
        id: this.initData._id,
        data: response.blocks
      })
    },
    onReady() {
      console.log('ready')
    },
    onChange() {
      console.log('changed')
    }
  },
  created() {
    this.getInitData(this.$route.params.id)
    // console.log(this.$route.query.content)
  }
}
</script>
