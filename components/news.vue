<template>
  <v-card
    class="mx-auto mb-4"
    flat
    :to="{name:'newsDetail',params:{id:item.newsId}}"
  >

    <div style="overflow: hidden" class="d-flex flex-no-wrap justify-start">
      <v-avatar v-if="item.imgList"  width="240px" height="auto" size="140" tile>
        <v-img  :src="item.imgList[0]?item.imgList[0]:item.imgList[1]"></v-img>
      </v-avatar>

      <div class="ml-6">
        <v-card-actions class="pa-0 ">
          <v-btn text class="pa-0 cyan--text">
            <v-icon small>mdi-account-edit</v-icon>
            {{ item.source ? item.source : "未知来源" }}
          </v-btn>
          <v-btn class="pa-0 cyan--text" text>
            <v-icon small>mdi-file</v-icon>
            {{ item.articleType ? item.articleType : "未分类" }}
          </v-btn>
        </v-card-actions>

          <p  class="subtitle  font-weight-bold pr-4" >
           {{item.title}}
          </p>

        <v-list-item-subtitle v-if="item.digest"  v-text="item.digest"></v-list-item-subtitle>
        <v-btn style="opacity: 0.3"  class="pa-0 pl-2" text to="/timeline">
          {{ new Date(item.postTime).toLocaleString()}}
        </v-btn>

      </div>
    </div>

  </v-card>
</template>

<script>
  export default {
    props:{item:{}},
    name: 'news.vue'
  }
</script>

<style scoped>
.subtitle:hover{
  color: #37bdca;
  }

</style>
