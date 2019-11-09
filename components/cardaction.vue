<template>
  <v-row justify="center">
    <!-- <v-badge :color="$store.state.sidecolor" overlap left> -->

    <v-btn text icon @click="addEnshrine(src)" :color="isCollect[colFlag]">
      <v-icon small>mdi-heart</v-icon>
      {{ src.user_id.length }}
    </v-btn>

    <v-btn text icon @click="addLikeImg(src)">
      <v-icon small>mdi-thumb-up</v-icon>
      {{ src.likeCount }}
    </v-btn>

    <v-btn icon @click="addUnLikeImg(src)">
      <v-icon small>mdi-thumb-down</v-icon>
      {{ src.unlikeCount }}
    </v-btn>

    <v-btn text icon color="red" @click="deleteImg(src)">
      <v-icon small>mdi-delete-empty</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
  import {mapMutations} from 'vuex'
export default {

  props: { src: {} },
  data() {
    return {
      isCollect: { true: 'red', false: 'gray' },
      colFlag: false,
    }
  },
  methods: {
    ...mapMutations(['spliceData','pushdata','imgCollect','addLikeImg','addUnLikeImg','imgDelete']),
    addEnshrine(e) {
      if (this.$store.state.user.userName) {
        let user= this.$store.state.user
        let id = e._id
        let n = this.$store.state.content.collectPic.indexOf(e)
        if (n > -1){
          this.spliceData({type:'collectPic',index:n})
          e.user_id.length--
          this.colFlag = false
          this.$axios
            .post('/api/arrDpicture', { _id: id, user_id: user.id })
            .then(res => {
              if(res.data.ok ===1){
                console.log('ok')
              }
            })
        }else {
          this.colFlag = true
          this.pushdata({type:'collectPic',data:e})
          e.user_id.length++
        this.$axios
          .post('/api/arrEpicture', { _id: id, user_id: user.id })
          .then(res => {
            if(res.data.ok ===1){
              console.log('ok')
            }
          })
        }
      } else {
        alert('你还没登录呢')
      }
    },


    changeEnshrine(n) {
      let w = this.src.user_id.findIndex(val => {
        if (val === n.id) {
          return val
        }
      })
      if (w > -1) {
        this.colFlag = true
      }
    },

    deleteImg(e) {
      if (this.$store.state.user.userName) {
        confirm('你确认要删除此项???') &&
          this.imgDelete(e._id)
      } else {
        alert('你还没登录呢')
      }
    }
  },


  mounted() {
    this.changeEnshrine(this.$store.state.user)
  }
}
</script>

<style></style>
