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
      <div v-if="seller.supports" class="support-count" v-on:click="showMask">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" v-on:click="showMask">
      <span class="icon"></span>
      <span class="text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="mask" v-show="maskShow">
        <div class="mask-wrapper clear-fix">
          <div class="mask-main">
            <span class="name">{{seller.name}}</span>
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <div class="title-wrapper" v-if="seller.supports">
              <div class="line "></div>
              <div class="title">优惠信息</div>
              <div class="line "></div>
            </div>
            <div class="support-wrapper">
              <div class="support-item" v-for="support in seller.supports" :key="support.type">
                <span class="icon" :class="iconClassMap[support.type]"></span>
                <span class="description">{{support.description}}</span>
              </div>
            </div>
            <div class="title-wrapper" v-if="seller.supports">
              <div class="line"></div>
              <div class="title">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="brand-wrapper">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="mask-close" @click="hideMask">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Star from './Star'

  export default {
    name: 'the-header',
    components: {
      Star: Star
    },
    props: {
      goods: Object,
      seller: Object
    },
    data () {
      return {
        maskShow: false
      }
    },
    methods: {
      showMask () {
        this.maskShow = true
      },
      hideMask () {
        this.maskShow = false
      }
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
    overflow: hidden;
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
          @include support-icon($size: 12px);
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
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      overflow: auto;
      width: 100%;
      height: 100%;
      z-index: 100;
      background: rgba(7, 17, 27, 0.8);
      -webkit-backdrop-filter: blur(10px);
      .mask-wrapper {
        min-height: 100%;
        width: 100%;
        text-align: center;
        .mask-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            line-height: 16px;
          }
          .star-wrapper {
            margin-top: 16px;
            margin-bottom: 28px;
          }
          .title-wrapper {
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            .line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255, 255, 255, .2)
            }
            .title {
              flex: 1;
              font-size: 14px;
              font-weight: 700;
              line-height: 14px;
              color: #fff;
              padding: 0 12px;
            }
          }
          .support-wrapper {
            margin: 24px 48px 28px 48px;
            .support-item {
              margin: 0 auto 12px auto;
              text-align: start;
              display: flex;
              padding-bottom: 2px;
              @include support-icon($size: 16px);
              .description {
                font-size: 12px;
                line-height: 16px;
                font-weight: 200;
                margin-left: 6px;
                vertical-align: middle;
              }
            }
          }
          .brand-wrapper {
            margin: 24px 48px 28px 48px;
            text-align: start;
            font-size: 12px;
            font-weight: 200;
            line-height: 24px;
            color: rgb(255, 255, 255);
          }
        }
      }
      .mask-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
        color: rgba(255, 255, 255, .5)
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

</style>
