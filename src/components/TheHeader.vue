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
          <span class="icon"></span>
          <span class="description">{{seller.supports[0].description}}</span>
          <div class="num">
            {{seller.supports.length}}个
            <span class="icon-keyboard_arrow_right"></span>
          </div>
          <!--<div class="support-item" v-for="item in seller.supports" v-bind:key="item.type">-->
          <!---->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>

  </div>
</template>

<script>
  export default {
    name: 'the-header',
    props: {
      goods: Object,
      seller: Object
    }
  }
</script>
<style scoped lang="scss">
  @import '../common/styles/base';

  .header {
    background: rgba(7, 17, 27, 0.5);
    color: #fff;
    .content-wrapper {
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
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
          display: flex;
          flex-direction: row;
          .brand {
            width: 30px;
            height: 18px;
            display: inline-block;
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
          flex-direction: row;
          background: red;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            @include bg-image('decrease_1');
            background-size: 100% 100%;
          }
          .description {
            display: inline-block;
            font-size: 10px;
            color: #fff;
            font-weight: 200;
            line-height: 12px;
            margin-left: 4px;
          }
          .num {
            display: inline-block;
            flex: 1;
            align-self: flex-end;
            font-size: 10px;
            font-weight: 200;
            line-height: 12px;
            color: #fff;
            background: rgba(0, 0, 0, 0.2);
            height: 24px;
            border-radius: 7px;
            padding: 7px 8px;
            margin-top: -10px;
          }
        }
      }
    }
  }

</style>
