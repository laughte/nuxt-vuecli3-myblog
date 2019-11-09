<template>
  <v-card flat >
    <v-toolbar class="mt-4 textcolor--text" color="listbgcolor"  flat>
      <div class="flex-grow-1"></div>

      <v-text-field  hide-details single-line persistent-hint label="文章标题" v-model="title"></v-text-field>

      <div class="flex-grow-1"></div>

      <div class="flex-grow-1"></div>
      <v-btn depressed color="rgba(100,255,255,0.3)" class="textcolor--text" @click="overlay=!overlay" :disabled="title?false:true">发布文章</v-btn>
    </v-toolbar>
    <no-ssr>
    <mavon-editor
      boxShadowStyle="none"
      :scrollStyle="true"
      @save="overlay=!overlay" v-model="value" />
    </no-ssr>

    <v-overlay :value="overlay">
<v-row justify="center">
  <v-col lg="6" xl="6" sm="12" xs="12">
      <v-card color="cyan">
        <v-card-title>
        选择文章分类
        </v-card-title>
        <v-container fluid style="height: 150px;overflow: auto" class="radiogroup pt-0">
        <v-radio-group class="ma-0" v-model="type" row>
          <v-radio class="pa-2" :label="item" v-for="(item,index) in items"  :value="item" :key="index"></v-radio>
        </v-radio-group>
        </v-container>

        <v-text-field v-model="newtype" filled dense hide-details rounded single-line placeholder="添加新的分类" >
        </v-text-field>
        <v-card-actions>
          <v-btn depressed color="rgba(255,255,255,0.3)" @click="addNewtype">添加分类</v-btn>
          <v-btn
            depressed
            color="rgba(255,255,255,0.3)"
          @click="overlay = false"
        >返回
        </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn depressed color="rgba(255,255,255,0.3)"
                 @click="saveData(value)" :disabled="type !==''&& $store.state.user.userName ? false:true">立即发布</v-btn>
        </v-card-actions>
        <v-sheet class="pl-4" color="orange lighten-2 white--text" v-show="$store.state.user.userName ?false:true " >你还没有登录呢! </v-sheet>
      </v-card>
  </v-col>
</v-row>


    </v-overlay>
  </v-card>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        overlay:false,
        value: "",
        newtype:'',
        type:'',
        title:'',
        items: [
          "python",
          "java",
          "PHP",
          "JavaScript",
          "诗经",
          "古诗词",
          "小说",
          "散文",
        ],
      };
    },
    methods: {
      closeBoard() {
        this.$router.push("/");
      },
      saveData(e) {
        if(this.$store.state.user.userName){
        if(e&&this.title){

        let data = {
          type: this.type,
          title:this.title,
          userName : this.$store.state.user.userName,
          imgsrc : this.$store.state.user.imgsrc,
          time:Date.parse(new Date()),
          content:e,
          like : 0,
          collect : [],
          reply : 0,
          see:0,
          delete : 0
        }

          this.$axios
            .post("/api/insert", data)
            .then(res => {
              this.$store.commit('pushdata',{type:'article',data:res.ops[0]})
            })
            .catch(err => {
              console.log(err);
            });
          this.closeBoard();
        }else {
          alert('内容不能为空!')
        }
        }else{
          alert('请先登录吧!')
        }

      },
      addNewtype(){
        if(this.newtype){
          this.items.push(this.newtype);
          this.newtype=''
        }
      }
    }
  };
</script>
<style scoped>
  .v-note-wrapper {
    position: static;
    min-height: 800px;
  }


  /*滚动条样式*/
  .radiogroup::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }

  .radiogroup::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(230, 203, 233, 0.2);
    background: rgba(255,255,255,0.3);
  }

  .radiogroup::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(223, 206, 235, 0.2);
    border-radius: 5px;
    background: rgba(234, 204, 235, 0.1);
  }
</style>
