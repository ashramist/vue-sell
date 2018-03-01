<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
          <span class="description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="icon"></span>
      <span class="text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'the-header',
    props: {
      goods: Object,
      seller: Object
    },
    created () {
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>
<style scoped lang="scss">
  @import '../common/styles/base';
  @import "../common/styles/font";

  .header {
    color: #fff;
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
        vertical-align: top;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        font-size: 14px;
        .title {
          margin: 2px 6px 8px 0;
          .brand {
            width: 30px;
            height: 18px;
            display: inline-block;
            vertical-align: top;
            @include bg-image('brand');
            background-size: 100% 100%;
          }
          .name {
            display: inline-block;
            font-size: 16px;
            line-height: 18px;
            color: rgb(255, 255, 255);
            margin-left: 6px;
          }

        }
        .description {
          font-size: 12px;
          color: #fff;
          font-weight: 200;
          line-height: 12px;
          margin-bottom: 10px;
        }
        .supports {
          display: flex;
          padding-bottom: 2px;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-size: 100% 100%;
            vertical-align: top;
            &.decrease {
              @include bg-image('decrease_1');
            }
            &.discount {
              @include bg-image('discount_1');
            }
            &.guarantee {
              @include bg-image('guarantee_1');
            }
            &.invoice {
              @include bg-image('invoice_1');
            }
            &.special {
              @include bg-image('special_1');
            }
          }
          .description {
            display: inline-block;
            font-size: 10px;
            color: #fff;
            font-weight: 200;
            line-height: 12px;
            margin-left: 4px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 20px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        color: #fff;
        font-size: 10px;
        vertical-align: middle;
        padding: 10px 12px;
        .count {
          line-height: 12px;
          vertical-align: text-bottom;
          padding-left: 4px;
        }
        .icon-keyboard_arrow_right {
          margin-left: 2px;
          vertical-align: middle;
          padding-right: 8px;
          line-height: 12px;
        }
      }
    }
    .bulletin-wrapper {
      background: rgba(7, 17, 27, 0.2);
      height: 28px;
      vertical-align: middle;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 12px;
      font-size: 0;
      .icon {
        flex: 0.15;
        width: 22px;
        height: 12px;
        @include bg-image('bulletin');
        vertical-align: top;
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .text {
        flex: 2;
        margin-left: 4px;
        font-size: 10px;
        height: 28px;
        line-height: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon-keyboard_arrow_right {
        flex: 0.05;
        font-size: 10px;
      }
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
  }

</style>
