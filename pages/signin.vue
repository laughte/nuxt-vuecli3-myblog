<style scoped>
.signin {
  width: 450px;
  border-radius: 9px;
  margin: 55px auto;
}
</style>
<template>
  <div class="signin">
    <v-form
      status-icon
      ref="form"
      label-width="0px"
      class="demo-ruleForm pa-5"
      v-model="valid"
      :lazy-validation="lazy"
    >
      <h2>登录</h2>
      <!-- <el-form-item prop="username"> -->
      <v-text-field v-model="user.username" :counter="10" label="Name" :rules="nameRules" required></v-text-field>
      <!-- </el-form-item> -->
      <!-- <el-form-item prop="pass"> -->
      <v-text-field
        type="password"
        label="Password"
        v-model="user.pass"
        :rules="passRules"
        required
      ></v-text-field>
      <!-- </el-form-item> -->

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
        to="/signup"
      >没有账号?</router-link>
      <v-alert dense outlined v-show="alertflag" :type="isSuccess[issuc]">
        {{
        subtitle
        }}
      </v-alert>
    </v-form>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
import { mapActions } from 'vuex'
export default {
  name: 'signin',
  data: () => ({
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
      pass: ''
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    passRules: [v => !!v || 'Pass is required'],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
    lazy: false
  }),
  methods: {
    ...mapActions(['userlogin']),
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$axios
          .post('/api/signin', this.user)
          .then(res => {
            // console.log(res)
            this.alertflag = true
            this.subtitle = res.msg
            if (res.status === 200) {
              this.issuc = true
              this.userlogin(res.data)
              setTimeout(() => {
                this.$router.push('/')
                // this.$router.go(-1)
              }, 600)
            }
            // let params = {
            //   delflag: "false",
            //   userId: this.$store.state.datacache.userId
            // };
            // this.$store.commit("readDataFromdb", params);
          })
          .catch(err => {
            console.log(err)
          })
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
