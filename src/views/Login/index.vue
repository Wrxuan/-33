<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form ref="form" @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobilerules"
      >
        <template #label><span class="toutiao toutiao-shouji"></span></template
      ></van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label
          ><span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <van-button
            class="btn"
            block
            type="default"
            size="small"
            round
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="3 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobilerules, codeRules } from './rule'
// 引入API
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobilerules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        // 登录
        const { data } = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$roast.fail(error.response.data.message)
        } else {
          // console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
  .btn {
    height: 0.64rem;
    background-color: #eee;
    color: #a58594;
  }
}
</style>
