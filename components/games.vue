<template>
    <div class="gameCenter">
      <div class="wrap">
        <div class="title">
            <div class="icon"></div>
            <h2>{{$t('games.title')}}</h2>
            <h5 v-if="$t('games.smalltitle')">{{$t('games.smalltitle')}}</h5>
        </div>
        <div class="content clearfix">
            <div class="game l">
                <div class="gameIcon">
                    <img src="~assets/img/input/game1.jpg"/>
                </div>
                <h3 class="gameTitle">Law of Creation</h3>
                <p class="gameIntro">A playable manga</p>
                <a href="http://loc.ubeejoy.com/" target="_blank">{{$t('games.guanwang')}}</a>
            </div>
            <div class="game l">
                <div class="gameIcon">
                    <img src="~assets/img/input/game2.png"/>
                </div>
                <h3 class="gameTitle">Helix Waltz</h3>
                <p class="gameIntro">Fair Lady's Dangerous Waltz</p>
                <a href="http://waltz.ubeejoy.com/" target="_blank">{{$t('games.guanwang')}}</a>
            </div>
            <div class="game l">
                <div class="gameIcon">
                    <img src="~assets/img/input/game3.png"/>
                </div>
                <h3 class="gameTitle">CyberCell: Flux</h3>
                <p class="gameIntro">Flux You Enemy Now!</p>
                <a href="http://cybercellflux.ubeejoy.com/" target="_blank">{{$t('games.guanwang')}}</a>
            </div>
            <div class="game l">
                <div class="gameIcon">
                    <img src="~assets/img/input/game4.png"/>
                </div>
                <h3 class="gameTitle">Typoman</h3>
                <p class="gameIntro">Change Word, Change World！</p>
                <a href="javascript:void(0);" class="disabled" >{{$t('games.guanwang')}}</a>
            </div>
        </div>
        <a class="more" href="#">{{$t('games.more')}}</a>
    </div>
    </div>
</template>

<script>
import request from "~/service";
export default {
  components: {},
  data() {
    return {
    };
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
a{
  text-decoration: none !important;
}
.gameCenter{
  position: relative;
  background: #f1f0f0;
  padding:65px 0 68px;

  .wrap{
    width: 1200px;
    margin: 0 auto;

      .icon{
        width:38px; 
        height:25px;
        background: url('~assets/img/pc_gameCenter_icon.png') no-repeat center;
        background-size: contain;
        margin:0 auto 8px;
      }
      .title{
        text-align: center;
        margin:0 auto 5%;

        h2{
          font-size: 36px;
          color: #171717;
          font-weight: 400;
        }
        h5{
          font-size: 14px;
          color: #6f6f6e;
          margin:9px auto 71px;
        }
      }
      .content{
          width: 1200px;
          margin:0 auto;
          background: #fff;
          text-align: center;

        .game{
          width: 25%;
          border:1px solid #d2d2d2;

          .gameIcon{
            position: relative;
            width: 65%;
            height: 0;
            padding-top:65%;
            margin:48px auto 19px;

              img{
              	height: 100%;
                position: absolute;
                left: 0;
                top:0;
                width: 100%;
              }
          }
          .disabled{
             background: #6f6f6e;
             cursor: not-allowed;
             opacity: 0.6;
          }
        }

        .game:nth-child(1),.game:nth-child(2),.game:nth-child(3){
          border-right: 1px solid transparent;
        }

        h3{
          font-size: 24px;
          font-weight: 400;
          margin:0 auto 13px;
        }
        p{
          font-size: 14px;
          color:#747373;
          white-space: nowrap;
          margin:0 auto 20px;
        }
        a{
          width: 60.13%;
          height:51px;
          line-height: 51px;
          font-size: 24px;
          background: #f8b833;
          color:#fff;
          display:inline-block;
          text-align: center;
          border-radius: 7px;
          margin:0 auto 37px;
        }
    }
    .more{
        width: 340px;
        height: 35px;
        font-size: 16px;
        line-height: 35px;
        display:block;
        background:url('~assets/img/pc_more.png') no-repeat center;
        background-size: contain;
        margin: 71px auto 0;
        text-align: center;
        color:#fff;
    }
  }
}
</style>
