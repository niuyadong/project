<template>
  <div class="cart-container">
    <!-- 头部 -->
    <div class="cart-header">
      <span class="header-title">购物车</span>
      <span class="edit-btn" @click="toggleEditMode">{{ editMode ? '完成' : '编辑' }}</span>
    </div>

    <!-- 商品列表 -->
    <div class="goods-list">
      <van-checkbox-group v-model="checkedGoods">
        <van-cell v-for="item in goods" :key="item.id" class="goods-item">
          <template #left>
            <van-checkbox :name="item.id" class="goods-checkbox" />
          </template>
          <div class="goods-info">
            <van-image :src="item.thumb" class="goods-image" />
            <div class="goods-detail">
              <div class="goods-title">{{ item.title }}</div>
              <div class="goods-desc">{{ item.desc }}</div>
              <div class="goods-price">{{ formatPrice(item.price) }}</div>
            </div>
          </div>
          <div class="goods-actions">
            <div v-if="editMode">
              <van-button type="danger" size="mini" @click="removeItem(item.id)">删除</van-button>
            </div>
            <div v-else class="goods-quantity">
              <van-stepper
                v-model="item.num"
                :min="1"
                @change="onQuantityChange(item.id, item.num)"
              />
            </div>
          </div>
        </van-cell>
      </van-checkbox-group>
    </div>

    <!-- 优惠券区域 -->
    <van-cell class="coupon-cell" @click="goToCouponList">
      <template #title>
        <div class="coupon-title">
          <van-icon name="ticket" class="coupon-icon" />
          <span>优惠券</span>
        </div>
      </template>
      <div class="coupon-info">
        <span class="available-coupon">{{ availableCouponCount }}张可用</span>
        <van-icon name="arrow-right" class="arrow-icon" />
      </div>
    </van-cell>

    <!-- 订单摘要 -->
    <div class="order-summary">
      <div class="summary-item">
        <span>商品总价</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="summary-item">
        <span>配送费</span>
        <span>{{ formatPrice(deliveryFee) }}</span>
      </div>
      <div class="summary-item">
        <span>优惠</span>
        <span class="discount">-{{ formatPrice(discount) }}</span>
      </div>
    </div>

    <!-- 底部结算栏 -->
    <van-submit-bar
      :price="finalPrice"
      :button-text="submitBarText"
      :disabled="!checkedGoods.length"
      @submit="onSubmit"
      class="custom-submit-bar"
    >
      <van-checkbox
        v-model="selectAll"
        class="select-all-checkbox"
        @change="toggleSelectAll"
      >
        全选
      </van-checkbox>
      <div class="price-info">
        <div class="total-price">总计: <span class="price">{{ formatPrice(finalPrice) }}</span></div>
        <div class="price-desc">含运费</div>
      </div>
    </van-submit-bar>
  </div>
</template>

<script>
// 显式引入并注册Vant组件
import { CheckboxGroup, Cell, Checkbox, Image, Button, Stepper, Icon, SubmitBar } from 'vant';

export default {
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [Checkbox.name]: Checkbox,
    [Image.name]: Image,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
    [SubmitBar.name]: SubmitBar
  },
  data() {
    return {
      editMode: false,
      selectAll: true,
      checkedGoods: ['1', '2', '3'],
      availableCouponCount: 2,
      deliveryFee: 500,
      discount: 0,
      goods: [
        {
          id: '1',
          title: '进口香蕉',
          desc: '约250g，2根',
          price: 200,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
        },
        {
          id: '2',
          title: '陕西蜜梨',
          desc: '约600g',
          price: 690,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
        },
        {
          id: '3',
          title: '美国伽力果',
          desc: '约680g/3个',
          price: 2680,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
        }
      ]
    };
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return this.editMode ? '删除所选' : `结算(${count})`;
    },
    totalPrice() {
      return this.goods.reduce((total, item) => {
        return total + (this.checkedGoods.includes(item.id) ? item.price * item.num : 0);
      }, 0);
    },
    finalPrice() {
      // 计算最终价格：商品总价 + 配送费 - 优惠
      return Math.max(0, this.totalPrice + this.deliveryFee - this.discount);
    }
  },
  watch: {
    checkedGoods: {
      handler() {
        this.selectAll = this.checkedGoods.length === this.goods.length;
      },
      deep: true
    }
  },
  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.checkedGoods = this.goods.map(item => item.id);
      } else {
        this.checkedGoods = [];
      }
    },
    onQuantityChange(id, num) {
      const item = this.goods.find(item => item.id === id);
      if (item) {
        item.num = num;
      }
    },
    removeItem(id) {
      this.goods = this.goods.filter(item => item.id !== id);
      this.checkedGoods = this.checkedGoods.filter(itemId => itemId !== id);
      this.$toast('删除成功');
    },
    onSubmit() {
      if (this.editMode) {
        // 删除所选商品
        this.goods = this.goods.filter(item => !this.checkedGoods.includes(item.id));
        this.checkedGoods = [];
        this.editMode = false;
        this.$toast('已删除所选商品');
      } else {
        // 跳转到结算页面
        this.$router.push('/checkout');
      }
    },
    goToCouponList() {
      // 跳转到优惠券列表
      this.$router.push('/coupons');
    }
  }
};
</script>

<style lang="less" scoped>
.cart-container {
  padding-bottom: 50px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  .header-title {
    font-size: 18px;
    font-weight: bold;
  }

  .edit-btn {
    color: #1989fa;
    font-size: 16px;
  }
}

.goods-list {
  background-color: #f5f5f5;
  padding-bottom: 10px;
}

.goods-item {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;

  .goods-checkbox {
    margin-right: 10px;
  }

  .goods-info {
    display: flex;
    flex: 1;

    .goods-image {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      margin-right: 10px;
    }

    .goods-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px 0;

      .goods-title {
        font-size: 14px;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .goods-desc {
        font-size: 12px;
        color: #999;
      }

      .goods-price {
        font-size: 14px;
        color: #f44;
        font-weight: bold;
      }
    }
  }

  .goods-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 5px 0;

    .goods-quantity {
      width: 100px;
    }
  }
}

.coupon-cell {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;

  .coupon-title {
    display: flex;
    align-items: center;

    .coupon-icon {
      color: #ff6b00;
      margin-right: 5px;
    }
  }

  .coupon-info {
    display: flex;
    align-items: center;
    color: #1989fa;

    .available-coupon {
      margin-right: 5px;
    }
  }
}

.order-summary {
  margin-top: 10px;
  padding: 10px 16px;
  background-color: #fff;
  border-radius: 8px;

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .discount {
      color: #1989fa;
    }
  }
}

.custom-submit-bar {
  .select-all-checkbox {
    margin-right: 10px;
  }

  .price-info {
    flex: 1;
    text-align: right;
    margin-right: 10px;

    .total-price {
      font-size: 14px;

      .price {
        font-size: 18px;
        color: #f44;
        font-weight: bold;
      }
    }

    .price-desc {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
