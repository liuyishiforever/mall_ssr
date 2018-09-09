<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}"
              @click="selectMenu(index, $event)" ref="menuList">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list" v-for="item in goods" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food, $event)">
                <div class="icon"><img v-lazy="food.icon"></div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span><span class="old"
                                                                  v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :selectFoods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></shopcart>
    </div>

    <food :food="sclectedFood" ref="food"></food>
  </div>

</template>

<script>
  import axios from 'axios';
  import BScroll from 'better-scroll'
  import food from '~/components/food/food'
  import shopcart from '~/components/shopcart/shopcart'
  import Cartcontrol from "../../components/cartcontrol/cartcontrol";

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        heightList: [],
        scrollY: 0,
        sclectedFood: {}
      }
    },
    computed: {

      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        });
        return foods;
      },

      currentIndex() {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i];
          let height2 = this.heightList[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this._followScroll(i);
            return i
          }
        }
        return 0;
      }

    },
    methods: {

      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.sclectedFood = food;
        this.$refs.food.show();
      },


      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },

      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        })
      },
      _calHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.heightList.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.heightList.push(height);
        }
      },
      _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.menuScroll.scrollToElement(el, 300, 0, -100);
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
        this._calHeight();
      }, 100);
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    asyncData() {
      return axios.get('https://api.myjson.com/bins/17ca0c').then((res) => {
        return {goods: res.data}
      })
    },
    components: {
      Cartcontrol,
      food: food,
      shopcart: shopcart
    }
  }
</script>


<style lang="scss">

  @import "../../common/scss/mixin";

  .goods {
    display: flex;
    position: absolute;
    top: 348px;
    bottom: 92px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 160px;
      width: 160px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 108px;
        width: 112px;
        padding: 0 24px;
        line-height: 28px;
        font-size: 28px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          color: rgb(240, 20, 20);
          background: #fff;
          font-weight: bold;
          .text {
            @include border-none();
          }
        }
        .text {
          display: table-cell;
          width: 112px;
          vertical-align: middle;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 24px;
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 24px;
            height: 24px;
            margin-right: 4px;
            background-size: 24px 24px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('./icon/decrease_3');
            }
            &.discount {
              @include bg-image('./icon/discount_3')
            }
            &.guarantee {
              @include bg-image('./icon/guarantee_3')
            }
            &.invoice {
              @include bg-image('./icon/invoice_3')
            }
            &.special {
              @include bg-image('./icon/special_3')
            }
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .food-list {
        .title {
          padding-left: 28px;
          height: 52px;
          line-height: 52px;
          border-left: 4px solid #d9dde1;
          font-size: 24px;
          color: rgb(147, 153, 159);
          background: #f3f5f7;
        }
        .food-item {
          display: flex;
          margin: 36px;
          padding-bottom: 36px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            @include border-none();
            margin-bottom: 0;
          }
          .icon {
            flex: 0 0 114px;
            margin-right: 20px;
            img {
              width: 114px;
              height: 114px;
            }
          }
          .content {
            flex: 1;
            .name {
              margin: 4px 0 16px 0;
              height: 28px;
              line-height: 28px;
              font-size: 28px;
              color: rgb(7, 17, 27);
            }
            .desc, .extra {
              line-height: 20px;
              font-size: 20px;
              color: rgb(147, 153, 159);
            }
            .desc {
              line-height: 24px;
              margin-bottom: 16px;
            }
            .extra {
              .count {
                margin-right: 24px;
              }
            }
            .price {
              font-weight: 700;
              line-height: 48px;
              .now {
                margin-right: 16px;
                font-size: 28px;
                color: rgb(240, 20, 20);
              }
              .old {
                text-decoration: line-through;
                font-size: 20px;
                color: rgb(147, 153, 159);
              }
            }
            .cartcontrol-wrapper {
              position: absolute;
              right: 24px;
              bottom: 24px;
            }
          }

        }

      }

    }
  }


</style>
