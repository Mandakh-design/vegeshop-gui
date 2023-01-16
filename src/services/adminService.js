import axios from "axios";

// Ga service
const login = (data) => axios.post(`/api/v1/login`, data);
const getLoggedUser = (data) => axios.get(`/api/v1/getLoggedUser`);
const sendMsgPass = (data) => axios.post(`/api/v1/customer/otp`, data);

// Ma service
const saveCategory = (data) => axios.post(`/api/v1/saveCategory`, data);
const getCategory = (data) => axios.get(`/api/v1/category`, { params: data });

const savePackage = (data) => axios.post(`/api/v1/package`, data);
const getPackage = (data) => axios.get(`/api/v1/package`, { params: data });
const deletePackage = (data) => axios.post(`/api/v1/deletePackage`, data);

const saveProduct = (data) => axios.post(`/api/v1/saveProduct`, data);
const getProduct = (data) => axios.get(`/api/v1/getProduct`, { params: data });
const deleteProduct = (data) => axios.post(`/api/v1/deleteProduct`, data);

const getProductListByCategory = (data) =>
  axios.get(`/api/v1/getProductListByCategory`, { params: data });

const getProductListFormPackage = (data) =>
  axios.get(`/api/v1/getProductListFormPackage`, { params: data });

const savePackageDtl = (data) => axios.post(`/api/v1/savePackageDtl`, data);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // G service
  login,
  getLoggedUser,
  sendMsgPass,

  // M service
  saveCategory,
  getCategory,
  savePackage,
  getPackage,
  deletePackage,
  saveProduct,
  getProduct,
  deleteProduct,
  getProductListByCategory,
  getProductListFormPackage,
  savePackageDtl,
};
