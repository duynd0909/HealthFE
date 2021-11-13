import axios from "axios";
import config from "../config/index";
const API_HEALTH_REPORT = `${config.apiUrl}/api/health-report`;
const pageSize = 20;
function add(form) {
  return axios.post(`${API_HEALTH_REPORT}/add`, form);
}
function getReportsByUsername(username) {
  return axios.post(
    `${API_HEALTH_REPORT}/get-report-by-username?username=${username}`
  );
}
export async function checkPermissionViewReport() {
  let res = await axios.get(`${API_HEALTH_REPORT}/get-allow-view-report`);
  return res.data.data;
}
function searchUserReport(form, pageIndex) {
  return axios.post(
    `${API_HEALTH_REPORT}/search?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    form
  );
}
function updateAllowViewReport(form) {
  return axios.post(`${API_HEALTH_REPORT}/allow-view-report`, form);
}
export default {
  add,
  getReportsByUsername,
  searchUserReport,
  updateAllowViewReport
};
