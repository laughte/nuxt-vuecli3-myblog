<template>

      <v-list-item >
        <v-list-item-avatar>
          <v-img v-if="item.userImg" :src="item.userImg"></v-img>
          <v-icon v-else large class="textcolor--text">mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="pa-0">
          <v-list-item-title class="body-2 font-regular">
            {{item.userName}}
            <span>{{new Date(item.time).toLocaleString()}}</span>
          </v-list-item-title>
          <p class="font-weight-bold body-2 " v-text="item.msg"></p>
        </v-list-item-content>
      </v-list-item>

</template>

<script>
  export default {
    name: 'liveMsg',
    props:{item:Object}
  }
</script>

<style scoped>

</style>
