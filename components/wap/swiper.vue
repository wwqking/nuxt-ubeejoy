<template>
  <div v-swiper:mySwiper="swiperOption" class="wap_swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide slide1"></div>
      <div class="swiper-slide slide2"></div>
      <div class="swiper-slide slide3"></div>
      <div class="swiper-slide slide4"></div>
    </div>

    <div style="bottom:2px" class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
import request from "~/service";
export default {
  components: {},
  data() {
    return {
      swiperOption: {
          autoplay:true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable:true,
          }
      }
    }
  },
};
</script>

<style lang="scss">
    .wap_swiper{
       margin-top: 0.14rem;
       .swiper-wrapper{
         width: 100%;
         

         .swiper-slide{
             width: 100%;
             height: 4.5rem;
            &.slide1{
                background: url('~assets/img/wap/input/01.jpg') no-repeat top center;
                background-size: cover;
             }
            &.slide2{
                background: url('~assets/img/wap/input/02.jpg') no-repeat top center;
                background-size: cover;
             }
            &.slide3{
                background: url('~assets/img/wap/input/03.jpg') no-repeat top center;
                background-size: cover;
             }
            &.slide4{
                background: url('~assets/img/wap/input/04.jpg') no-repeat top center;
                background-size: cover;
             }
           
         }
       }

       .swiper-pagination-bullet{
          width: 0.2rem;
          height: 0.2rem;
          background-color: #ffffff;
          opacity: 0.5;
       }
       .swiper-pagination-bullet.swiper-pagination-bullet-active{
          background-color: #f8b833;
       }
    }
</style>



