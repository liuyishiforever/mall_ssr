<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
  export default {
    name: "star",
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixin";

  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 40px;
        height: 40px;
        margin-right: 44px;
        background-size: 40px 40px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('./icon/star48_on');
        }
        &.half {
          @include bg-image('./icon/star48_half');
        }
        &.off {
          @include bg-image('./icon/star48_off');
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('./icon/star24_on');
        }
        &.half {
          @include bg-image('./icon/star24_half');
        }
        &.off {
          @include bg-image('./icon/star24_off');
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 30px;
        height: 30px;
        margin-right: 12px;
        background-size: 30px 30px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('./icon/star36_on');
        }
        &.half {
          @include bg-image('./icon/star36_half');
        }
        &.off {
          @include bg-image('./icon/star36_off');
        }
      }
    }

  }

</style>
