//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    items: [
      {
        "text": "上传素材",
        "url": "../publish/publish"
      },
      {
        "text": "收藏",
        "url": "../publish/publish"
      }
    ],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageUrl: "https://ddxce.com:443/file/d73b04b0e696b0945283defa3eee4538"
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  uploadFile: function (e) {
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        const name = tempFilePaths[0].name
        wx.uploadFile({
          url: 'https://ddxce.com/singleupload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            filenames: name
          },
          success(res) {
            console.log(res.data)
          },
          fail(res) {
            console.info('fail');
          }
        })
      }
    })
  },
  downloadFile: function (e) {
    wx.downloadFile({
      url: 'https://ddxce.com/file/d73b04b0e696b0945283defa3eee4538',
      success(res) {
        if (res.statusCode === 200) {
          console.info(res.tempFilePath)
        }
      }
    })
  },
  pushData: function (e) {
    wx.request({
      url: 'https://ddxce.com/setkv',
      method: 'POST',
      data: {
        key: 'temp',
        value: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  pullData: function (e) {
    wx.request({
      url: 'https://ddxce.com/getkv',
      method: 'POST',
      data: {
        key: 'temp'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  }
})
