<template>
  <div class="content">
    <a-spin :spinning="loadingModal">
      <a-icon type="loading" slot="indicator" style="font-size: 24px" spin />
      <card>
        <template slot="header">
          <h4 class="card-title justify-content-center">Điền thông tin</h4>
        </template>
        <div class="table-responsive text-left declard-form-cus">
          <a-row :gutter="[24, 16]">
            <a-col :span="8">Mật khẩu hiện tại </a-col>
            <a-col :span="16">
              <a-input-password
                v-model="changePassForm.oldPassword"
                placeholder="Nhập mật khẩu"
              >
              </a-input-password>
              <span v-if="errors.oldPassword" class="red">
                {{ errors.oldPassword }}
              </span>
            </a-col>
          </a-row>
          <a-row :gutter="[24, 16]">
            <a-col :span="8">Mật khẩu mới </a-col>
            <a-col :span="16">
              <a-input-password
                v-model="changePassForm.newPassword"
                placeholder="Nhập mật khẩu"
              >
              </a-input-password>
              <span v-if="errors.newPassword" class="red">
                {{ errors.newPassword }}
              </span>
            </a-col>
          </a-row>
          <a-row :gutter="[24, 16]">
            <a-col :span="8">Xác nhận mật khẩu mới </a-col>
            <a-col :span="16">
              <a-input-password
                v-model="changePassForm.confirmPassword"
                placeholder="Nhập mật khẩu"
              >
              </a-input-password>
              <span v-if="errors.confirmPassword" class="red">
                {{ errors.confirmPassword }}
              </span>
            </a-col>
          </a-row>
          <br />
          <a-button
            type="primary"
            html-type="submit"
            style="
              border: 0px solid !important;
              border-radius: 25px !important;
              background-color: #1fc45c;
            "
            @click="submitHealthReport"
          >
            Đổi mật khẩu
          </a-button>
        </div>
      </card>
    </a-spin>
  </div>
</template>
<script>
import UserRepository from "../api/user.js";
import { Card } from "@/components/index";

const requiredError = "Không được để trống thông tin này!";

const defaultInputErrors = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const defaultChangePassForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default {
  components: {
    Card,
  },
  data() {
    return {
      loadingModal: false,
      modalChangePassword: false,
      changePassForm: { ...defaultChangePassForm },
      errors: { ...defaultInputErrors },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    validateChangePassword() {
      let isValid = true;
      this.errors = { ...defaultInputErrors };
      if (
        this.changePassForm.oldPassword == "" ||
        this.changePassForm.oldPassword == null ||
        this.changePassForm.oldPassword == undefined
      ) {
        this.errors.oldPassword = requiredError;
        isValid = false;
      }
      if (
        this.changePassForm.newPassword == "" ||
        this.changePassForm.newPassword == null ||
        this.changePassForm.newPassword == undefined
      ) {
        this.errors.newPassword = requiredError;
        isValid = false;
      }
      if (
        this.changePassForm.confirmPassword == "" ||
        this.changePassForm.confirmPassword == null ||
        this.changePassForm.confirmPassword == undefined
      ) {
        this.errors.confirmPassword = requiredError;
        isValid = false;
      }
      return isValid;
    },
    submitHealthReport() {
      this.loadingModal = true;
      const validation = this.validateChangePassword();
      if (!validation) {
        this.loadingModal = false;
        return;
      }
      if (
        this.changePassForm.newPassword !== this.changePassForm.confirmPassword
      ) {
        this.errors.confirmPassword = "Mât khẩu không trùng khớp";
        this.loadingModal = false;
        return;
      }
      let changePasswordForm = {
        username: this.$cookies.get("username"),
        oldPassword: this.changePassForm.oldPassword,
        newPassword: this.changePassForm.newPassword,
        confirmPassword: this.changePassForm.confirmPassword,
      };
      UserRepository.changeYourPassword(changePasswordForm)
        .then((res) => {
          if (res.data.data !== "Mật khẩu không hợp lệ") {
            this.loadingModal = false;
            this.$notification.success({
              message: "Đổi mật khẩu thành công!",
            });
            this.clearData();
          } else {
            this.loadingModal = false;
            this.$notification.error({
              message: res.data.data
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$notification.error({
            message: error
          });
        });
    },
    clearData() {
      this.errors = { ...defaultInputErrors };
      this.changePassForm = { ...defaultChangePassForm };
    },
  },
};
</script>
<style></style>
