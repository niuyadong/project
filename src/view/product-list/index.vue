<template>
  <div class="product-list">
    <!-- 搜索栏 -->
    <van-search
      v-model="searchValue"
      placeholder="请输入商品名称"
      @search="onSearch"
      class="search-bar"
    />

    <!-- 筛选栏 -->
    <van-dropdown-menu class="filter-bar">
      <van-dropdown-item v-model="sortType" :options="sortOptions" @change="onSortChange" />
      <van-dropdown-item v-model="filterType" :options="filterOptions" @change="onFilterChange" />
    </van-dropdown-menu>

    <!-- 产品列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="product-grid"
    >
      <van-grid :column-num="1" :breakpoints="{ 768: 1 }" gutter="10">
        <van-grid-item v-for="item in productList" :key="item.id">
          <van-card
            :title="item.title"
            :desc="item.desc"
            :price="formatPrice(item.price)"
            :thumb="item.thumb"
            class="product-card"
            @click="gotoDetail(item.id)"
          >
            <div slot="footer" class="product-footer">
              <van-tag type="danger" v-if="item.discount">{{ item.discount }}折</van-tag>
              <span class="sales-volume">销量: {{ item.sales }}+</span>
            </div>
          </van-card>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
import { Search, DropdownMenu, DropdownItem, List, Grid, GridItem, Card, Tag, Toast } from 'vant';
import productData from './js/productData.json';

export default {

  components: {
    [Search.name]: Search,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Card.name]: Card,
    [Tag.name]: Tag
  },
  data() {
    return {
      searchValue: '',
      sortType: 'default',
      filterType: 'all',
      productList: [],
      loading: false,
      finished: false,
      page: 1,
      pageSize: 10,
      sortOptions: [
        { text: '默认排序', value: 'default' },
        { text: '价格从低到高', value: 'price-asc' },
        { text: '价格从高到低', value: 'price-desc' },
        { text: '销量从高到低', value: 'sales-desc' }
      ],
      filterOptions: [
        { text: '全部商品', value: 'all' },
        { text: '家电', value: 'appliance' },
        { text: '数码', value: 'digital' },
        { text: '服装', value: 'clothing' },
        { text: '食品', value: 'food' }
      ]
    };
  },
  mounted() {
    this.loadProductList();
  },
  methods: {
    formatPrice(price) {
      return '¥' + (price / 100).toFixed(2);
    },
    loadProductList() {
      // 模拟API请求
      setTimeout(() => {
        const start = (this.page - 1) * this.pageSize;
        const end = start + this.pageSize;
        let filteredData = [...productData];

        // 筛选逻辑
        if (this.filterType !== 'all') {
          filteredData = filteredData.filter(item => item.category === this.filterType);
        }

        // 排序逻辑
        switch (this.sortType) {
          case 'price-asc':
            filteredData.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filteredData.sort((a, b) => b.price - a.price);
            break;
          case 'sales-desc':
            filteredData.sort((a, b) => b.sales - a.sales);
            break;
          default:
            // 默认排序（按ID）
            filteredData.sort((a, b) => a.id - b.id);
        }

        // 搜索逻辑
        if (this.searchValue) {
          const keyword = this.searchValue.toLowerCase();
          filteredData = filteredData.filter(
            item => item.title.toLowerCase().includes(keyword) || item.desc.toLowerCase().includes(keyword)
          );
        }

        const newItems = filteredData.slice(start, end);
        this.productList = this.page === 1 ? newItems : [...this.productList, ...newItems];
        this.loading = false;

        // 数据是否加载完毕
        if (newItems.length < this.pageSize) {
          this.finished = true;
        } else {
          this.page++;
        }
      }, 500);
    },
    onLoad() {
      this.loadProductList();
    },
    onSortChange() {
      this.resetList();
    },
    onFilterChange() {
      this.resetList();
    },
    onSearch() {
      this.resetList();
    },
    resetList() {
      this.page = 1;
      this.finished = false;
      this.productList = [];
      this.loadProductList();
    },
    gotoDetail(id) {
      this.$router.push({ name: 'goods', params: { id } });
      Toast(`查看商品ID: ${id} 的详情`);
    }
  }
};
</script>

<style lang="less" scoped>
.product-list {
  padding-bottom: 50px;
  @media (max-width: 768px) {
    // .filter-bar {
    //   padding: 0 10px;
    // }
    .product-grid {
        padding: 5px;
      }
      .product-card {
        max-width: 330px;
        .van-card__title {
          font-size: 13px;
        }
        .van-card__desc {
          font-size: 14px;
        }
        .van-card__thumb img {
          height: 160px;
        }
      }
  }

  .search-bar {
    padding: 10px;
    background-color: #f5f5f5;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .filter-bar {
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 44px;
    z-index: 10;
    background-color: #fff;
  }

  

  .product-grid {
    padding: 10px;
  }

  .product-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    .van-card__thumb {
      padding: 10px;
      background-color: #f8f8f8;
      img {
        width: 100%;
        height: 120px;
        object-fit: contain;
      }
    }
    .van-card__content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .van-card__title {
      font-size: 14px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .van-card__desc {
      color: #f44;
      font-weight: bold;
      margin-top: 5px;
    }
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
    .sales-volume {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>