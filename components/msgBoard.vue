<template>
  <v-card flat color="transparent">
    <v-list-item two-line>
      <v-list-item-content class="align-self-start">
        <v-textarea solo flat filled v-model="msgcontent" name="input-7-4" label="真的不来写两句吗???"></v-textarea>
        <v-card-actions>
          <v-btn
            :disabled="btnDisabled && $store.state.user.userName ? false:true"
            small
            color="warning"
            @click="addmsg"
          >评论</v-btn>
        </v-card-actions>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list color="transparent">
      <transition-group appear>
      <template v-for="(e,i) in comments">
        <live-msg  :item="e" :key="e._id" />
        <v-divider class="mb-6" v-if="i !== comments.length-1" :key="i" inset></v-divider>
      </template>
      </transition-group>
    </v-list>



    <div class="msgfooter"></div>
  </v-card>
</template>

<script>
  import liveMsg from './liveMsg'
  export default {
    components:{liveMsg},
  props: {
    comments: Array,
    contdata:Object,
  },
  data() {
    return {
      btnDisabled: false,
      msgcontent: '',
      comment: []
    }
  },

  methods: {

    addmsg() {
      if (this.$store.state.user.userName) {
        let date = new Date()
        let msgItem = {
          articleId: this.contdata._id,
          userId: this.$store.state.user._id,
          userImg: this.$store.state.user.imgsrc,
          userName: this.$store.state.user.userName,
          time: Date.parse(date),
          msg: this.msgcontent.trim(),
          like: 0
        }

        this.$axios
          .post('/api/msgInsert', msgItem)
          .then(res => {
            this.msgcontent = ''
            this.$emit('appendItem',res.ops[0]);
            this.$emit("addReply");
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
    lContent() {
      return this.msgcontent.length
    }
  },
  watch: {
    lContent: function(n, o) {
        this.btnDisabled = n > 3
    }
  }
}
</script>

<style>

</style>
