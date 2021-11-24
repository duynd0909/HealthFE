<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->

    <side-bar class="side-bar-custom" v-if="checkToken">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/home-page">
        <i class="tim-icons icon-single-02"></i>
        <template>
          <p>Trang chủ</p>
        </template>
      </sidebar-link>
      <!-- <sidebar-link to="/dashboard">
        <i class="tim-icons icon-chart-pie-36"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link> -->
      <sidebar-link
        to="/health-report"
        v-if="allowViewReport || role === 'HIEU_TRUONG'"
      >
        <a-icon type="snippets" />
        <template>
          <p>Quản lý khai báo</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/class-management" v-if="allowClassManagement">
        <i class="tim-icons icon-bank"></i>
        <template>
          <p>Quản lý lớp học</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/teacher-management" v-if="allowTeacherManagement">
        <i class="tim-icons icon-single-02"></i>
        <template>
          <p>Quản lý giáo viên</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/user-management" v-if="allowStudentManagement">
        <i class="tim-icons icon-single-02"></i>
        <template>
          <p>Quản lý học sinh</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/change-password">
        <a-icon type="key" />
        <template>
          <p>Đổi mật khẩu</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/login/true">
        <a-icon type="logout" />
        <template>
          <p>Đăng xuất</p>
        </template>
      </sidebar-link>
    </side-bar>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";
import { checkPermissionViewReport } from "../../api/healthReport";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
  },
  data() {
    return {
      backgroundColor: "green",
      allowViewReport: false,
      allowClassManagement: false,
      allowTeacherManagement: false,
      allowStudentManagement: false,
      role: this.$cookies.get("role"),
    };
  },
  computed: {
    checkToken() {
      if (this.$cookies.get("accessToken")) {
        return true;
      }
      return false;
    },
  },
  created() {
    var roleCode = this.$cookies.get("role");
    if (roleCode) {
      if (roleCode === "HIEU_TRUONG" || roleCode === "HIEU_PHO") {
        this.allowClassManagement = true;
        this.allowTeacherManagement = true;
        this.allowStudentManagement = true;
      } else if (roleCode === "GIAO_VIEN_CHU_NHIEM") {
        this.allowStudentManagement = true;
      }
    }
    this.checkPermissionViewReport();
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    async checkPermissionViewReport() {
      this.allowViewReport = await checkPermissionViewReport();
    },
  },
};
</script>

<style>
.sidebar-wrapper {
  background-color: rgb(82 187 100) !important;
}
</style>
