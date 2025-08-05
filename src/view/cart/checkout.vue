<template>
  <div class="checkout-container">
    <!-- 头部 -->
    <div class="checkout-header">
      <span class="header-title">确认订单</span>
    </div>

    <!-- 收货地址 -->
    <div class="address-section" @click="editAddress">
      <div class="section-title">收货地址</div>
      <div class="address-info" v-if="address">
        <div class="address-name-phone">
          <span class="name">{{ address.name }}</span>
          <span class="phone">{{ address.phone }}</span>
        </div>
        <div class="address-detail">{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}</div>
      </div>
      <div class="no-address" v-else>
        <span>添加收货地址</span>
      </div>
      <van-icon name="arrow-right" class="arrow-icon" />
    </div>

    <!-- 商品清单 -->
    <div class="goods-section">
      <div class="section-title">商品清单 ({{ goods.length }})</div>
      <div class="goods-list">
        <div v-for="item in goods" :key="item.id" class="goods-item">
          <van-image :src="item.thumb" class="goods-image" />
          <div class="goods-info">
            <div class="goods-title">{{ item.title }}</div>
            <div class="goods-desc">{{ item.desc }}</div>
            <div class="goods-price-count">
              <span class="price">{{ formatPrice(item.price) }}</span>
              <span class="count">x{{ item.num }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优惠券 -->
    <div class="coupon-section" @click="selectCoupon">
      <div class="section-title">优惠券</div>
      <div class="coupon-info">
        <span class="selected-coupon">{{ selectedCoupon || '未选择优惠券' }}</span>
        <span class="available-count">{{ availableCouponCount }}张可用</span>
      </div>
      <van-icon name="arrow-right" class="arrow-icon" />
    </div>

    <!-- 支付方式 -->
    <div class="payment-section">
      <div class="section-title">支付方式</div>
      <div class="payment-methods">
        <div class="payment-method" :class="{ 'selected': paymentMethod === 'wechat' }" @click="selectPayment('wechat')">
          <van-icon name="wechat" class="payment-icon" />
          <span class="payment-name">微信支付</span>
          <van-icon v-if="paymentMethod === 'wechat'" name="success" class="selected-icon" />
        </div>
        <div class="payment-method" :class="{ 'selected': paymentMethod === 'alipay' }" @click="selectPayment('alipay')">
          <van-icon name="alipay-circle" class="payment-icon" />
          <span class="payment-name">支付宝</span>
          <van-icon v-if="paymentMethod === 'alipay'" name="success" class="selected-icon" />
        </div>
        <div class="payment-method" :class="{ 'selected': paymentMethod === 'card' }" @click="selectPayment('card')">
          <van-icon name="credit-card" class="payment-icon" />
          <span class="payment-name">银行卡</span>
          <van-icon v-if="paymentMethod === 'card'" name="success" class="selected-icon" />
        </div>
      </div>
    </div>

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
        <span>优惠券</span>
        <span class="discount">-{{ formatPrice(couponDiscount) }}</span>
      </div>
      <div class="summary-item total">
        <span>实付款</span>
        <span class="total-price">{{ formatPrice(finalPrice) }}</span>
      </div>
    </div>

    <!-- 底部支付按钮 -->
    <div class="pay-button-container">
      <van-button type="primary" class="pay-button" @click="submitOrder">
        提交订单
      </van-button>
    </div>
  </div>
</template>

<script>
// 显式引入并注册Vant组件
import { Icon, Image, Button } from 'vant';

export default {
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Button.name]: Button
  },
  data() {
    return {
      address: {
        name: '张三',
        phone: '13800138000',
        province: '广东省',
        city: '深圳市',
        district: '南山区',
        detail: '科技园路1号'
      },
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
        }
      ],
      availableCouponCount: 2,
      selectedCoupon: '满30减5元',
      couponDiscount: 500,
      deliveryFee: 500,
      paymentMethod: 'wechat'
    };
  },
  computed: {
    totalPrice() {
      return this.goods.reduce((total, item) => {
        return total + item.price * item.num;
      }, 0);
    },
    finalPrice() {
      return Math.max(0, this.totalPrice + this.deliveryFee - this.couponDiscount);
    }
  },
  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    editAddress() {
      // 跳转到地址编辑页面
      this.$router.push('/address/edit');
    },
    selectCoupon() {
      // 跳转到优惠券选择页面
      this.$router.push('/coupons');
    },
    selectPayment(method) {
      this.paymentMethod = method;
    },
    submitOrder() {
      // 提交订单逻辑
      this.$toast('订单提交成功');
      // 跳转到支付页面或订单详情页面
      setTimeout(() => {
        this.$router.push('/order/success');
      }, 1500);
    }
  }
};
</script>

<style lang="less" scoped>
.checkout-container {
  padding-bottom: 60px;
}

.checkout-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  .header-title {
    font-size: 18px;
    font-weight: bold;
  }
}

.address-section,
.coupon-section {
  padding: 15px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .address-info {
    flex: 1;
    margin-right: 10px;

    .address-name-phone {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;

      .name {
        font-size: 16px;
      }

      .phone {
        font-size: 14px;
        color: #666;
      }
    }

    .address-detail {
      font-size: 14px;
      color: #666;
      line-height: 1.4;
    }
  }

  .no-address {
    flex: 1;
    margin-right: 10px;
    color: #999;
    text-align: center;
    padding: 20px 0;
  }

  .coupon-info {
    flex: 1;
    margin-right: 10px;

    .selected-coupon {
      color: #1989fa;
    }

    .available-count {
      font-size: 12px;
      color: #999;
      margin-left: 5px;
    }
  }

  .arrow-icon {
    color: #999;
  }
}

.goods-section {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;

  .section-title {
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }

  .goods-list {
    padding: 10px 15px;

    .goods-item {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .goods-image {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        margin-right: 10px;
      }

      .goods-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

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

        .goods-price-count {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .price {
            font-size: 14px;
            color: #f44;
            font-weight: bold;
          }

          .count {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}

.payment-section {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;

  .section-title {
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }

  .payment-methods {
    padding: 10px 15px;

    .payment-method {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      &.selected {
        color: #1989fa;
      }

      .payment-icon {
        font-size: 20px;
        margin-right: 10px;
      }

      .payment-name {
        flex: 1;
        font-size: 16px;
      }

      .selected-icon {
        color: #1989fa;
      }
    }
  }
}

.order-summary {
  margin-top: 10px;
  padding: 15px;
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

    &.total {
      font-weight: bold;

      .total-price {
        font-size: 18px;
        color: #f44;
      }
    }

    .discount {
      color: #1989fa;
    }
  }
}

.pay-button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  .pay-button {
    width: 100%;
    height: 45px;
    border-radius: 22.5px;
    background-color: #ff6b00;
    border: none;
    font-size: 16px;

    &:active {
      background-color: #e55c00;
    }
  }
}
</style>