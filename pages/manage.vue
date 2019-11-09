<template>
  <transition appear>
    <v-card flat color="cyan" dark>
      <v-card-title>
        文章管理
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        light
        :headers="headers"
        :items="$store.state.content.article"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @click:row="showitem"
        :search="search"
        @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.userName" label="name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="title"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.type" label="type"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.collect" label="collect"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reply" label=" reply"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.like" label=" like"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.time" label="time"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="textcolor" text @click="close">Cancel</v-btn>
                <v-btn color="textcolor" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- </v-toolbar> -->
        </template>

        <template v-slot:item.title="{ item }">
          <span v-if="item.title">{{item.title}}</span>
        </template>
        <template v-slot:item.time="{ item }">
          <span>{{new Date(item.time).toLocaleString()}}</span>
        </template>

        <template v-slot:item.collect="{ item }">
          <span>{{item.collect.length}}</span>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small class="pr-2" @click.stop.prevent="editItem(item)">mdi-pencil</v-icon>
          <v-icon
            small
            class="pr-2"
            @click.stop.prevent="showitem(item)"
          >mdi-file-document-edit-outline</v-icon>
          <v-icon small @click.stop.prevent="deleteItem(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:item.articletype="{ item }">
          <v-chip class="lighten-2" :color="getColor(item.articleType)" dark>
            {{
            item.articleType
            }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </transition>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      page: 1,
      pageCount: 0,
      search: '',
      itemsPerPage: 25,
      dialog: false,
      headers: [
        {
          text: '作者',
          align: 'left',
          sortable: false,
          value: 'userName',
          width: '120px'
        },
        {
          text: '文章标题',
          align: 'left',
          sortable: false,
          value: 'title',
          width: '200px'
        },
        { text: '文章类型', value: 'articleType', sortable: false },
        { text: '创建时间', value: 'time' },
        { text: '收藏', value: `collect` },
        { text: '评论', value: 'reply' },
        { text: '喜欢', value: 'like' },
        { text: 'Actions', value: 'action', sortable: false }
      ],

      editedIndex: -1,
      editedItem: {
        title: '',
        userName: '',
        type: 0,
        collect: 0,
        like: 0,
        reply: 0,
        time: ''
      },
      defaultItem: {
        title: '',
        userName: '',
        type: 0,
        collect: 0,
        like: 0,
        reply: 0,
        time: ''
      }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  methods: {
    showitem(e) {
      // console.log(e);
      // this.$store.commit('articleEdite')
      this.$router.push({
        path: `/${e.userName}/${e._id}`,
        query: { id: e._id }
      })
    },

    editItem(item) {
      this.editedIndex = this.$store.state.content.article.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      if (this.$store.state.user.userName) {
        confirm('你确认要删除此项???') &&
          this.$store.commit('deleteArticle', item)
      } else {
        alert('你还没登录呢')
      }
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.commit('editArticle', {
          item: this.editedItem,
          index: this.editedIndex
        })
      } else {
        this.$store.state.article.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
