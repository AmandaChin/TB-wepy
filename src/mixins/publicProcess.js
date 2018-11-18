import wepy from 'wepy'
import { service } from '../config.js'
import cityinfo from '../pages/login/cityInfo.js'

export default class userMixin extends wepy.mixin {
    //富文本转普通文本
    convertHtmlToText(inputText) {
         var returnText = "" + inputText;
         returnText = returnText.replace(/<\/div>/ig, '\r\n');
         returnText = returnText.replace(/<\/li>/ig, '\r\n');
         returnText = returnText.replace(/<li>/ig, '  *  ');
         returnText = returnText.replace(/<\/ul>/ig, '\r\n');
         //-- remove BR tags and replace them with line break
         returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");
     
         //-- remove P and A tags but preserve what's inside of them
         returnText = returnText.replace(/<p.*?>/gi, "\r\n");
         returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
    
        //-- remove all inside SCRIPT and STYLE tags
        returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
        returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
        //-- remove all else
        returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
    
        //-- get rid of more than 2 multiple line breaks:
        returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");
    
        //-- get rid of more than 2 spaces:
        returnText = returnText.replace(/ +(?= )/g, '');
    
        //-- get rid of html-encoded characters:
        returnText = returnText.replace(/ /gi, " ");
        returnText = returnText.replace(/&/gi, "&");
        returnText = returnText.replace(/"/gi, '"');
        returnText = returnText.replace(/</gi, '<');
        returnText = returnText.replace(/>/gi, '>');

        //去掉回车换行        
        returnText = returnText.replace(/[\r\n]/g,"");        
        
        return returnText;
      }
      //时间戳换时间
      formatDateTime(inputTime) {
        var date = new Date(inputTime)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        var minute = date.getMinutes()
        var second = date.getSeconds()
        minute = minute < 10 ? ('0' + minute) : minute
        second = second < 10 ? ('0' + second) : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }

      //FormatDate 把时间延后8小时
      formatDate(inputDate, fmt) {
        var date = new Date(inputDate)
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        const o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (const k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
          }
        }
        return fmt
      }
      
      padLeftZero(str) {
        return ('00' + str).substr(str.length)
      }

      //FormatDateX 
      formatDatex(inputDate, fmt) {
        var date = new Date(inputDate)
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        console.log("date:"+date)
        var hours = date.getHours()
        var days = date.getDate()
        var month = date.getMonth() + 1
        var year = date.getFullYear()
        if (hours - 8 < '0') {
          hours = hours + 16
          days = days - 1
        } else {
          hours = hours - 8
        }
      
        if (days == ' ') {
          if (month === '2' || month === '4' || month === '6' || month == '8' || month == '9' || month == '11' || month == '1') {
            days = '31'
            month = month - 1
          } else if (month === '3') {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
              days = '29'
              month = month - 1
            } else {
              days = '28'
              month = month - 1
            }
          } else {
            days = '30'
            month = month - 1
          }
        }
      
        const o = {
          'M+': month,
          'd+': days,
          // 'd+': date.getDate(),
          'h+': hours,
          // 'h+': date.getHours() -8,
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (const k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
          }
        }
        return fmt
      }

      //找地址
      findPosIndex(position){
        var posIndex = [0,0,0]
        var info = cityinfo.info.cityInfo;
        for(var i=0;i<info.length;i++){
          if(info[i].l == position[0]){
            posIndex[0] = info[i].v
            var city = info[i].c
            for(var j=0;j<city.length;j++){
              if(city[j].l == position[1]){
                posIndex[1] = city[j].v
                var district = city[j].c
                for(var k=0;k<district.length;k++){
                  if(district[k].l == position[2]){
                    posIndex[2] = district[k].v
                    break
                  }
                }
              }
            }
          }
        }
        return posIndex
      }
      //根据地址ID找对应的名字
      findPosition(posIndex){
        var position = ['','','']
        var info = cityinfo.info.cityInfo;
        for(var i=0;i<info.length;i++){
          if(info[i].v == posIndex[0]){
            position[0] = info[i].l
            var city = info[i].c
            for(var j=0;j<city.length;j++){
              if(city[j].v == posIndex[1]){
                position[1] = city[j].l
                var district = city[j].c
                for(var k=0;k<district.length;k++){
                  if(district[k].v == posIndex[2]){
                    position[2] = district[k].l
                    break
                  }
                }
              }
            }
          }
        }
        return position
      }
}