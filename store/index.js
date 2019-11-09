export const state = () => ({
    musicserve: "http://39.105.168.171:3000",
    content: {
        article: [],
        jokes: [],
        news: [],
        pictures: [],
        collectPic:[],
        types: [],
        userList: [],
        userArticle: [],
        myArticle:[],
        collect:[],
        comment:[]

    },
    music: {
        user: {},
        song:  {
          "id": 393593,
          "url": "http://m7.music.126.net/20191007064804/d1780084c12f24a309f905f05e229394/ymusic/0d01/e264/f42a/593935f41139a89911f1e5db1cb7c806.mp3",
          "br": 192000,
          "size": 3124079,
          "md5": "593935f41139a89911f1e5db1cb7c806",
          "code": 200,
          "expi": 1200,
          "type": "mp3",
          "gain": 0,
          "fee": 0,
          "uf": null,
          "payed": 0,
          "flag": 0,
          "canExtend": false,
          "freeTrialInfo": null,
          "level": "higher",
          "encodeType": "mp3"
        },
        songDetail: {},
        songs: [],
        searchSong:{},
        playlist:[
          {
            "id": 393593,
            "name": "晨光剑舞",
            "artists": [{
              "id": 190325,
              "name": "王晓",
              "picUrl": null,
              "alias": [],
              "albumSize": 0,
              "picId": 0,
              "img1v1Url": "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
              "img1v1": 0,
              "trans": null
            }],
            "album": {
              "id": 38991,
              "name": "九阴真经OL 音乐原声集",
              "artist": {
                "id": 0,
                "name": "",
                "picUrl": null,
                "alias": [],
                "albumSize": 0,
                "picId": 0,
                "img1v1Url": "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                "img1v1": 0,
                "trans": null
              },
              "publishTime": 1287331200000,
              "size": 32,
              "copyrightId": 0,
              "status": 1,
              "picId": 67070209310509,
              "mark": 0
            },
            "duration": 130089,
            "copyrightId": 0,
            "status": 0,
            "alias": [],
            "rtype": 0,
            "ftype": 0,
            "mvid": 0,
            "fee": 0,
            "rUrl": null,
            "mark": 0
          }
          ],
        album: {},
        album2: {},
        albums: [],
        playing: false,
      songsInfo:{}
    },

    user: {},
    colors: [
        'red',
        'pink',
        'purple',
        'indigo',
        'blue',
        'deep-purple',
        'light-blue',
        'cyan',
        'teal',
        'lime',
        'amber',
        'orange',
        'yellow darken-1',
        'deep-orange',
        'brown',
        'blue-grey'
    ],
    typeColor: {
        'python': 'red', 'js': 'pink accent-2',
        'PHP': 'teal', 'java': 'purple', '随笔': 'amber darken-1',
        '诗经': 'brown lighten-3', '散文': 'cyan lighten-3',
        '诗词': 'orange', '小说': 'lime', '杂想': 'blue-grey',

    },
  likecountflag:true,
  unlikecountflag:true,

})

export const mutations = {
  USERLOGIN(state,data){
    state.user = data
    // 存储登陆信息
    window.sessionStorage.setItem('user', JSON.stringify((state.user)));
    // console.log(state.user)
  },
  USEREXIT(state) {
    state.user = {};
    window.sessionStorage.removeItem('user');
  },


    getdata(state, json) {
        state.content[json.type] = json.data.reverse()
        // console.log(state.content[json.type])
    },
    pushdata(state,json){
      state.content[json.type].unshift(json.data)
    },
      spliceData(state,json){
        state.content[json.type].splice(json.index,1)
      },



    addArticle(state, json) {
        state.content.article.unshift(json)
    },

    selectArticle(state, e) {
        state.content.userArticle = []
        state.content.article.forEach(Element => {
            if (Element[e.type] === e.data) {
                state.content.userArticle.push(Element)
            }
        });
    },

    filterUser(state) {
        let artype = [];
        let user = [];
        state.content.article.forEach(e => {
            if (e.type) {
                artype.push(e.type);
            }
            if (e.userName) {
                user.push(e.userName);
            }
        });

        state.content.types = Array.from(new Set(artype));
        state.content.userList = Array.from(new Set(user));
    },
  myArticle(state){
    state.content.article.forEach(e => {
      if (e.userName=== state.user.userName) {
        state.content.myArticle.push(e)
      }
    })
  },
  userCollect(state) {
    state.content.article.forEach((e) => {
      if (e.collect.indexOf(state.user.userName) > -1) {
        state.content.collect.push(e)
      }
    })
  },

  articleEdit(state,json){
    state.content.article.forEach(e=>{
      if(e._id===json.data._id){
        if(e[json.type] instanceof Array){
          let n = e[json.type].indexOf(state.user.userName)
          if(n>-1){
            e[json.type].splice(n,1)
          }else{
            e[json.type].push(state.user.userName)
          }
        }else if(json.type==='like'){
          json.data.countflag = !json.data.countflag
          if(json.data.countflag){
            e[json.type]++
          }else{
            e[json.type]--
          }

        }else{
          e[json.type]++
        }
        this.$axios.post('/api/update',e)
      }

    })
  },


  // 音乐相关
  getmusic(state, json) {
    state.music[json.type] = json.data
    // console.log(state.music.album)
  },
  pushMusic(state,e){
    state.music.playlist.unshift(e)
  },

  // 当音频播放
  onPlay(state){
    state.music.playing = true
  },
  // 当音频暂停
  onPause(state){
    state.music.playing = false
  },

  //图片相关
  imgCollect(state) {
    state.content.pictures.forEach((e) => {
      if (e.user_id.indexOf(state.user.id) > -1) {
        state.content.collectPic.push(e)
      }
    })
  },
  addLikeImg(state,json){
    json.countflag = !json.countflag
    state.content.pictures.forEach(e=>{

      if(e._id===json._id){
        if(json.countflag){
          e.likeCount++
        }else{
          e.likeCount--
        }
        this.$axios.post("/api/epicture", {
          _id: json._id,
          likeCount: e.likeCount
        });
      }
    })
  },
  addUnLikeImg(state,json){
    json.countflag1 = !json.countflag1
    state.content.pictures.forEach(e=>{
      if(e._id===json._id){
        if(json.countflag1){
          e.unlikeCount++
        }else{
          e.unlikeCount--
        }
        this.$axios.post("/api/epicture", {
          _id: json._id,
          unlikeCount: e.unlikeCount
        });
      }
    })
  },
  imgDelete(state,e){
    state.content.pictures.forEach((el,i,arr)=>{
      if(el._id===e){
        this.$axios.post("/api/dpicture", {
          _id: arr.splice(i,1)._id
        });
      }
    })
  }




}


export const actions = {

    async getdata({ commit }, json) {
        let res = await this.$axios.get(json.api)
        if (res instanceof Array) {
            commit('getdata', { type: json.type, data: res })
        } else {
            if (res.data instanceof Array) {
                commit('getdata', { type: json.type, data: res.data })
            } else{
            commit('getdata', { type: json.type, data: res.data.list })
          }
        }
    },


  // 列表选择播放
  playlist({state,commit,dispatch},data){

    if (state.music.playlist.indexOf(data) < 0) {
      commit('pushMusic',data)
    }
    commit('getmusic',{type:'songsInfo',data})
    dispatch(
       'reqSong',
      {api:'/song/url?id='+data.id,type:'song'}
     )
    if(data.album){
    dispatch('reqAlbum',{type:'album',api:'/album?id=' + data.album.id})
    }
    },
  //切换上一曲
  lastMusic({state,commit,dispatch}) {
    state.music.playlist.forEach((element, index) => {
      if (element.id === state.music.song.id) {
        if (index - 1 >= 0) {
          dispatch('playlist',state.music.playlist[index - 1])
        } else {
          dispatch('playlist', state.music.playlist[state.music.playlist.length - 1])
        }
      }
    })
  },
  //切换下一曲
  nextMusic({state,commit,dispatch}) {
    state.music.playlist.forEach((element, index) => {
      if (element.id === state.music.song.id) {
        if (index + 1 === state.music.playlist.length) {
          dispatch('playlist',state.music.playlist[0])
        } else {
          dispatch('playlist',state.music.playlist[index + 1])
        }
      }
    })
  },


  async reqSong({ state, commit }, json) {
    let res = await this.$axios.get(state.musicserve + json.api)
    commit('getmusic', { type: json.type, data: res.data[0]})

  },
  async reqAlbum({ state, commit }, json) {
    let res = await this.$axios.get(state.musicserve + json.api)
    commit('getmusic', { type: json.type, data: res.album})
    // commit('getmusic',{type:'playlist',data:res.songs})
  },

    async reqMusic({ state, commit }, json) {
        let res = await this.$axios.get(state.musicserve + json.api)
        commit('getmusic', { type: json.type, data: res.result })

    },

  requestImg({commit}) {
    this.$axios.get(`/api/picture`, {}).then(res => {
      commit('getdata', { type: 'pictures', data: res })
    })
  },

    // 用户登录
    userlogin({
        commit
    }, data) {
        commit('USERLOGIN', data);
    },


    // 用户退出
    userexit({
        commit
    }) {
        commit('USEREXIT');
    },
}
