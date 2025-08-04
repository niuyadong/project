<template>
  <div class="goods">
    <template v-if="Array.isArray(goods.thumb) && goods.thumb.length > 0">
      <div class="image-container">
        <van-swipe class="goods-swipe" :autoplay="3000" loop @change="handleSwipeChange">
          <van-swipe-item v-for="(thumb, index) in goods.thumb" :key="index">
            <div class="zoom-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
              <img :src="thumb" class="preview-image"/>
              <div class="zoom-lens" v-if="isZoomActive"></div>
              <div class="zoom-result" v-if="isZoomActive"></div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </template>
    <template v-else-if="goods.thumb">
      <div class="image-container">
        <div class="zoom-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
          <img :src="goods.thumb" class="preview-image"/>
          <div class="zoom-lens" v-if="isZoomActive"></div>
          <div class="zoom-result" v-if="isZoomActive"></div>
        </div>
      </div>
    </template>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-desc">{{ goods.desc }}</van-cell>
      <van-cell class="goods-express">
        <van-col span="10">折扣：{{ goods.discount }}折</van-col>
        <van-col span="14">销量：{{ goods.sales }}+</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template #title>
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
} from "vant";
// import api from "../../utils/api";
import productData from '../product-list/js/productData.json';
import { ImagePreview } from 'vant';
export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
  },

  data() {
    return {
      goods: {},
      isZoomActive: false,
      activeImage: '',
      currentIndex: 0
    };
  },

  mounted() {
    const productId = Number(this.$route.params.id);
    const product = productData.find(item => item.id === productId);
    if (product) {
      this.goods = product;
      this.activeImage = Array.isArray(product.thumb) ? product.thumb[0] : product.thumb;
    } else {
      Toast('产品不存在');
      this.$router.push('/product-list');
    }
  },

  methods: {
    handleSwipeChange(index) {
      this.currentIndex = index;
      this.activeImage = this.goods.thumb[index];
    },

    handleMouseEnter() {
      this.isZoomActive = true;
    },

    handleMouseLeave() {
      this.isZoomActive = false;
    },

    handleMouseMove(e) {
      if (!this.isZoomActive) return;
      const container = e.currentTarget;
      const lens = container.querySelector('.zoom-lens');
      const result = container.querySelector('.zoom-result');
      // const img = container.querySelector('.preview-image');

      // 获取容器位置和尺寸
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 计算放大镜位置
      const lensSize = 150;
      let lensX = x - lensSize / 2;
      let lensY = y - lensSize / 2;

      // 限制放大镜在容器内
      if (lensX < 0) lensX = 0;
      if (lensY < 0) lensY = 0;
      if (lensX > rect.width - lensSize) lensX = rect.width - lensSize;
      if (lensY > rect.height - lensSize) lensY = rect.height - lensSize;

      // 设置放大镜位置
      lens.style.left = lensX + 'px';
      lens.style.top = lensY + 'px';

      // 计算放大区域
      const scale = 2;
      result.style.backgroundImage = `url('${this.activeImage}')`;
      result.style.backgroundSize = `${rect.width * scale}px ${rect.height * scale}px`;
      result.style.backgroundPosition = `-${lensX * scale}px -${lensY * scale}px`;
    },

    formatPrice() {
      return "¥" + (this.goods.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push("cart");
    },

    handleImageClick(images, index) {
      ImagePreview({ images, startPosition: index });
    },

    sorry() {
      Toast("暂无后续逻辑~");
    },
  },
};
</script>

<style lang="less" scoped>
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  .image-container {
    position: relative;
  }

  .zoom-container {
    position: relative;
    overflow: hidden;
  }

  .preview-image {
    width: 100%;
    display: block;
  }

  .zoom-lens {
    position: absolute;
    width: 150px;
    height: 150px;
    border: 3px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: zoom-in;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .zoom-result {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-color: #fff;
    z-index: 99;
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-desc {
    font-size: 14px;
    color: #666;
    padding: 10px 15px;
    line-height: 1.5;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
