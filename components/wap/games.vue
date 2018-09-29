<template>
    <div class="wap_gameCenter">
        <div class="tap clearfix">
            <i class="icon l"></i>
            <h2 class="l">{{$t('games.title')}}</h2>
            <a class="more r" href="#"></a>
        </div>
        <div class="content clearfix">
            <div class="game l">
                <div class="gameIcon">
                    <img src="~assets/img/input/game1.jpg"/>
                </div>
                <h3 class="gameTitle">Law of Creation</h3>
                <p class="gameIntro">{{game1|subStr}}</p>
                <a href="http://loc.ubeejoy.com/" target="_blank">{{$t('games.guanwang')}}</a>
            </div>
            <div class="game l">
                <div class="gameIcon">
                    <img src="~assets/img/input/game2.png"/>
                </div>
                <h3 class="gameTitle">Helix Waltz</h3>
                <p class="gameIntro">{{game2|subStr}}</p>
                <a href="http://waltz.ubeejoy.com/" target="_blank">{{$t('games.guanwang')}}</a>
            </div>
            <div class="game l">
                <div class="gameIcon">
                    <img src="~assets/img/input/game3.png"/>
                </div>
                <h3 class="gameTitle">CyberCell: Flux</h3>
                <p class="gameIntro">{{game3|subStr}}</p>
                <a href="http://cybercellflux.ubeejoy.com/" target="_blank">{{$t('games.guanwang')}}</a>
            </div>
            <div class="game l">
                <div class="gameIcon">
                    <img src="~assets/img/input/game4.png"/>
                </div>
                <h3 class="gameTitle">Typoman</h3>
                <p class="gameIntro">{{game4|subStr}}</p>
                <a href="javascript:void(0);" class="disabled" >{{$t('games.guanwang')}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import request from "~/service";
export default {
  components: {},
  data() {
    return {
        game1:"A playable manga.",
        game2:"Fair Lady's Dangerous Waltz",
        game3:"Flux You Enemy Now!",
        game4:"Change Word, Change World！"
    };
  },
  mounted() {
  	let storageLogin = localStorage.login=='true'?true:false;
	this.$store.commit('SET_LOGIN',storageLogin);
  },
  filters:{
      subStr(value) {
        if(value && value.length > 22) {
            return value.substring(0, 22) + "...";
        } else {
            return value || "";
        }
	  },
  }
};
</script>
<style lang="scss" scoped>
  .wap_gameCenter{
      background: #fff;
      margin-top:0.14rem;
      padding:0.65rem 0 0.61rem;

      .tap{
            .icon{
            width: 0.61rem;
            height: 0.39rem;
            background: url('~assets/img/wap/gameCenter_icon.png') center no-repeat;
            background-size: contain;
            margin-left: 0.34rem;
          }
          h2{
            font-size: 0.5rem;
            font-weight: normal;
            color: #171717;
            margin-left: 0.19rem;
          }
          .more{
            width: 0.48rem;
            height: 0.48rem;
            background: url('~assets/img/wap/more.png') center no-repeat;
            background-size: contain;
            margin-right: 0.35rem;
          }
    }
    .content{
        width: 95%;
        margin:0 auto;
        text-align: center;

        .game{
          width: 25%;
          position: relative;

          .gameIcon{
            position: relative;
            width: 1.95rem;
            height: 1.95rem;
            margin:0.6rem auto 0 ;

              img{
                position: absolute;
                left: 0;
                top:0;
                width: 100%;
              }
          }
          h3{
            font-size: 0.36rem;
            margin-top:0.16rem;
            height: 0.72rem;
          }
          p{
            // position: absolute;
            font-size: 12px;
            height: 25px;
            overflow:hidden;
            margin-top:0.34rem;
            color:#747373;
          }
          a{
            display: inline-block;
            width: 80%;
            height: 0.62rem;
            line-height: 0.62rem;
            font-size: 0.3rem;
            background: #f8b833;
            color:#fff;
            border-radius: 0.07rem;
            margin:0.27rem auto 0;
          }
          .disabled{
             background: #6f6f6e;
             cursor: not-allowed;
             opacity: 0.6;
          }
      }

    }

  }
</style>
