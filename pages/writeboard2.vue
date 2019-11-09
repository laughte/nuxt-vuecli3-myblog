<template>
  <v-card flat>
    <editor
      :autofocus="true"
      :init-data="initData"
      ref="editor"
      @save="onSave"
      @ready="onReady"
      @change="onChange"
    />
    <v-card-actions>
      <v-text-field color="textcolor" v-model="type" label="填写类别"></v-text-field>
      <v-spacer />
      <v-spacer />
      <v-btn :disabled="$store.state.user.userName ? false:true" @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      initData: {},
      type: ''
    }
  },
  methods: {
    save() {
      this.$refs.editor.save()
    },

    onSave(response) {
      //   console.log(JSON.stringify(response))
      response.articleType = this.type
      response.userName = this.$store.state.user.userName
      response.userImg = this.$store.state.user.imgsrc
      response.like = 0
      response.collect = []
      response.reply = 0
      response.msgFlag = false
      response.delete = 0
      // console.log(response)
      //   this.$store.state.article.unshift(response)

      this.$axios
        .post('/api/insert', response)
        .then(res => {
          // console.log(res)
          this.$store.commit('pushdata',{type:'article',data:res.ops[0]})
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onReady() {
      console.log('ready')
    },
    onChange() {
      console.log('changed')
    }
  }
}
</script>

<style>
  .codex-editor__redactor{
    min-height: 350px !important;
  }
</style>
