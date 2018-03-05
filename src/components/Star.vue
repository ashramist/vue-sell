<template>
  <div class="star" :class="starType">
    <span v-for="classItem in classItemList" class="star-item" :class="classItem" :key="classItem.index"></span>
  </div>
</template>

<script>
  const START_NUM = 5
  const CLS_ON = 'on'
  const CLS_OFF = 'off'
  const CLS_HALF = 'half'
  export default {
    name: 'star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      classItemList () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < START_NUM) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../common/styles/base';

  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-24 {
      .star-item {
        @include star($size: 10px, $marginRight: 3px, $starType: 24)
      }
    }
    &.star-36 {
      .star-item {
        @include star($size: 15px, $marginRight: 6px, $starType: 36)
      }
    }
    &.star-48 {
      .star-item {
        @include star($size: 20px, $marginRight: 20px, $starType: 48)
      }
    }
  }
</style>
