<template>
<!--页脚-->
    <div class="footer">
        <div class="content_wrap">
          <div class="content clearfix">
            <div class="left l">
                <p>Copyright © 2017 uBeeJoy Games All Rights Reserved.</p>
              <nuxt-link :to="$i18n.path('privacy')"   class="privacy">
                {{$t('footer.a1')}}
              </nuxt-link>
              <nuxt-link :to="$i18n.path('terms')" class="terms">
                {{$t('footer.a2')}}
              </nuxt-link>
            </div>
            <div class="middle l">
                <img src="~assets/img/pc_logo.png"/>
            </div>
            <div class="right l">
                <p>{{$t('footer.p1')}}&nbsp;&nbsp;ubeejoybd@aobi.com</p>
                <p>{{$t('footer.p2')}}&nbsp;&nbsp;ubeejoycs@aobi.com</p>
            </div>
           </div>
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
nuxt-link:hover{
    text-decoration: none;
}
.footer{
    width: 100%;
    height: 80px;
    background: #2e2e2e;

    .content_wrap{
        width: 1200px;
        margin:0 auto;
        padding-left: 50px;
        font-size: 14px;
        text-align: center;
        .left{
            width: 352px;
            margin-top:13px;
            margin-right: 91px;
            line-height: 1.5em;
            p{
                color: #7e7d7d;
            }
            a{
                color: #b5b4b4;
            }
            .privacy::after{
                content: '|';
                margin:0 5px;
            }
        }
        .middle{
            width: 187px;
            height: 65px;
            margin-top:8px;
            margin-right: 62px;

            img {
                height:100%;
            }
        }
        .right{
            width: 202px;
            margin-top:13px;
            line-height: 1.5em;
            p{
                color: #aaaaaa;
            }
        }
    }
}
</style>
