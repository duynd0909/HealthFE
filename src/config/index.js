const config = {
  apiUrl: "https://back-end-health.herokuapp.com:46068",
  CLIENT_URL: "https://front-end-health.herokuapp.com:8080",
  SCREEN_CODE: {
    ROLE_MANAGEMENT: "ROLE_MANAGEMENT",
    ADMIN_ACTION: "ADMIN_ACTION",
    USER_MANAGEMENT: "USER_MANAGEMENT",
    CLASS_MANAGEMENT: "CLASS_MANAGEMENT",
    SYSTEM_CONFIG: "SYSTEM_CONFIG",
  },
  PERMISSION_SCREEN_MAP: {
    UserRoleManagement: "ROLE_MANAGEMENT",
  },
  LOGIN_URL: "https://front-end-health.herokuapp.com:8080/authenticate",
  DISPLAY_SCREEN_MAP: {
    ADMIN_ACTION: "HIEU_TRUONG,HIEU_PHO,GIAO_VIEN_CHU_NHIEM",
    USER_MANAGEMENT: "HIEU_TRUONG,HIEU_PHO,GIAO_VIEN_CHU_NHIEM",
    CLASS_MANAGEMENT: "HIEU_TRUONG,HIEU_PHO,GIAO_VIEN_CHU_NHIEM",
    SYSTEM_CONFIG: "HIEU_TRUONG",
  },
};
export default config;
