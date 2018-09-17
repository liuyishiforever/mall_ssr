<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="socre">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="socre">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟送达</span>
          </div>
        </div>
      </div>
      <space></space>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="ratings-wrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.name}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import star from '~/components/star/star'
  import space from '~/components/space/space'
  import ratingselect from '~/components/ratingselect/ratingselect'
  import {formatDate} from '../../common/js/date';
  import BScroll from 'better-scroll'


  const ALL = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    mounted() {
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      }, 20)

    },
    created() {
      let url = 'https://api.myjson.com/bins/snk4w';
      axios.get(url).then((res) => {
        this.ratings = res.data;
      })
    },
    methods: {

      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === type;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      }
    },
    components: {
      star: star,
      space: space,
      ratingselect: ratingselect
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd mm:ss')
      }
    }

  }
</script>

<style lang="scss">

  @import "../../common/scss/mixin";

  .ratings {
    position: absolute;
    top: 348px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      padding: 36px 0;
      .overview-left {
        flex: 0 0 274px;
        width: 274px;
        padding: 12px 0;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        .score {
          margin-bottom: 12px;
          line-height: 56px;
          font-size: 48px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 16px;
          line-height: 24px;
          font-size: 24px;
          color: rgb(7, 17, 27)
        }
        .rank {
          line-height: 20px;
          font-size: 20px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        padding: 12px 0 12px 48px;
        .score-wrapper {
          margin-bottom: 16px;
          font-size: 0;
          .title {
            display: inline-block;
            line-height: 36px;
            vertical-align: top;
            font-size: 24px;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            margin: 0 24px;
            vertical-align: top;
          }
          .score {
            display: inline-block;
            line-height: 36px;
            vertical-align: top;
            font-size: 24px;
            color: rgb(255, 153, 0);
          }

        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            line-height: 36px;
            font-size: 24px;
            color: rgb(7, 17, 27);
          }
          .delivery {
            margin-left: 24px;
            font-size: 24px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .ratings-wrapper {
      padding: 0 36px;
      .rating-item {
        display: flex;
        padding: 36px 0;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .avatar {
          flex: 0 0 56px;
          width: 48px;
          margin-right: 24px;
          img {
            width: 56px;
            height: 56px;
            margin-right: 24px;
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: 8px;
            line-height: 24px;
            font-size: 20px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            margin-bottom: 12px;
            font-size: 0;
            .star {
              display: inline-block;
              margin-right: 12px;
              vertical-align: top;
            }
            .delivery {
              display: inline-block;
              vertical-align: top;
              line-height: 24px;
              font-size: 20px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 16px;
            line-height: 36px;
            color: rgb(7, 17, 27);
            font-size: 24px;
          }
          .recommend {
            line-height: 32px;
            font-size: 0;
            .icon-thumb_up, .item {
              display: inline-block;
              margin: 0 16px 8px 0;
              font-size: 18px;
            }
            .item {
              padding: 0 12px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 2px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 24px;
            font-size: 20px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }

</style>
