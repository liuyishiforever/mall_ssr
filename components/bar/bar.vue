<template>
  <div class="bar">
    <div class="bar-item">
      <nuxt-link to="/goods">商品</nuxt-link>
    </div>
    <div class="bar-item">
      <nuxt-link to="/ratings">评价</nuxt-link>
    </div>
    <div class="bar-item">
      <nuxt-link to="/seller">商家</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bar"
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixin";

  .bar {
    display: flex;
    width: 100%;
    height: 80px;
    line-height: 80px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .bar-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 24px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }

</style>
