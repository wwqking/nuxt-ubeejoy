<template>
    <div class="wap_navbar">
        <div class="themeList clearfix">
            <nuxt-link :to="$i18n.path('')" exact>
                <p class="themeItm l"  @click="changeLinkIndex(0)" >
                        {{$t('navbar.games')}}
                </p>    
            </nuxt-link>
            <nuxt-link v-if="!getLoginStatus" :to="$i18n.path('my')" exact >
                <p class="themeItm l" @click="changeLinkIndex(1)">
                        {{$t('navbar.recharge')}}
                </p>
            </nuxt-link>
            <nuxt-link v-if="getLoginStatus" :to="$i18n.path('recharge')" exact >
                <p class="themeItm l" @click="changeLinkIndex(1)">
                        {{$t('navbar.recharge')}}
                </p>
            </nuxt-link>
            <nuxt-link :to="$i18n.path('about')"  exact>
                <p class="themeItm l" @click="changeLinkIndex(2)">
                    {{$t('navbar.about')}}
                </p>
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
        linkIndex:0
    };
  },
  methods:{
      changeLinkIndex(index){
          this.linkIndex = index;
      }
  },
  computed: {
	getLoginStatus() {
		return this.$store.state.loginStatus;
	}
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
                width: 33.33%;
                text-align: center;
                font-size: 0.48rem;
                padding:0.29rem 0 0.23rem;
            }

            .active-link .themeItm{
                color: #f8ae1a;
                border-bottom:0.06rem solid #f8ae1a;
            }
        }

    }
</style>
