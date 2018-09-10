/* ========================================================
                        小程序配置文件
======================================================== */

// 域名
// var host = 'http://127.0.0.1:3000';
//var host = 'https://wxapp.thunf.cn';
var host = 'http://localhost:3000/api';

// 下面的地址配合云端 Demo 工作
export const service = {
  // 列表接口 GET
  list: `https://wxapp.thunf.cn/bookmall/list`,

  // 筛选页接口 GET 
  tags: `https://wxapp.thunf.cn/bookmall/tags`,

  // 假装有收藏接口 POST
  collect: `https://wxapp.thunf.cn/bookmall/list`,
  
  //登录
  log: `${host}/allUserLogin`,

  //注册
  register: `${host}/userRegister`,
  
  //获取用户id
  getUserID: `${host}/getUserIDbyAccount`,

  //获取全部需求信息
  getAllDemand: `${host}/getAllDemand`,


  // 主域
  host
}

export default {
  service
}