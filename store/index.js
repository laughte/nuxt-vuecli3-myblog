export const state = () => ({
  musicserve: "http://39.105.168.171:3000", //"http://neteasemusic.utools.club",

  article: [],
  articleTemp: [],
  userCollect: [],
  userArticle: [],
  artype: [],
  userList: [],
  musicUser: {
    userId: 347230,
  },
  user: {},
  urls: [],
  ifEdite: false,

  //音乐相关数据
  audio: {
    songsInfo: {},
    // 该字段是音频是否处于播放状态的属性
    playing: false,
    // 音频当前播放时长
    currentTime: 0,
    // 音频最大播放时长
    maxTime: 0,
    sliderTime: 0,
    soundValue: 0,

  },
  musicData: [],
  musicAblumData: [],
  musicAlbum: [],
  musicPlayList: [{
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
  }],
  songAlbumPic: {},
  songsList: [],
  albumNowIs: {},
  musicUrl: {
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
  sideMusicFlag: false,

})


export const mutations = {



  //音乐相关方法
  // 播放与暂停
  starOrpause(state) {
    state.sideMusicFlag = !state.sideMusicFlag

  },
  // 当音频播放
  onPlay(state) {
    state.audio.playing = true
  },
  // 当音频暂停
  onPause(state) {
    state.audio.playing = false
  },

  // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
  onTimeupdate(state, res) {
    // console.log('timeupdate')
    state.audio.currentTime = res.target.currentTime
    state.audio.sliderTime = parseInt(
      (state.audio.currentTime /
        state.audio.maxTime) *
      100
    )
  },
  // 当加载音蘋流元数据完成后，会触发该事件的回调函数
  // 音蘋元数据主要是音蘋的长度之类的数据
  onLoadedmetadata(state, res) {
    // console.log('loadedmetadata')
    // console.log(res)
    state.audio.maxTime = parseInt(res.target.duration)
  },


  //切换上一曲
  lastMusic(state) {
    state.musicPlayList.forEach((element, index) => {
      if (element.id === state.musicUrl.id) {
        if (index - 1 >= 0) {
          state.audio.songsInfo = state.musicPlayList[index - 1]
          this.commit(
            'playlistPlay',
            state.musicPlayList[index - 1]
          )
        } else {

          state.audio.songsInfo = state.musicPlayList[
            state.musicPlayList.length - 1
          ]
          this.commit(
            'playlistPlay',
            state.musicPlayList[
              state.musicPlayList.length - 1
            ]
          )
        }
      }
    })
  },
  //切换下一曲
  nextMusic(state) {
    state.musicPlayList.forEach((element, index) => {
      if (element.id === state.musicUrl.id) {
        if (index + 1 === state.musicPlayList.length) {
          state.audio.songsInfo = state.musicPlayList[0]
          this.commit(
            'playlistPlay',
            state.musicPlayList[0]
          )
        } else {
          state.audio.songsInfo = state.musicPlayList[index + 1]
          this.commit(
            'playlistPlay',
            state.musicPlayList[index + 1]
          )
        }
      }
    })
  },

  //


  //获取专辑
  changeMusicAblumData(state, e) {
    state.musicAblumData = e
  },

  //当前歌曲信息
  changeSong(state, e) {
    state.musicUrl = e
  },

  //当前专辑信息
  changeAlbum(state, e) {
    state.albumNowIs = e
    console.log()
  },

  //当前专辑里歌曲列表
  changeMusicAlbum(state, e) {
    state.musicAlbum = e

  },

  //当前歌曲列表信息
  changeMusicData(state, e) {
    state.musicData = e
    this.$router.push('/music/songlist')
  },

  // 跟新播放列表
  updateMusicPlayList(state, e) {
    // if (state.musicPlayList.length > 0) {

    if (state.musicPlayList.indexOf(e) < 0) {
      state.musicPlayList.unshift(e)
    }
    // } else {
    //   state.musicPlayList.unshift(e)
    // }
    // console.log(e)

  },


  // 播放歌曲并把歌曲添加到播放列表
  playlistPlay(state, e) {
    // console.log(e)
    state.audio.songsInfo = e
    this.$axios.get(state.musicserve + '/song/url?id=' + e.id).then(res => {
      // console.log(res)
      this.commit('updateMusicPlayList', e)
      this.commit('changeSong', res.data[0])

    })
    this.commit('getSongAlbum', e)
  },



  changeSongAlbumData(state, e) {
    state.songAlbumPic = e.album
    state.songsList = e.songs
  },
  //根据歌曲专辑id获取对应专辑
  // /album?id=38991
  async getSongAlbum(state, e) {
    let res = await this.$axios.get(state.musicserve + '/album?id=' + e.album.id)
    this.commit('changeSongAlbumData', res)
  },

  // 文章搜索 searchKeywords
  searchKeywords(state, key) {
    // state.articleTemp.forEach((e, i) => {

    // })
  },

  readData(state, arr) {
    // console.log(arr)
    state.articleTemp = state.article = arr
  },
  add(state, json) {
    state.article.unshift(json)
  },
  USERLOGIN(state, user) {
    state.user = user;
    console.log(user)
    // 存储登陆信息
    window.sessionStorage.setItem('user', JSON.stringify((user)));
  },
  USEREXIT(state) {
    state.user = {};
    window.sessionStorage.removeItem('user');
  },
  selectArticle(state, e) {
    state.userArticle = []
    state.articleTemp.forEach(Element => {
      if (Element[e.type] === e.data) {
        state.userArticle.push(Element)
      }
    });
  },
  filterUser(state) {

    let artype = [];
    let user = [];
    state.articleTemp.forEach(e => {
      if (e.articleType) {
        artype.push(e.articleType);
      }
      if (e.userName) {
        user.push(e.userName);
      }
    });
    state.artype = Array.from(new Set(artype));
    state.userList = Array.from(new Set(user));

  },

  articleEdite(state) {
    state.ifEdite = true
  },

  editArticle(state, item) {
    Object.assign(
      state.article[item.index],
      item.item
    )
    this.$axios.post('/api/update', item.item).then(res => {
      console.log(res)
    })
  },

  deleteArticle(state, item) {
    if (state.user.userName === item.userName) {
      state.article.forEach((element, e) => {
        if (element._id === item._id) {
          this.$axios
            .post("/api/delete", {
              _id: state.article.splice(e, 1)[0]._id
            })
            .then(res => {
              console.log(res.data);
            })
            .catch(err => [console.log(err)]);
        }
      });
    } else {
      alert('您不能删除别人的文章哦')
    }
  },
  showArticleMsg(state, item) {
    // console.log(item)
    state.article.forEach((element) => {
      if (element._id === item.id) {
        element.msgFlag = !element.msgFlag
        // console.log(item.res)
        if (item.res) {
          element.msgData = item.res
          // console.log(element)
        }

      }
    })
  },
  addArticleCollect(state, item) {
    if (state.user.userName) {
      state.article.forEach((element) => {
        if (element._id === item._id) {
          if (element.collect.indexOf(state.user.userName) > -1) {
            alert('你已经收藏了呢', )
          } else {

            element.collect.push(state.user.userName)
            let _id = item._id
            let Json = {
              _id,
              collect: element.collect
            }
            this.$axios.post('/api/update', Json).then(res => {
              console.log(res.data)
            })
          }
        }
      })
    } else {
      alert('你还没登录呢')
    }

  },
  addArticleLike(state, item) {
    state.article.forEach((element) => {
      if (element._id === item._id) {
        element.like++
        let _id = item._id
        let n = element.like
        let Json = {
          _id,
          like: n
        }
        this.$axios.post('/api/update', Json).then(res => {
          console.log(res.data)
        })

      }
    })
  },
  addArticleReply(state, item) {

    state.article.forEach((element) => {
      console.log(item.articleId)
      if (element._id === item.articleId) {
        element.msgData.unshift(item)
        element.reply++
        this.$axios.post('/api/update', {
          _id: element._id,
          reply: element.reply
        }).then(res => {
          // console.log(res.data)
        })
      }
    })
  },

  changeArticle(state, item) {
    state.ifEdite = false
    state.article.forEach((element) => {
      if (element._id === item.id) {
        element.blocks = item.data
        this.$axios
          .post('/api/update', element)
          .then(res => {
            // console.log(res)
            this.$router.push('/')

          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  },
  imgData(state, data) {
    state.urls = data
  },
  imgAddLike(state, id) {
    state.urls.forEach((e) => {
      if (e._id === id) {
        this.$axios.post('/api/epicture', {
          _id: id,
          likeCount: e.likeCount++
        })
      }
    })
  },
  imgAddUnlike(state, id) {
    state.urls.forEach((e) => {
      if (e._id === id) {
        this.$axios.post('/api/epicture', {
          _id: id,
          unlikeCount: e.unlikeCount++
        })
      }

    })
  },
  imgDelete(state, id) {
    state.urls.forEach((e, i) => {
      if (e._id === id) {
        this.$axios.post('/api/dpicture', {
          _id: state.urls.splice(i, 1)[0]._id,
          likeCount: e.likeCount++
        })
      }

    })
  },
  imgCollectfunc(state) {
    let arr = [];
    state.urls.forEach((e) => {
      if (e.user_id.indexOf(state.user.id) > -1) {
        // console.log(e)

        arr.unshift(e)

      }
    })
    state.userCollect = arr
  },

  userCollectFunc(state) {
    let arr = [];
    state.article.forEach((e) => {
      if (e.collect.indexOf(state.user.userName) > -1) {
        // console.log(e)

        arr.unshift(e)

      }
    })
    state.userCollect = arr
  }


}

export const actions = {
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


//http://39.105.168.171:3389/blog
