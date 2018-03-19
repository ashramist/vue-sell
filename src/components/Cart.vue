<template>
  <div class="cart">
    <div class="cart-left-wrapper">
      <div class="logo-outline-wrapper">
        <div class="logo-wrapper" :class="buyFoods ?'active':''">
          <span class="icon-shopping_cart" :class="buyFoods ?'active':''"></span>
        </div>
      </div>
      <div class="price" :class="buyFoods ?'active':''">￥{{totalPrice}}</div>
      <div class="description">
        另需配送费￥{{deliveryPrice}}元
      </div>
    </div>
    <div class="cart-right-wrapper">
      ￥{{minPrice}}元起送
    </div>
  </div>
</template>
<script>
  export default {
    name: 'cart',
    props: {
      buyFoods: {
        type: Array,
        default () {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.buyFoods.map((ele) => {
          total += ele.price * ele.count
        })
        return total
      }
    }
  }
</script>
<style scoped lang='scss'>
  @import "../common/styles/font";

  .cart {
    display: flex;
    height: 62px;
    .cart-left-wrapper {
      display: flex;
      flex: 2;
      background: #141f27;
      .logo-outline-wrapper {
        border-radius: 50%;
        width: 58px;
        height: 58px;
        margin-top: -12px;
        margin-left: 18px;
        background: #141f27;
        display: flex;
        line-height: 58px;
        justify-content: center;
        align-items: center;
        padding-top: 3px;
        .logo-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgb(43, 51, 59);
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 44px;
          &.active {
            background: rgb(14, 149, 249)
          }
          .icon-shopping_cart {
            font-size: 24px;
            color: rgba(255, 255, 255, .4);
            line-height: 24px;
            &.active {
              color: rgb(255, 255, 255)
            }
          }
        }
      }
      .price {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        line-height: 24px;
        margin: 12px 0 12px 18px;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        &.active {
          color: rgb(255, 255, 255);
        }
      }
      .description {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
        margin-left: 12px;
      }

    }
    .cart-right-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0.7;
      font-size: 16px;
      font-weight: 700;
      background: rgb(43, 51, 59);
      color: rgba(255, 255, 255, .4);
      line-height: 24px;
    }
  }
</style>
