<template>
  <transition name="move">
    <div class="food" ref="food" v-show="showFlag">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old">¥{{food.oldPrice}}</span>
          </div>
        </div>
        <space></space>
        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
  import space from '~/components/space/space';
  import BScroll from 'better-scroll'

  export default {
    name: "food",
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.scroll = new BScroll(this.$refs.food, {
          click: true
        })

      },
      hide() {
        this.showFlag = false;
      }
    },
    components: {
      space: space
    }

  }
</script>

<style lang="scss">
  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 96px;
    width: 100%;
    z-index: 30;
    background: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leaver-active {
      transition: all 0.2s linear;
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }

    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 20px;
          font-size: 40px;
          color: #fff;
        }
      }
    }
    .content {
      position: relative;
      padding: 36px;
      .title {
        margin-bottom: 16px;
        line-height: 28px;
        font-size: 28px;
        font-weight: bold;
        color: rgb(7, 17, 27);
      }
      .detail {
        margin-bottom: 36px;
        line-height: 20px;
        height: 20px;
        font-size: 0;
        .sell-count, .rating {
          font-size: 20px;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 24px;
        }
      }
      .price {
        line-height: 48px;
        font-weight: bold;
        font-size: 0;
        .now {
          margin-right: 16px;
          font-size: 28px;
          color: rgb(240, 20, 150);
        }
        .old {
          text-decoration: line-through;
          font-size: 20px;
          color: rgb(147, 153, 159);
        }
      }
    }
    .info {
      padding: 36px;
      .title {
        line-height: 28px;
        margin-bottom: 12px;
        font-size: 28px;
        color: rgb(7, 17, 27)
      }
      .text {
        padding: 0 16px;
        line-height: 48px;
        font-size: 24px;
        color: rgb(77, 85, 93);

      }

    }
  }


</style>
