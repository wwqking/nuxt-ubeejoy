<template>
<!--这是首页的导航栏-->
    <div class="navBar">
      <div class="barWrap">
       <nuxt-link :to="$i18n.path('')" class="l icon">
         <img src="~assets/img/logoUb.png"/>
       </nuxt-link>
       <div class="clearfix themeList l">
         <nuxt-link :to="$i18n.path('')" class="themeItm l" exact>
              <p class="theme">{{$t('navbar.games')}}</p>
              <p class="smalltheme" v-if="$t('navbar.smallga')!==''">{{$t('navbar.smallga')}}</p>
         </nuxt-link>
          <span class="l fenge"></span>
         <nuxt-link v-if="!getLoginStatus" :to="$i18n.path('login')" class="themeItm l" exact>
             <p class="theme">{{$t('navbar.recharge')}}</p>
             <p class="smalltheme" v-if="$t('navbar.smallre')!==''">{{$t('navbar.smallre')}}</p>
         </nuxt-link>
         <nuxt-link v-if="getLoginStatus" :to="$i18n.path('recharge')" class="themeItm l" exact>
             <p class="theme">{{$t('navbar.recharge')}}</p>
             <p class="smalltheme" v-if="$t('navbar.smallre')!==''">{{$t('navbar.smallre')}}</p>
         </nuxt-link>
          <span class="l fenge"></span>
         <nuxt-link :to="$i18n.path('about')" class="themeItm l" exact>
             <p class="theme">{{$t('navbar.about')}}</p>
             <p class="smalltheme" v-if="$t('navbar.smallab')!==''">{{$t('navbar.smallab')}}</p>
         </nuxt-link>
       </div>
       <ul class="media lil clearfix r">
           <li class="icon facebook">
             <a href="#">
               <img src="~assets/img/share_facebook.png" :title="$t('others.soon')"/>
             </a>
           </li>
           <li class="icon youtube">
             <a href="#">
               <img src="~assets/img/share_youtube.png" :title="$t('others.soon')"/>
             </a>
           </li>
       </ul>
       </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
		getLoginStatus() {
			return this.$store.state.loginStatus;
		}
	},
};
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
  color: #f8ae1a !important;
}
.navBar {
  width: 100%;
  height: 90px;
  background: #ffffff;
  position: relative;
  .barWrap {
    width: 1200px;
    margin: 0 auto;

    .icon {
      width: 179px;
      height: 62px;
      margin-top: 13px;

      img {
        width: 100%;
      }
    }

    .themeList {
      margin-left: 91px;
      margin-top: 7px;
      .themeItm {
        text-align: center;
        margin: 8px 33px 0;
        padding-top: 20px;
        color: #333333;
        text-decoration: none !important;
        .theme {
          font-size: 16px;
        }
        .smalltheme {
          font-size: 14px;
        }
      }
      .themeItm:hover {
        border-top: 1px solid #f8ae1a;
      }
      .themeItm:hover p {
        color: #f8ae1a;
      }

      .fenge{
        display: inline-block;
        height: 31px;
        width: 1px;
        background:#bfbfbf;
        margin-top: 23px;
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
