<template>
<!--这是隐私政策&合约条款的导航栏-->
    <div class="navBar">
      <div class="barWrap">
       <nuxt-link :to="$i18n.path('')" class="l icon">
         <img src="~assets/img/logoUb.png"/>
       </nuxt-link>
       <div class="clearfix themeList l">
         <nuxt-link :to="$i18n.path('privacy')" class="themeItm l">
             <p class="theme">{{$t('navbar2.privacy')}}</p>
         </nuxt-link>
          <span class="l"></span>
         <nuxt-link :to="$i18n.path('terms')" class="themeItm l">
             <p class="theme">{{$t('navbar2.terms')}}</p>
         </nuxt-link>
       </div>
       <ul class="media lil clearfix r">
           <li class="icon facebook">
             <a href="#">
               <img src="~assets/img/share_facebook.png" title="敬请期待"/>
             </a>
           </li>
           <li class="icon youtube">
             <a href="#">
               <img src="~assets/img/share_youtube.png" title="敬请期待"/>
             </a>
           </li>
       </ul>
       </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.nuxt-link-active{
  color:#f8ae1a !important;
}
.navBar {
  width: 100%;
  height: 90px;
  position: relative;
  background: #ffffff;
  .barWrap {
    width: 1200px;
    margin: 0 auto;

    .icon {
      width: 197px;
      height: 68px;
      margin-top: 12px;

      img {
        width: 100%;
      }
    }

    .themeList {
      margin-left: 64px;
      padding-top:26px;
      .themeItm {
        text-align: center;
        margin: 0 36px;
        padding-top:15px;
        color: #333333;
        text-decoration: none !important;
        .theme {
          font-size: 16px;
        }
        .smalltheme {
          font-size: 14px;
        }
      }
      .themeItm:hover{
        border-top:1px solid #f8ae1a;
      }
      .themeItm:hover p {
        color: #f8ae1a;
      }

      span {
        display: inline-block;
        width: 1px;
        height: 31px;
        background: #bfbfbf;
        margin-top:8px;
      }

    }
    .media {
      .icon {
        width: 20px;
        height: 20px;
        margin:35px 14px;
        img {
          width: 100%;
        }
      }
      .youtube{
          margin-top:33px;
          margin-right: 20px;
      }
    }
  }
}
</style>
