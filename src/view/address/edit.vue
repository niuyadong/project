<template>
  <div class="address-edit-container">
    <!-- 头部 -->
    <div class="header">
      <span class="header-left" @click="goBack">取消</span>
      <span class="header-title">编辑地址</span>
      <span class="header-right" @click="saveAddress" :class="{ 'disabled': !canSave }">保存</span>
    </div>

    <!-- 表单 -->
    <van-form @submit="saveAddress">
      <!-- 收货人 -->
      <van-field
        v-model="form.name"
        name="name"
        label="收货人"
        placeholder="请输入收货人姓名"
        :rules="[{ required: true, message: '请输入收货人姓名' }]"
      />

      <!-- 手机号码 -->
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号码"
        placeholder="请输入手机号码"
        type="tel"
        :rules="[{ required: true, message: '请输入手机号码' }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }]"
      />

      <!-- 地区选择 -->
      <van-field
        v-model="regionText"
        name="region"
        label="所在地区"
        placeholder="请选择地区"
        @click="showRegionPicker"
        :rules="[{ required: true, message: '请选择地区' }]"
      />
      <van-popup v-model="regionPickerVisible" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onRegionConfirm"
          @cancel="regionPickerVisible = false"
        />
      </van-popup>

      <!-- 详细地址 -->
      <van-field
        v-model="form.detail"
        name="detail"
        label="详细地址"
        placeholder="请输入详细地址"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      />
    </van-form>
  </div>
</template>

<script>
// 引入地区数据，确认正确路径
import areaList from '../../utils/area.json';

export default {
  data() {
    return {
      form: {
        name: '张三',
        phone: '13800138000',
        province: '广东省',
        city: '深圳市',
        district: '南山区',
        detail: '科技园路1号'
      },
      regionText: '广东省 深圳市 南山区',
      regionPickerVisible: false,
      areaList: areaList
    };
  },
  computed: {
    canSave() {
      return (
        this.form.name &&
        this.form.phone &&
        this.form.province &&
        this.form.city &&
        this.form.district &&
        this.form.detail
      );
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showRegionPicker() {
      this.regionPickerVisible = true;
    },
    onRegionConfirm(values) {
      const { province, city, district } = values;
      this.form.province = province;
      this.form.city = city;
      this.form.district = district;
      this.regionText = `${province} ${city} ${district}`;
      this.regionPickerVisible = false;
    },
    saveAddress() {
      // 保存地址逻辑
      // 实际项目中可能需要调用API保存到服务器
      Toast('地址保存成功');
      // 返回上一页
      setTimeout(() => {
        this.$router.go(-1);
      }, 1500);
    }
  }
};
</script>

<style lang="less" scoped>
.address-edit-container {
  padding-bottom: 20px;
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

  .header-left,
  .header-right {
    font-size: 16px;
    color: #1989fa;
    padding: 5px 10px;
  }

  .header-title {
    font-size: 18px;
    font-weight: bold;
  }

  .disabled {
    color: #c9c9c9;
  }
}

.van-form {
  background-color: #fff;
  padding: 15px;
  margin-top: 10px;
  border-radius: 8px;
}

.van-field {
  margin-bottom: 15px;
}
</style>