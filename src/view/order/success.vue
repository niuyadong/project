<template>
  <div class="order-success-container">
    <!-- 成功图标 -->
    <div class="success-icon-container">
      <van-icon name="success" class="success-icon" />
      <div class="success-text">订单提交成功</div>
      <div class="order-number">订单编号: {{ orderId }}</div>
    </div>

    <!-- 订单信息 -->
    <div class="order-info">
      <div class="info-item">
        <span class="label">支付方式</span>
        <span class="value">{{ paymentMethod }}</span>
      </div>
      <div class="info-item">
        <span class="label">应付金额</span>
        <span class="value price">{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="info-item">
        <span class="label">下单时间</span>
        <span class="value">{{ orderTime }}</span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <van-button type="default" class="button" @click="goToHome">
        返回首页
      </van-button>
      <van-button type="primary" class="button" @click="viewOrder">
        查看订单
      </van-button>
    </div>

    <!-- 推荐商品 -->
    <div class="recommended-goods">
      <div class="section-title">猜你喜欢</div>
      <div class="goods-list">
        <div v-for="item in recommendedGoods" :key="item.id" class="goods-item" @click="goToDetail(item.id)">
          <van-image :src="item.thumb" class="goods-image" />
          <div class="goods-title">{{ item.title }}</div>
          <div class="goods-price">{{ formatPrice(item.price) }}</div>
        </div>
      </div>
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
      orderId: 'JD' + Date.now().toString().slice(-8),
      totalPrice: 1390,
      paymentMethod: '微信支付',
      orderTime: this.formatDate(new Date()),
      recommendedGoods: [
        {
          id: '3',
          title: '新疆阿克苏苹果',
          price: 890,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/861246628e4c07f64f2446c61d8808ad.jpeg'
        },
        {
          id: '4',
          title: '云南高山蜜橘',
          price: 590,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/3e923d932c8b7c5838b6018295c7f142.jpeg'
        },
        {
          id: '5',
          title: '进口车厘子',
          price: 1990,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/656139e79e3957d8376d437e4e0e91d1.jpeg'
        }
      ]
    };
  },
  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    goToHome() {
      this.$router.push('/home');
    },
    viewOrder() {
      // 跳转到订单详情
      this.$router.push('/order/detail');
    },
    goToDetail(id) {
      // 跳转到商品详情
      this.$router.push(`/goods/${id}`);
    }
  }
};
</script>

<style lang="less" scoped>
.order-success-container {
  padding: 20px 15px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.success-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  padding: 30px 0;
  background-color: #fff;
  border-radius: 10px;

  .success-icon {
    font-size: 60px;
    color: #07c160;
    margin-bottom: 15px;
  }

  .success-text {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .order-number {
    font-size: 14px;
    color: #999;
  }
}

.order-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #666;
    }

    .value {
      font-weight: 500;
    }

    .price {
      color: #f44;
      font-size: 16px;
    }
  }
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  .button {
    width: 48%;
    height: 45px;
    border-radius: 22.5px;
    font-size: 16px;
  }
}

.recommended-goods {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;

  .section-title {
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    .goods-item {
      width: 33.333%;
      padding: 10px;
      box-sizing: border-box;

      .goods-image {
        width: 100%;
        height: 80px;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .goods-title {
        font-size: 12px;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 5px;
      }

      .goods-price {
        font-size: 14px;
        color: #f44;
        font-weight: bold;
      }
    }
  }
}
</style>