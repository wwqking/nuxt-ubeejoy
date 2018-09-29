<template>
    <!--隐私政策和合约条款的navbar-->
    <div class="wap_navbar">
        <div class="themeList clearfix">
            <nuxt-link :to="$i18n.path('privacy')" exact>
                 <p class="themeItm l">{{$t('navbar2.privacy')}}</p>
            </nuxt-link>
            <nuxt-link :to="$i18n.path('terms')" exact>
                 <p class="themeItm l">{{$t('navbar2.terms')}}</p>
            </nuxt-link>
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
    .wap_navbar{

        .themeList{
            width: 100%;
            height: 1.06rem;
            background: #fff;

            .themeItm{
                width: 50%;
                text-align: center;
                font-size: 0.48rem;
                padding:0.29rem 0 0.23rem;
            }

            .nuxt-link-active .themeItm{
               color: #f8ae1a;
               border-bottom:0.06rem solid #f8ae1a;
            }
        }

    }
</style>
