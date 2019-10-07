<style scoped>
.v-form {
  width: 450px;
  border-radius: 9px;
  margin: 55px auto;
}
.v-btn {
  margin-right: 15px;
}
</style>

<template>
  <v-form
    class="demo-ruleForm pa-5"
    :color="$store.state.sidecolor"
    ref="form"
    v-model="valid"
    :lazy-validation="lazy"
  >
    <h2>注册</h2>
    <v-avatar size="36px">
      <img alt="Avatar" v-if="user.imgsrc" :src="user.imgsrc" />

      <v-btn icon v-else color="pink" @click="avatarflag=!avatarflag">
        <v-icon else>mdi-plus</v-icon>
      </v-btn>
    </v-avatar>

    <v-card v-show="avatarflag" absolute top right>
      <!-- <v-avatar
        size="36px"
        :key="i"
        class="ma-4"
        @click="imgsrcicon(e)"
        v-for="(e,i) in $store.state.tempurls.slice(Math.random()*10,10)"
      >
        <img alt="Avatar" :src="e.srclist[1]" />
      </v-avatar>-->
      <v-card-actions>
        <v-btn @click="picAvatar()" text>确认</v-btn>
      </v-card-actions>
    </v-card>
    <v-text-field v-model="user.username" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
    <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
    <!-- <v-text-field
      v-model="user.tel"
      :rules="telRules"
      label="tel"
      required
    ></v-text-field>-->
    <v-text-field
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      v-model="user.pass"
      :rules="passRules"
      hint="At least 8 characters"
      counter
      label="password"
      required
      @click:append="show1 = !show1"
    ></v-text-field>

    <!-- <v-text-field
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2"
      v-model="user.checkpass"
      :rules="[passRules.check]"
      label="password"
      required
      @change="checkpassword"
    ></v-text-field>-->
    <p>| 注册表示同意本站的使用规则!</p>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">提交</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">重置</v-btn>
    <router-link
      class="mr-4 v-btn v-btn--contained theme--light v-size--default"
      tag="button"
      to="/"
    >取消</router-link>
    <router-link
      class="mr-4 v-btn v-btn--contained theme--light v-size--default"
      tag="button"
      to="/signin"
    >已有账号?</router-link>
    <v-alert dense outlined v-show="alertflag" :type="isSuccess[issuc]">
      {{
      subtitle
      }}
    </v-alert>

    <!-- <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn> -->
  </v-form>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  data: () => ({
    avatarflag: false,
    show2: false,
    show1: false,
    alertflag: false,
    issuc: false,
    isSuccess: {
      true: 'success',
      false: 'error'
    },
    valid: true,
    subtitle: '',
    user: {
      username: '',
      pass: '',
      email: '',
      age: '',
      tel: '',
      creationdate: new Date(),
      delflag: false,
      imgsrc: ''
    },

    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passRules: [
      v => !!v || 'password is required',
      v => (v && v.length > 5) || 'password must be more than 5 characters'
    ],

    telRules: [
      v => !!v || 'tel is required',
      v => /^1[3456789]\d{9}$/.test(v) || '请输入正确手机号码!'
    ],

    lazy: false,
    checkbox: false
  }),

  methods: {
    imgsrcicon(e) {
      this.user.imgsrc = e.srclist[1]
      console.log(this.user.imgsrc)
    },
    picAvatar() {
      this.avatarflag = false
    },
    validate() {
      // userPwd : CryptoJS.MD5(this.form.userPwd).toString(),
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$axios
          .post('/api/signup', this.user)
          .then(res => {
            this.alertflag = true
            this.subtitle = res.msg
            if (res.status === 200) {
              this.issuc = true
              this.$store.commit('USERLOGIN', res.data)
              setTimeout(() => {
                // this.$router.push({ path: "/" });
                // this.$router.go(-1)
                this.$router.push('/')
              }, 1000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    checkpassword(e) {
      // console.log(e);
      if (e != this.pass) {
        // // console.log("两次输入密码不一致!");
        // let r = [v => false || "两次输入密码不一致!"];
        // this.checkPassRules = [...this.checkPassRules, ...r];
        // console.log(this.checkPassRules);
      } else {
        // let r = [v => false || "两次输入密码不一致!"];
        // this.checkPassRules.splice(1, 1);
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
