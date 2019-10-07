<template>
  <v-card flat>
    <v-sheet class="lighten-3 white--text" color="#9C27B0" tile>
      <v-icon class="ml-2" small color="white">mdi-chat-processing</v-icon>
    </v-sheet>

    <v-list-item three-line>
      <v-list-item-avatar class="d-none d-sm-none d-md-flex" color="pink" size="110">
        <img v-if="$store.state.user.imgsrc" :src="$store.state.user.imgsrc" alt />
        <!-- <img v-else :src="$store.state.user.imgsrc" alt /> -->
        <span class="white--text headline">头像</span>
      </v-list-item-avatar>
      <v-list-item-content class="align-self-start">
        <v-textarea solo flat filled v-model="msgcontent" name="input-7-4" label="请输入你想说的话吧 !"></v-textarea>
        <!-- <v-list-item-title class="headline mb-2" v-text="item.title"></v-list-item-title> -->

        <!-- <v-list-item-subtitle v-text="item.artist"></v-list-item-subtitle> -->
        <v-card-actions>
          <v-btn
            :disabled="btnDisabled && $store.state.user.userName ? false:true"
            small
            color="warning"
            @click="addmsg"
            end
          >评论</v-btn>
          <!-- <v-btn :disabled="btnabled" small color="warning" @click="addmsg">取消</v-btn> -->
        </v-card-actions>
      </v-list-item-content>
    </v-list-item>

    <hr />

    <transition appear>
      <v-list three-line>
        <template v-for="(item, index) in msgContents.msgData">
          <!-- <v-subheader :key="index" v-text="item.time"></v-subheader> -->
          <v-list-item :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.userImg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="pt-0">
              <v-list-item-title>
                {{item.userName}}
                <span>{{item.time}}</span>
              </v-list-item-title>
              <v-list-item-subtitle v-html="item.msg"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index" :inset="true"></v-divider>
        </template>
      </v-list>
    </transition>
    <div class="msgfooter"></div>
  </v-card>
</template>

<script>
export default {
  props: {
    msgContents: {}
  },
  data() {
    return {
      btnDisabled: false,
      msgcontent: ''
    }
  },
  methods: {
    formatDate(date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    addmsg() {
      if (this.$store.state.user.userName) {
        let date = new Date()
        let msgItem = {
          articleId: this.msgContents._id,
          userId: this.$store.state.user._id,
          userImg: this.$store.state.user.imgsrc,
          userName: this.$store.state.user.userName,
          time: this.formatDate(date),
          msg: this.msgcontent,
          like: 0
        }
        this.$store.commit('addArticleReply', msgItem)
        this.$axios
          .post('/api/msgInsert', msgItem)
          .then(res => {
            this.msgcontent = ''
            // this.$store.commit('addArticleReply', res.ops[0])
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('你还没登陆呢')
      }
    },
    delmsg(i) {
      let e = this.msgContents.splice(i, 1)[0]
      this.$axios
        .post('/blog/msgDel', e)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    listcontent() {
      return this.msgcontent.length
    }
  },
  watch: {
    listcontent: function(n, o) {
      if (n > 3) {
        this.btnDisabled = true
      } else {
        this.btnDisabled = false
      }
    }
  }
}
</script>

<style>
</style>