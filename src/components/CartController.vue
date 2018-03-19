<template>
  <div class="cart-controller">
    <div class="icon-remove_circle_outline" v-show="num>0" @click="reduceNum"></div>
    <div class="num" v-show="num">{{num}}</div>
    <div class="icon-add_circle" @click="addNum"></div>
  </div>
</template>

<script>
  export default {
    name: 'cart-controller',
    data () {
      return {
        num: 1
      }
    },
    methods: {
      reduceNum () {
        this.num = this.num - 1
      },
      addNum () {
        this.num = this.num + 1
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../common/styles/base';
  @import "../common/styles/font";

  .cart-controller {
    display: flex;
    .num {
      font-size: 10px;
      line-height: 24px;
      color: rgb(147, 153, 159);
      margin: 0 22px;
    }
    .icon-add_circle, .icon-remove_circle_outline {
      font-size: 24px;
      color: rgb(0, 160, 220);
      line-height: 24px;
    }
  }

</style>
