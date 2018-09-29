<template>
<!--移动端页脚-->
    <div class="wap_footer">
        <p class="p-1">
            <span class="sw">{{$t('footer.p1')}}&nbsp;&nbsp;ubeejoybd@aobi.com</span>
            &nbsp;&nbsp;
            <span class="kf">{{$t('footer.p2')}}&nbsp;&nbsp;ubeejoycs@aobi.com</span>
        </p>
        <p class="p-2">
            Copyright © 2017 uBeeJoy Games All Rights Reserved.
        </p>
        <p class="p-3">
            <nuxt-link :to="$i18n.path('privacy')"  class="privacy">
                {{$t('footer.a1')}}
            </nuxt-link>
            <nuxt-link :to="$i18n.path('terms')" class="terms">
                {{$t('footer.a2')}}
            </nuxt-link>
        </p>
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
.wap_footer{
    // position: absolute;
    // bottom: 0;
    width: 100%;
    height: 2.6rem;
    background: #fff;
    padding: 0.54rem 0 0.57rem 0;
    text-align: center;
    margin-top:0.14rem;

    .p-1{
        color: #999999;
        margin-bottom: 0.21rem;
        font-size: 0.3rem;
    }

    .p-2{
        color: #999999;
        margin-bottom: 0.22rem;
        font-size: 0.3rem;
    }

    .p-3{
        color: #666666;
        font-size: 0.3rem;

        .privacy::after{ 
            content:'|';
            margin: 0 0.3rem;
        }
    }

}
</style>
