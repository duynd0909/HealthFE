<template>
  <card type="user">
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img
          v-if="!user.gender"
          class="avatar"
          src="../../assets/img/anime6.png"
          alt="..."
        />
        <img
          v-else
          class="avatar"
          src="../../assets/img/anime3.png"
          alt="..."
        />

        <h5 class="title">{{ user.fullName }}</h5>
      </a>
      <p class="description">
        {{ user.phoneNumber }}
      </p>
    </div>
    <p class="card-description">
      {{ user.addressDetail }}
    </p>
    <vue-qrcode v-if="url" :value="url" :options="{ width: 200 }" />
    <h4 class="card-description">Quét QR để khai báo</h4>
    <div slot="footer" class="row button-container">
      <div class="col-4">
        <base-button type="info" icon size="lg" class="btn-facebook">
          <i class="fas fa-qrcode fa-lg"></i>
        </base-button>
        <br />
        <b>Quản lý QR</b>
      </div>
      <div class="col-4">
        <base-button type="success" @click="goToReport()" icon size="lg">
          <a-icon style type="file-add" />
        </base-button>
        <br />
        <b>Khai báo</b>
      </div>
      <div class="col-4">
        <base-button type="warning" icon size="lg">
          <a-icon type="message" theme="filled" />
        </base-button>
        <br />
        <b> Phản hồi hệ thống</b>
      </div>
      <a-modal
        title="Chọn khai báo: "
        v-model="openReportModel"
        :footer="null"
        :centered="true"
      >
        <a-row :gutter="[24, 16]">
          <a-col :span="12">
            <a
              href="javascript:void(0)"
              class="health-report-cus-btn"
              @click="goToHealthReport()"
            >
              <div>
                <base-button
                  type="success"
                  @click="goToHealthReport()"
                  icon
                  size="lg"
                >
                  <a-icon style type="file-text" />
                </base-button>
              </div>
              <div>
                <b class="name-button-cus"> Khai báo y tế</b>
              </div>
            </a>
          </a-col>
          <a-col :span="12">
            <a
              href="javascript:void(0)"
              class="tracking-cus-btn"
              @click="goToTrackingReport()"
            >
              <div>
                <base-button
                  type="success"
                  @click="goToTrackingReport()"
                  icon
                  size="lg"
                >
                  <a-icon style type="car" />
                </base-button>
              </div>
              <div>
                <b class="name-button-cus"> Khai báo di chuyển</b>
              </div>
            </a>
          </a-col>
        </a-row>
      </a-modal>
    </div>
  </card>
</template>
<script>
import { Card } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import CONFIG from "../../config/index";

export default {
  components: {
    Card,
    BaseButton,
    VueQrcode,
  },
  data() {
    return {
      openReportModel: false,
      url: `${CONFIG.CLIENT_URL}/#/declare`,
    };
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    goToReport() {
      // this.$router.push("declare");
      this.openReportModel = true;
    },
    goToHealthReport() {
      this.$router.push("declare");
    },
    goToTrackingReport() {
      this.$router.push("move-declare");
    },
  },
};
</script>
<style scoped lang="scss">
.anticon {
  // margin-right: 6px;
  font-size: 22px;
}
.name-button-cus {
  margin-left: 10px;
  color: #000;
  font-weight: bold;
}
</style>
<style>
.health-report-cus-btn {
  text-align: center !important;
}
.tracking-cus-btn {
  text-align: center !important;
}
.health-report-cus-btn .btn-success {
  background-image: linear-gradient(
    to bottom left,
    #7bdf35,
    #4cb582,
    #7965d9
  ) !important;
}
.tracking-cus-btn .btn-success {
  background-image: linear-gradient(
    to bottom left,
    #67a25a,
    #cfdc3b,
    #7965d9
  ) !important;
}
.ant-menu-item-selected {
  background-color: rgb(82 187 100) !important;
  color: white !important;
}
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  border-right: 3px solid white;
}
</style>
