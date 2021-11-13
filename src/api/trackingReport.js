import axios from "axios";
import config from "../config/index";
const API_HEALTH_FORM_REPORT = `${config.apiUrl}/api/tracking-report`;

function add(form) {
  return axios.post(`${API_HEALTH_FORM_REPORT}/add`, form);
}

function getTrackingReportByUsername(username) {
  return axios.get(
    `${API_HEALTH_FORM_REPORT}/get-list-by-username?username=${username}`
  );
}
export default {
  add,
  getTrackingReportByUsername,
};
