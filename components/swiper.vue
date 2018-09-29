<template>
	<div v-swiper:mySwiper="swiperOption"  class="pc_swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide slide1"></div>
        <div class="swiper-slide slide2"></div>
        <div class="swiper-slide slide3"></div>
        <div class="swiper-slide slide4"></div>
      </div>

    <div style="bottom:-3px;" class="swiper-pagination swiper-pagination-bullets"></div>

		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div> 
</template>

<script>
import request from "~/service";
export default {
  components: {},
  data() {
    return {
      swiperOption: {
//      loop: true,
//      autoplay:true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    };
  },
  mounted() {
  	//
  }
};
</script>

<style lang="scss">
.pc_swiper {
  .swiper-wrapper {
    width: 100%;
    .swiper-slide {
      width: 100%;
      height: 600px;
      &.slide1 {
        background: url("~assets/img/input/01.jpg") no-repeat top center;
        background-size: cover;
      }
      &.slide2 {
        background: url("~assets/img/input/02.jpg") no-repeat top center;
        background-size: cover;
      }
      &.slide3 {
        background: url("~assets/img/input/03.jpg") no-repeat top center;
        background-size: cover;
      }
      &.slide4 {
        background: url("~assets/img/input/04.jpg") no-repeat top center;
        background-size: cover;
      }
    }
  }

  .swiper-pagination-bullet {
    width: 50px;
    height: 15px;
    border-radius: 0;
    background-color: #000;
    opacity: 1;
    outline: none;
  }
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    width: 44px;
    height: 55px;
  }

  .swiper-pagination .swiper-pagination-bullet-active:nth-child(1) {
    background: url("~assets/img/input/1.png") no-repeat center;
    background-size: contain;
  }
  .swiper-pagination .swiper-pagination-bullet-active:nth-child(2) {
    background: url("~assets/img/input/2.png") no-repeat center;
    background-size: contain;
  }
  .swiper-pagination .swiper-pagination-bullet-active:nth-child(3) {
    background: url("~assets/img/input/3.png") no-repeat center;
    background-size: contain;
  }
  .swiper-pagination .swiper-pagination-bullet-active:nth-child(4) {
    background: url("~assets/img/input/4.png") no-repeat center;
    background-size: contain;
  }

  .swiper-button-prev,.swiper-button-next{
    width: 55px;
    height: 79px;
  }
  .swiper-button-prev{
    left: 0;
    background: url("~assets/img/pc_banner_prev.png") no-repeat top center;
    background-size: cover;
  }
  .swiper-button-next{
    right: 0;
    background: url("~assets/img/pc_banner_next.png") no-repeat top center;
    background-size: cover;
  }
}

</style>