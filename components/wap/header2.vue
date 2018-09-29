<template>
    <!--这是其余的头部部分 有返回首页的按钮-->
    <div class="wap_header clearfix">
        <nuxt-link :to="$i18n.path('')"><span class="back l"></span></nuxt-link>
        <nuxt-link :to="$i18n.path('')"><span class="logo l"></span></nuxt-link>
        <span class="side r" @click="openSidebar"></span>
        <sidebar :class="{'opened':open,'closed':!open}" @closed="closeSidebar"></sidebar>
    </div>
</template>

<script>
import request from "~/service";
import sidebar from '~/components/wap/sidebar.vue'
export default {
  components: {
        sidebar
  },
  data() {
      return{
         open:false,
      }
  },
  computed:{
     
  },
  methods:{
     openSidebar(){
        this.open = true;
     },
     closeSidebar(){
        this.open = false;
     }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
    .wap_header{
        width: 100%;
        height: 1.29rem;
        background-color: #f8b833;
        .back{
            width: 0.25rem;
            height: 0.49rem;
            margin: 0.4rem 0 0 0.92rem;
            background: url('~assets/img/wap/back.png') no-repeat center;
            background-size:contain;
        }

        .logo{
            width: 3.48rem;
            height: 1.01rem;
            margin: 0.15rem 0 0 2.52rem;
            background: url('~assets/img/wap/logo.png') no-repeat center;
            background-size:contain;
        }
        .side{
            width: 0.56rem;
            height: 0.4rem;
            margin:0.46rem 0.83rem 0 0;
            background: url('~assets/img/wap/side.png') no-repeat center;
            background-size:contain;
        }
        .closed{
            //关闭侧边栏
            transform: translateX(6.5rem);
            transition: all 1s; 
        }
        .opened{
            //开启侧边栏
            transform: translateX(0);
            transition: all 0.5s; 
        }
    }
</style>
