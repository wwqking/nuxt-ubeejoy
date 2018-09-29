import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
// axios 配置
axios.defaults.timeout = 5000;
//axios.defaults.headers['Authorization'] = Cookies.get('token');
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.baseURL = 'https://icps.suning.com';

//POST传参序列化
axios.interceptors.request.use((config) => {
//	if(Cookies.get('token')){
//		config.headers['Authorization'] = Cookies.get('token');
//	}
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.status != "200"){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }else if(res.data.code == "401"){
    	//清空缓存
//		Cookies.set('token', '');
//		Cookies.set('user', '');
//  	router.push('/login');
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export function fetchGet(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
    /**
     * 用户登录
     */
    Login(url,param) {
        return fetchPost(url,param)
    },
    /**
     * 用户登出
     */
    logOut(url,param) {
        return fetchPost(url,param)
    },
    //commonGET
    commonGet(url,param){
    	return fetchGet(url,param)
    },
    //commonGET
    commonPOST(url,param){
    	return fetchPost(url,param)
    },
    //查询账套bYID
    getBook(url,param){
    	return fetchGet(url,param)
    },
    /**
     * 组织架构
     */
    Org(url) {
        return fetchGet(url)
    },

    /**
     * 发送注册验证码
     */
     RegistVerifiCode(tellphone) {
         return fetch('/users/api/registVerifiCode', {tellphone: tellphone})
     },

    /**
     * 获取约跑步列表
     */
    SportsList() {
        return fetch('/api/sportList')
    },

    /**
     * 获取约出行列表
     */
    TravelsList() {
        return fetch('/api/travelList')
    },

    /**
     * 获取约跑步详情
     */
    SportsDetail(id) {
        return fetch('/api/sportDetail', {sportId: id})
    },

    /**
     * 获取约出行详情
     */
    TravelsDetail(id) {
        return fetch('/api/travelDetail', {travelId: id})
    },

    /**
     * 获取出行活动点击次数
     */
    travelClicks(id) {
        return fetch('/api/travelClickNum', {travelId: id})
    },

    /**
     * 获取用户信息
     */
    UserInfo(id) {
        return fetch('/users/api/userInfo', {userId: id})
    },

    /**
     * 获取用户发布约行个数
     */
     getPubTotravelNum(id) {
         return fetch('/users/api/getPubTotravelNum', {userId: id})
     },

     /**
      * 获取用户自己发布的约行
      */
      getMyTravel(id) {
          return fetch('/users/api/myTravel', {userId: id})
      },

    /**
     * 发布约行活动
     */
    PostTravel(params) {
        return fetch()
    },

    /**
     * 获取全国JSON数据
     */
     getAddressJson() {
         return fetch('/api/address')
     }
}
