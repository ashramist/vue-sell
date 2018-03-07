<template>
  <div class="goods">
    <div class="menu-wrapper">
      <span v-for="menuItem in goods" v-bind:key="menuItem.name" class="menu-item">
        <span v-if="menuItem.type > 0" class="icon" :class="iconClassMap[menuItem.type]"></span>
        <span class="description">{{menuItem.name}}</span>
      </span>
    </div>
    <div class="food-wrapper">
      <ul>
        <li class="food-list" v-for="item in goods" v-bind:key="item.name">
          <div class="title">{{item.name}}</div>
          <ul class="food-detail-list">
            <li class="food-item" v-for="foodItem in item.foods" v-bind:key="foodItem.name">
              <div class="avatar">
                <img :src="foodItem.icon"/>
              </div>
              <div class="food-detail">
                <div class="name">{{foodItem.name}}</div>
                <div class="description">{{foodItem.description}}</div>
                <div class="sell-detail">月售{{foodItem.sellCount}}份&nbsp;&nbsp;好评率{{foodItem.rating}}%</div>
                <div class="price-detail">
                  <span class="price">￥{{foodItem.price}}</span>
                  <span class="old-price" v-show="foodItem.oldPrice">￥{{foodItem.oldPrice}}</span>
                </div>
              </div>
              <div class="cart-wrapper"></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
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
      overflow: auto;
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
          margin: 5px 0 5px 2px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          font-weight: 200;
          line-height: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .food-wrapper {
      flex: 1;
      overflow: auto;
      .food-list {
        .title {
          background: #f3f5f7;
          border-left: 2px solid #d9dde1;
          height: 28px;
          padding-left: 14px;
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 28px;
        }
        .food-detail-list {
          .food-item {
            display: flex;
            margin-left: 18px;
            padding: 18px 18px 18px 0;
            @include border-1px($color: rgba(7, 17, 27, .1));
            &:last-child:after {
              border-top: none;
            }
            .avatar {
              width: 57px;
              height: 57px;
              img {
                width: 57px;
                height: 57px;
              }
            }
            .food-detail {
              margin-top: 2px;
              margin-left: 10px;
              .name {
                font-size: 14px;
                color: rgb(7, 17, 27);
                line-height: 14px;
                font-weight: 700;
                margin-bottom: 8px;
              }
              .description, .sell-detail, .price-detail > .old-price {
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 14px;
                margin-bottom: 8px;
              }
              .price-detail {
                .price {
                  font-size: 14px;
                  font-weight: 700;
                  line-height: 14px;
                  color: rgb(240, 20, 20);
                }
                .old-price {
                  text-decoration: line-through;
                }
              }
            }
          }
        }

      }

    }
  }

</style>
