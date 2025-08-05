<template>
  <div class="home-container">
    <!-- 顶部搜索栏 -->
    <van-search
      v-model="searchText"
      placeholder="搜索商品"
      shape="round"
      background="#ff6b00"
      class="search-bar"
    />

    <!-- 轮播图 -->
    <van-swipe class="banner-swipe" :autoplay="3000" indicator-color="#ffffff">
      <van-swipe-item>
        <img src="https://img12.360buyimg.com/babel/jfs/t1/167824/2/2238/120588/60c7a106E5a79025c/029a7ff0d2e4c221.jpg" alt="轮播图1" class="banner-img"/>
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://img10.360buyimg.com/babel/jfs/t1/128851/26/20397/118533/60c7a11cE43680dca/85622a260af16fca.jpg" alt="轮播图2" class="banner-img"/>
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://img13.360buyimg.com/babel/jfs/t1/173627/27/1886/104316/60c7a12cE57c65706/96806f28f4696422.jpg" alt="轮播图3" class="banner-img"/>
      </van-swipe-item>
    </van-swipe>

    <!-- 分类导航 -->
    <div class="category-grid">
      <div class="category-item" v-for="category in categories" :key="category.id">
        <van-image :src="category.icon" class="category-icon"/>
        <span class="category-name">{{ category.name }}</span>
      </div>
    </div>

    <!-- 促销活动 -->
    <div class="promotion-section">
      <div class="section-title">限时抢购</div>
      <div class="countdown">
        <van-count-down
          :time="3600000"
          format="HH:mm:ss"
          class="countdown-timer"
        />
      </div>
      <div class="promotion-goods">
        <van-card
          v-for="good in promotionGoods"
          :key="good.id"
          :thumb="good.image"
          class="goods-card"
        >
          <div slot="title" class="goods-title">{{ good.title }}</div>
          <div slot="price" class="goods-price">
            <span class="current-price">{{ good.currentPrice }}</span>
            <span class="original-price">{{ good.originalPrice }}</span>
          </div>
        </van-card>
      </div>
    </div>

    <!-- 商品推荐 -->
    <div class="recommendation-section">
      <div class="section-title">为你推荐</div>
      <div class="recommendation-goods">
        <van-card
          v-for="good in recommendedGoods"
          :key="good.id"
          :thumb="good.image"
          class="goods-card"
        >
          <div slot="title" class="goods-title">{{ good.title }}</div>
          <div slot="price" class="goods-price">
            <span class="current-price">{{ good.currentPrice }}</span>
          </div>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
// 显式引入并注册Vant组件
import { Search, Swipe, SwipeItem, Image, CountDown, Card } from 'vant';

export default {
  name: 'Home',
  components: {
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [CountDown.name]: CountDown,
    [Card.name]: Card
  },
  data() {
    return {
      searchText: '',
      categories: [
        { id: 1, name: '家用电器', icon: 'https://img11.360buyimg.com/jdphoto/s58x58_jfs/t1/152451/28/12663/4282/60b013c3E2a0476f9/c13e9cb778c08a0e.png' },
        { id: 2, name: '手机数码', icon: 'https://img12.360buyimg.com/jdphoto/s58x58_jfs/t1/121227/26/17698/6374/60b013d3E6d07708e/4075a4040ebbb808.png' },
        { id: 3, name: '电脑办公', icon: 'https://img10.360buyimg.com/jdphoto/s58x58_jfs/t1/122631/20/17814/5055/60b013e0E08efb73f/de1564ec37718ffc.png' },
        { id: 4, name: '家居家装', icon: 'https://img12.360buyimg.com/jdphoto/s58x58_jfs/t1/160538/30/13532/5074/60b013ecE3d5a2d47/75c127f5f243185a.png' },
        { id: 5, name: '美妆护肤', icon: 'https://img11.360buyimg.com/jdphoto/s58x58_jfs/t1/158924/29/13271/4819/60b013f7E40a17010/56b043394c55b08c.png' },
        { id: 6, name: '母婴玩具', icon: 'https://img10.360buyimg.com/jdphoto/s58x58_jfs/t1/157026/31/12815/4532/60b01407E8af96c2a/307d2d22eb686a4a.png' },
        { id: 7, name: '运动户外', icon: 'https://img13.360buyimg.com/jdphoto/s58x58_jfs/t1/147942/30/13131/4741/60b01414E9f7171c6/15a4681514960483.png' },
        { id: 8, name: '汽车用品', icon: 'https://img13.360buyimg.com/jdphoto/s58x58_jfs/t1/121312/3/18105/5193/60b01420E69804107/bb26792a19cb63f1.png' }
      ],
      promotionGoods: [
        { id: 1, title: '华为畅享20 5G手机', image: 'https://img14.360buyimg.com/n7/jfs/t1/162439/32/1514/83155/60c7a0afE268c121f/4e39755f357dd6d8.jpg', currentPrice: '1299', originalPrice: '1499' },
        { id: 2, title: '小米11 5G手机', image: 'https://img14.360buyimg.com/n7/jfs/t1/163522/37/1519/104819/60c7a0c3E1e73bd19/c1179300139a4149.jpg', currentPrice: '3999', originalPrice: '4299' },
        { id: 3, title: 'Apple iPhone 12', image: 'https://img14.360buyimg.com/n7/jfs/t1/158511/36/1491/97373/60c7a0d2E8a168483/c758df47a8bb8184.jpg', currentPrice: '5599', originalPrice: '6299' }
      ],
      recommendedGoods: [
        { id: 101, title: '海尔滚筒洗衣机', image: 'https://img10.360buyimg.com/n7/jfs/t1/162688/2/1517/133645/60c7a0e7E9536f56b/5a681dd3d5a4997e.jpg', currentPrice: '2199' },
        { id: 102, title: '美的智能空调', image: 'https://img10.360buyimg.com/n7/jfs/t1/162929/19/1519/102351/60c7a0f7E9e84f222/2807713fcb677935.jpg', currentPrice: '2799' },
        { id: 103, title: '创维55英寸电视', image: 'https://img11.360buyimg.com/n7/jfs/t1/163079/2/1521/105327/60c7a101E2e377a73/c743870a4635198d.jpg', currentPrice: '2399' },
        { id: 104, title: '苏泊尔电饭煲', image: 'https://img11.360buyimg.com/n7/jfs/t1/163182/4/1522/77932/60c7a116E34965c3e/c270a090856bcdc3.jpg', currentPrice: '399' }
      ]
    };
  },
  mounted() {
    // 模拟加载数据
    setTimeout(() => {
      // 这里可以添加实际的数据加载逻辑
    }, 500);
  }
};
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 50px;

  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .banner-swipe {
    margin-top: 55px;
    height: 180px;

    .banner-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .category-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #fff;

    .category-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;

      .category-icon {
        width: 40px;
        height: 40px;
        margin-bottom: 5px;
      }

      .category-name {
        font-size: 12px;
        color: #333;
      }
    }
  }

  .promotion-section {
    padding: 10px;
    background-color: #fff;
    margin-top: 10px;

    .section-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .countdown {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .countdown-timer {
        color: #f44;
      }
    }

    .promotion-goods {
      display: flex;
      overflow-x: auto;
      padding-bottom: 10px;

      .goods-card {
        min-width: 140px;
        margin-right: 10px;

        .goods-title {
          font-size: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .goods-price {
          display: flex;
          align-items: center;

          .current-price {
            color: #f44;
            margin-right: 5px;
          }

          .original-price {
            color: #999;
            font-size: 12px;
            text-decoration: line-through;
          }
        }
      }
    }
  }

  .recommendation-section {
    padding: 10px;
    background-color: #fff;
    margin-top: 10px;

    .section-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .recommendation-goods {
      display: flex;
      flex-wrap: wrap;

      .goods-card {
        width: calc(50% - 5px);
        margin-bottom: 10px;

        &:nth-child(odd) {
          margin-right: 10px;
        }

        .goods-title {
          font-size: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .goods-price {
          color: #f44;
        }
      }
    }
  }
}
</style>