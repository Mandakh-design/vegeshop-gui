import axios from "axios";

const login = (data) => axios.post(`/api/v1/login`, data);
const getLoggedUser = (data) => axios.get(`/api/v1/getLoggedUser`);
const sendMsgPass = (data) => axios.post(`/api/v1/customer/otp`, data);

const saveCategory = (data) => axios.post(`/saveCategory`, data);
const getCategory = (data) => axios.get(`/getCategory`, { params: data });

const savePackage = (data) => axios.post(`/api/v1/package`, data);
const getPackage = (data) => axios.get(`/api/v1/package`, { params: data });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  getLoggedUser,
  sendMsgPass,
  saveCategory,
  getCategory,
  savePackage,
  getPackage,
};
