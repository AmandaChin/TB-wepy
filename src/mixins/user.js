import wepy from 'wepy'
import { service } from '../config.js'

export default class userMixin extends wepy.mixin {
  /* ============= 工具方法（mixins没法复写，就再写一遍了） ============= */
  isFunction(item) {
    return typeof item === 'function'
  }

  /* ========================== 用户方法 ========================== */
  
  async getWeInfo(){
    // 取缓存信息
    const user = this.$parent.globalData.user
    // 不重复获取用户信息
    if (user && user.nickName) {
      console.log(user)
      return 
    }
    //let code = await wepy.login()
    let res = await wepy.getUserInfo()
    // let openid = await wepy.request({
    //    url:'https://api.weixin.qq.com/sns/jscode2session?appid=wx01aca083ef813dd0&secret=9c86a02eb57bb9a4db4f920036556c10&js_code='+code.code+'&grant_type=authorization_code',
    //    method: 'POST'
    //   })
    this.$parent.globalData.user = res.userInfo
    //this.$parent.globalData.openid = openid.data.openid
    this.$apply()
  }
  //获取用户信息
  async getInfo() {
    // 取缓存信息
    const user = this.$parent.globalData.user
    // 不重复获取用户信息
    if (user && user.nickName) {
      console.log(user)
      return 
    }
    // 首次获取用户信息
    var auth = 0
    let code = await wepy.login()
    let res = await wepy.getUserInfo()
    let openid = await wepy.request({
      url:'https://api.weixin.qq.com/sns/jscode2session?appid=wx01aca083ef813dd0&secret=9c86a02eb57bb9a4db4f920036556c10&js_code='+code.code+'&grant_type=authorization_code',
      method: 'POST'
    })
    this.userlogin(openid.data.openid)
    let id = await wepy.request({
        url: service.getUserID, //开发者服务器接口地址",
        data: {
          "Account": openid.data.openid
        }, //请求的参数",
        method: 'POST'
      })
    this.$parent.globalData.user = res.userInfo
    console.log(this.$parent.globalData.user)
    this.$parent.globalData.openid = openid.data.openid
    this.$parent.globalData.id = id.data.UserID
    console.log('[globalID]:'+this.$parent.globalData.id)
    this.$apply()
    return 
  }
  
  //获取用户在数据库中的信息
  async getInfoInDB(id){
    const userinfo = this.$parent.globalData.userinfo
    // 不重复获取用户存在数据库中的信息
    if (userinfo) {
      console.log(userinfo)
      return 
    }
    let res = await wepy.request({
      url: service.host+'/info',
      data:{
        'UserID':id
      },
      method:'GET'
    })
    this.$parent.globalData.userinfo = res.data
  }
 
  

  //
  _wxChooseAddress(callback) {
    wepy.chooseLocation({
      success: (res) => {
        console.log('wepy.chooseLocation.success:', res)
        // 缓存用户信息
        const address = this.$parent.$updateGlobalData('address', res.address)
        this.isFunction(callback) && callback(address)
        this.$apply()
      },
      fail: (res) => {
        console.log('wepy.getUserInfo.fail:', res)
        // 用户拒绝授权:填充默认数据
        const address = this.$parent.$updateGlobalData('address', null)

        // 串行回调
        this.isFunction(callback) && callback(user)
        this.$apply()
      }
    })
  }

  // 提示用户开启授权
  _wxAuthModal(callback) {
    // 先判断是否支持开启授权页的API
    wx.openSetting && wx.showModal({
      title: '授权提示',
      content: '时间银行希望获得以下权限：\n · 获取您的公开信息（昵称、头像等）',
      confirmText: '去授权',
      cancelText: '先不授权',
      success: (res) => {
        if (res.confirm) {
          console.log('_wxAuthModal.showModal: 用户点击确定', res)
          this._wxOpenSetting(callback)
        }
      }
    })
  }

  // 打开授权页
  _wxOpenSetting(callback) {
    wx.openSetting && wx.openSetting({
      success: ({authSetting}) => {
        console.log('wx.openSetting.success', authSetting)
        if (authSetting['scope.userInfo']) {
          // 用户打开设置，重新获取信息
          this._wxUserInfo(callback)
        }
      }
    })
  }
}


