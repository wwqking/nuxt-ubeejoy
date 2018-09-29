<template>
    <div class="wap_wrap">
       <div class="content">
              <div class="title">{{message.title}}</div>
              <div class="icon"></div>
              <p class="text">{{message.content}}</p>
        </div>
    </div>
</template>

<script>
export default {
  props:['message'],
  data() {
    return {};
  },
  mounted(){
  	let storageLogin = localStorage.login=='true'?true:false;
	this.$store.commit('SET_LOGIN',storageLogin);
  }
};
</script>

<style lang="scss" scoped>
.wap_wrap{
    margin-top:0.14rem;
    .content{
      width: 100%;
      text-align: center;
      background: #fff;
      padding: 1.26rem 0 0 0;

      .title{
        font-size: 0.6rem;
        color: #333333;
      }

      .icon{
        width: 5.52rem;
        height: 0.06rem;
        background: url("~assets/img/wap/fengexian.png") no-repeat center;
        background-size: contain;
        margin:0.3rem auto 0;
      }

      .text{
        width: 9.5rem;
        margin:0 auto;
        padding-top:1.26rem;
        font-size: 0.36rem;
        line-height: 1.5em;
        color: #333333;
      }

    }
}

</style>
