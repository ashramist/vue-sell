<template>
  <div class="goods">
    <ul class="menu-wrapper" ref="menuWrapper">
      <li v-for="(menuItem , index) in goods" class="menu-item" :class="{'active':currentIndex === index}"
          @click="selectMenu(index,$event)" :key="menuItem.name"
          ref="menuList">
        <span v-if="menuItem.type > 0" class="icon" :class="iconClassMap[menuItem.type]"></span>
        <span class="description">{{menuItem.name}}</span>
      </li>
    </ul>
    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="item in goods" v-bind:key="item.name">
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
  import BScroll from 'better-scroll'

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
        goods: [],
        iconClassMap: [],
        foodItemsHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.foodItemsHeight.length; i++) {
          console.log(i)
          let h1 = this.foodItemsHeight[i]
          let h2 = this.foodItemsHeight[i + 1]
          if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
            this._followScroll(i)
            return i
          }
        }
        return 0
      }
    },
    created () {
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.goods = res.body.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        } else {
          console.log('App.vue:', '获取数据异常')
        }
      }, (err) => {
        console.log(err)
      })
    },
    methods: {
      _initScroll () {
        this.menuScorll = new BScroll(this.$refs.menuWrapper, {click: true})
        this.foodScorll = new BScroll(this.$refs.foodWrapper, {probeType: 3, click: true})
        this.foodScorll.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      },
      _calculateHeight () {
        let foodItems = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.foodItemsHeight.push(height)
        for (let item of foodItems) {
          height += item.clientHeight
          this.foodItemsHeight.push(height)
        }
      },
      _followScroll (index) {
        let menuList = this.$refs.menuList
        let el = menuList[index]
        this.menuScorll.scrollToElement(el, 300, 0, -100)
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodItems = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let element = foodItems[index]
        this.foodScorll.scrollToElement(element, 300)
      }
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
        padding: 0 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        &.active {
          position: relative;
          z-index: 10;
          background: #fff;
          margin-top: -1px;
          font-weight: 700;
          border: none;
        }
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
