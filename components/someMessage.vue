<template>
    <div class="wrap">
        <div class="head_wrap">
            <div class="header">
                <h1 class="big_title">{{message.title}}</h1>
            </div>
        </div>
        <div class="container">
            <h3 class="small_title">{{message.title}}</h3>
            <div class="fengexian"></div>
            <p class="text">{{message.content}}</p>
        </div>
    </div>
</template>

<script>
export default {
  props:['message'],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@function width($son, $parent: 1920) {
  @return percentage($son/$parent);
}
@function height($son, $parent: 1951) {
  @return percentage($son/$parent);
}
.wrap{
    width: 100%;
  .head_wrap{
    width: 100%;
    height: 285px;
    background-color: #f8b62b;
        .header{
            width: 1200px;
            height: 285px;
            margin:0 auto;
            padding-top:191px;

                .big_title{
                    color: #333333;
                    font-size: 48px;
                    font-weight: normal;
                    white-space: nowrap;
                }
            }
    }
    .container{
        width: width(1200);
        margin:0 auto;
        padding:133px 0 0 0;
        position: relative;

        .small_title{
            font-size: 36px;
            color: #333333;
            text-align: center;
            font-weight: normal;
        }
        .fengexian{
            width: 340px;
            height: 20px;
            background: url("~assets/img/pc_fengexian.png") no-repeat center;
            background-size: contain;
            margin: 75px auto 0;
        }
        .text{
            color: #333333;
            margin:105px auto 0;
            // padding-bottom: 105px;
            line-height: 1.5em;
            font-size: 16px;
        }
    }
}

</style>
