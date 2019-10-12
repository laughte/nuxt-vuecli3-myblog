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

    <v-btn icon @click="addunlike(src)">
      <v-icon small>mdi-thumb-down</v-icon>
      {{ src.unlikeCount }}
    </v-btn>

    <v-btn text icon color="red" @click="deleteImg(src)">
      <v-icon small>mdi-delete-empty</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  props: { src: {} },
  data() {
    return {
      isCollect: { true: 'gray', false: 'red' },
      colFlag: true
    }
  },
  methods: {
    addEnshrine(e) {
      if (this.$store.state.user.userName) {
        let userid = this.$store.state.user._id
        let id = e._id
        e.user_id.length++
        this.$axios
          .post('/api/arrEpicture', { _id: id, user_id: userid })
          .then(res => {
            console.log(res)
          })
      } else {
        alert('你还没登录呢')
      }
    },
    addLikeImg(e) {
      let id = e._id
      this.$store.commit('imgAddLike', id)
    },

    addunlike(e) {
      let id = e._id
      this.$store.commit('imgAddUnlike', id)
    },
    changeEnshrine(n) {
      let w = this.src.user_id.findIndex(val => {
        if (val === n._id) {
          return val
        }
      })
      if (w > -1) {
        this.colFlag = false
      }
    },

    deleteImg(el) {
      if (this.$store.state.user.userName) {
        confirm('你确认要删除此项???') &&
          this.$store.commit('imgDelete', el._id)
      } else {
        alert('你还没登录呢')
      }
    }
  },

  computed: {
    stateuser: function() {
      return this.$store.state.user
    }
  },

  watch: {
    stateuser: function(n) {
      this.changeEnshrine(n)
    }
  }
}
</script>

<style></style>
