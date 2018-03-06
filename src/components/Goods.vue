<template>
  <div class="goods">
    <div class="menu-wrapper">
      <span v-for="menuItem in goods" v-bind:key="menuItem.name" class="menu-item">
        <span v-if="menuItem.type > 0" class="icon" :class="iconClassMap[menuItem.type]"></span>
        <span class="description">{{menuItem.name}}</span>
      </span>
    </div>
    <div class="food-wrapper"></div>
  </div>
</template>

<script>
  const ERR_OK = 0
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: {},
        iconClassMap: []
      }
    },
    created () {
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.goods = res.body.data
        } else {
          console.log('App.vue:', '获取数据异常')
        }
      }, (err) => {
        console.log(err)
      })
    }
  }
</script>

<style scoped lang="scss">
  @import '../common/styles/base';

  .goods {
    display: -webkit-flex;
    display: flex;
    position: absolute;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 58px;
    overflow: hidden;
    .menu-wrapper {
      width: 80px;
      flex: 0 0 80px;
      background: #f3f5f7;
      display: flex;
      flex-direction: column;
      .menu-item {
        height: 54px;
        width: 56px;
        margin: 0 12px;
        display: flex;
        justify-content: start;
        align-items: center;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          @include menu-item-icon($size: 16px);
          flex: 0.5;
        }
        .description {
          flex: 1;
          align-self: center;
          margin-left: 2px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          font-weight: 200;
          line-height: 14px;
        }
      }
    }
    .food-wrapper {
      flex: 1;

    }
  }

</style>
