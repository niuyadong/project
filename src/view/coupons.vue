<template>
  <div class="coupons-container">
    <!-- 头部 -->
    <div class="header">
      <span class="header-left" @click="goBack">返回</span>
      <span class="header-title">选择优惠券</span>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-item" :class="{ 'active': filterType === 'all' }" @click="setFilter('all')">全部</div>
      <div class="filter-item" :class="{ 'active': filterType === 'available' }" @click="setFilter('available')">可用</div>
      <div class="filter-item" :class="{ 'active': filterType === 'used' }" @click="setFilter('used')">已使用</div>
      <div class="filter-item" :class="{ 'active': filterType === 'expired' }" @click="setFilter('expired')">已过期</div>
    </div>

    <!-- 优惠券列表 -->
    <div class="coupon-list">
      <div v-for="coupon in filteredCoupons" :key="coupon.id" class="coupon-item" :class="getCouponClass(coupon)" @click="selectCoupon(coupon)">
        <div class="coupon-left">
          <div class="coupon-value">{{ coupon.value }}</div>
          <div class="coupon-desc">{{ coupon.desc }}</div>
          <div class="coupon-condition">{{ coupon.condition }}</div>
        </div>
        <div class="coupon-right">
          <div class="coupon-time">有效期至 {{ coupon.expireDate }}</div>
          <van-icon v-if="coupon.selected" name="success" class="selected-icon" />
          <div v-if="coupon.status === 'used'" class="coupon-tag">已使用</div>
          <div v-if="coupon.status === 'expired'" class="coupon-tag">已过期</div>
        </div>
      </div>
      <div v-if="filteredCoupons.length === 0" class="empty-tip">暂无优惠券</div>
    </div>
  </div>
</template>

<script>
// 显式引入并注册Vant组件
import { Icon } from 'vant';

export default {
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {
      filterType: 'available', // all, available, used, expired
      coupons: [
        {
          id: '1',
          value: '¥5',
          desc: '满30元可用',
          condition: '订单满30元可用',
          expireDate: '2023-12-31',
          status: 'available', // available, used, expired
          selected: true
        },
        {
          id: '2',
          value: '¥10',
          desc: '满50元可用',
          condition: '订单满50元可用',
          expireDate: '2023-12-31',
          status: 'available',
          selected: false
        },
        {
          id: '3',
          value: '¥20',
          desc: '满100元可用',
          condition: '订单满100元可用',
          expireDate: '2023-11-15',
          status: 'expired',
          selected: false
        },
        {
          id: '4',
          value: '¥15',
          desc: '新用户专享',
          condition: '新用户首次下单可用',
          expireDate: '2023-10-20',
          status: 'used',
          selected: false
        }
      ]
    };
  },
  computed: {
    filteredCoupons() {
      if (this.filterType === 'all') {
        return this.coupons;
      } else if (this.filterType === 'available') {
        return this.coupons.filter(coupon => coupon.status === 'available');
      } else if (this.filterType === 'used') {
        return this.coupons.filter(coupon => coupon.status === 'used');
      } else if (this.filterType === 'expired') {
        return this.coupons.filter(coupon => coupon.status === 'expired');
      }
      return this.coupons;
    }
  },
  methods: {
    setFilter(type) {
      this.filterType = type;
    },
    getCouponClass(coupon) {
      if (coupon.status === 'available') {
        return 'available';
      } else if (coupon.status === 'used') {
        return 'used';
      } else if (coupon.status === 'expired') {
        return 'expired';
      }
      return '';
    },
    selectCoupon(coupon) {
      if (coupon.status !== 'available') {
        return;
      }
      // 取消其他优惠券的选中状态
      this.coupons.forEach(item => {
        item.selected = false;
      });
      // 选中当前优惠券
      coupon.selected = true;
      // 提示用户
      this.$toast(`已选择${coupon.value}优惠券`);
      // 返回上一页
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.coupons-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;

  .header-left {
    font-size: 16px;
    color: #1989fa;
  }

  .header-title {
    font-size: 18px;
    font-weight: bold;
  }
}

.filter-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 56px;
  z-index: 10;

  .filter-item {
    padding: 5px 10px;
    font-size: 14px;
    color: #666;

    &.active {
      color: #1989fa;
      font-weight: bold;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 2px;
        background-color: #1989fa;
      }
    }
  }
}

.coupon-list {
  padding: 10px;

  .coupon-item {
    display: flex;
    margin-bottom: 10px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;

    &.disabled {
      opacity: 0.6;
    }

    &.selected {
      border: 1px solid #1989fa;
    }

    .coupon-left {
      flex: 1;
      padding-right: 10px;

      .coupon-value {
        font-size: 24px;
        font-weight: bold;
        color: #f44;
        margin-bottom: 5px;
      }

      .coupon-desc {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .coupon-condition {
        font-size: 12px;
        color: #999;
      }
    }

    .coupon-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      padding-left: 10px;
      border-left: 1px dashed #eee;
      min-width: 100px;

      .coupon-time {
        font-size: 12px;
        color: #999;
        text-align: right;
      }

      .selected-icon {
        color: #1989fa;
        font-size: 20px;
      }

      .coupon-tag {
        padding: 2px 8px;
        background-color: #f5f5f5;
        color: #999;
        font-size: 12px;
        border-radius: 4px;
        margin-top: 5px;
      }
    }
  }

  .empty-tip {
    padding: 50px 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
}
</style>