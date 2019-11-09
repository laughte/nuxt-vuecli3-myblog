let Router = require('koa-router');
const Passport = require('../utils/passport.js')
const DB = require('./mongodb');


const router = new Router({
  prefix: '/api' // 路由前缀
})

router //bolgcontent
  .get('/myblog', async ctx => {
    // let pageSize = 10
    // let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
    // let skip = (page - 1) * pageSize
    let res = await DB.find('mynewblog', ctx.request.body);
    // console.log(ctx.request.body)
    ctx.body = res
  })

  .post('/insert', async ctx => {
    let res = await DB.insert('mynewblog', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err)
    }
  })
  .post('/update', async ctx => {
    let e = ctx.request.body
    let id = e._id
    delete (e._id)
    delete (e.countflag)

    // console.log(e)
    // delete(e.time)
    // console.log(id, e)

    let res = await DB.update('mynewblog', {
      _id: DB.setObjectId(id)
    }, e);
    // console.log(res)
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }


  })
  //删除blog
  .post("/delete", async ctx => {
    let id = ctx.request.body._id;
    // let artid = ctx.request.body.articleId
    // let msgres = await DB.delete('msgboard', {
    //   articleId: artid
    // })

    let res = await DB.update('mynewblog', {
      _id: DB.setObjectId(id)
    }, {
      delete: true
    })
    if (res.result.ok) { // && msgres.result.ok
      ctx.body = "删除成功"
    }
  })


  // msgboard
  .post('/msgSearch', async ctx => {
    let res = await DB.find('msgboard', ctx.request.body);
    ctx.body = res
  })

  .post('/msgInsert', async ctx => {
    let res = await DB.insert('msgboard', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err)
    }
  })

  .post('/msgUpdate', async ctx => {
    let id = ctx.request.body.id;
    let like = ctx.request.body.like;
    let res = await DB.update('msgboard', {
      _id: DB.setObjectId(id)
    }, {
      like
    });
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }
  })


  .post('/msgDel', async ctx => {
    let id = ctx.request.body._id
    let res = await DB.remove('msgboard', {
      _id: DB.setObjectId(id)
    });
    try {
      if (res.result.ok) {
        ctx.body = "删除成功";
      }
    } catch (err) {
      console.log(err)
    }
  })

// 用户登录注册api

router.get('/getUser', async (ctx) => {
  // 判断用户是否登录，Passport内置的
  if (ctx.isAuthenticated()) {
    const {
      userName,
      email
    } = ctx.session.passport.user
    ctx.body = {
      userName,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }

})
// 注册
router.post('/signup', async (ctx) => {

  let userName = ctx.request.body.username
  let Email = ctx.request.body.email
  let user = await DB.find('users', {
    username: userName
  })
  let uemail = await DB.find('users', {
    email: Email
  })
  // console.log(user)
  if (user.length === 0 && uemail.length === 0) {
    // 创建新用户
    let res = await DB.insert('users', ctx.request.body);
    console.log(res)
    try {
      if (res.result.ok) {
        ctx.body = {
          status: 200,
          data: {
            "userName": res.ops[0].username,
            "id": res.ops[0]._id,
            "email": res.ops[0].email,
            "imgsrc": res.ops[0].imgsrc,
            "msgFlag": res.ops[0].delflag,
          },
          msg: '注册成功'
        }
      }
    } catch (error) {
      ctx.body = {
        status: 0,
        msg: '注册失败'
      }
      console.log(error);
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '该用户名或者邮箱已被注册,请从新输入!'
    }
  }

})
// 登录
router.post('/signin', async (ctx, next) => {
  let res = await DB.find('users', ctx.request.body);
  console.log(res)
  try {

    ctx.body = {
      status: 200,
      data: {
        "userName": res[0].username,
        "id": res[0]._id,
        "email": res[0].email,
        "imgsrc": res[0].imgsrc,
        "delflag": res.delflag
      },
      msg: '登录成功'
    }

  } catch (error) {
    ctx.body = {
      status: 0,
      msg: '登录失败'
    }
    console.log(error);
  }

  // 图片上传
  router.post('/upload', async ctx => {
    console.log(ctx)
  })

  // 本地登录
  // return Passport.authenticate('local', function (err, user, info, status) {
  //   if (err) {
  //     ctx.body = {
  //       status: -1,
  //       msg: err
  //     }
  //   } else {
  //     if (user) {
  //       ctx.body = {
  //         status: 200,
  //         msg: '登录成功',
  //         user: {
  //           userName: user.userName,
  //           email: user.userPwd
  //         }
  //       }
  //       // Passport中间件带的ctx.login
  //       return ctx.login(user)
  //     } else {
  //       ctx.body = {
  //         status: 0,
  //         msg: info
  //       }
  //     }
  //   }
  // })(ctx, next)
})

// 退出登录
router.get('/exit', async (ctx) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      status: 200,
      msg: '退出登录'
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// picture服务端api
// picture 数据库查询 api

router
  .get('/picture', async ctx => {

    let res = await DB.find('picture', ctx.request.body, 60);
    // console.log(res);
    ctx.body = res

  })

  .post('/searchArray', async ctx => {

    let res = await DB.find('picture', ctx.request.body);

    ctx.body = res

  })

  //  picture写入api
  .post('/wpicture', async ctx => {

    let res = await DB.insert('picture', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = '写入成功';
      }
    } catch (err) {
      console.log(err);
    }
  })
  // picture编辑api
  .post('/epicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.update('picture', {
      '_id': DB.setObjectId(id)
    }, data);

    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err);
    }

  })
  // picture edit for array
  .post('/arrEpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.updateArray('picture', {
      '_id': DB.setObjectId(id)
    }, data);

    ctx.body = {
      status: 200,
      msg: 'ok',
      data:res
    }
  })

  .post('/arrDpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.deleteArray('picture', {
      '_id': DB.setObjectId(id)
    }, data);

    ctx.body = {
      status: 200,
      msg: 'ok',
      data:res
    }
  })

  // picture删除api (是假的删除)
  .post('/fdpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    let delflag = data.delflag;
    let res = await DB.update('picture', {
      '_id': DB.setObjectId(id)
    }, {
      delflag
    });
    try {
      if (res.result.ok) {
        ctx.body = '移除成功;'
      }
    } catch (err) {
      console.log(err)
    }

  })

  // picture删除api (是真的删除)
  .post('/dpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    console.log(id)
    let res = await DB.remove('picture', {
      '_id': DB.setObjectId(id)
    });
    try {
      if (res.result.ok) {
        ctx.body = '删除成功';
      }
    } catch (error) {
      console.log(error);
    }

  })



module.exports = router;
