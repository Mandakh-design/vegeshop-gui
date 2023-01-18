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
const deletePackageDtl = (data) => axios.post(`/api/v1/deletePackageDtl`, data);

const savePackageDtl = (data) => axios.post(`/api/v1/savePackageDtl`, data);
const getScheduleList = (data) =>
  axios.get(`/api/v1/getScheduleList`, { params: data });
const getLocationList = (data) =>
  axios.get(`/api/v1/getLocation`, { params: data });
const getDistrictList = (data) =>
  axios.get(`/api/v1/getDistrict`, { params: data });
const getKhorooList = (data) =>
  axios.get(`/api/v1/getKhoroo`, { params: data });
const saveLocation = (data) => axios.post(`/api/v1/saveLocation`, data);
const deleteLocation = (data) => axios.post(`/api/v1/deleteLocation`, data);
const deleteSchedule = (data) => axios.post(`/api/v1/deleteSchedule`, data);
const deleteLocationMap = (data) =>
  axios.post(`/api/v1/deleteLocationMap`, data);
// S service
const getUserList = () => axios.get(`api/v1/getUserList`);
const saveUser = (data) => axios.put(`api/v1/saveUser`, data);
const saveSchedule = (data) => axios.post(`/api/v1/saveSchedule`, data);
const getScheduleLocationList = (data) =>
  axios.get(`/api/v1/getScheduleLocationList`, { params: data });
const saveScheduleLocationMap = (data) =>
  axios.post(`/api/v1/saveScheduleLocationMap`, data);

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
  deletePackageDtl,
  getScheduleList,
  getLocationList,
  getDistrictList,
  getKhorooList,
  deleteSchedule,
  saveLocation,
  deleteLocation,
  deleteLocationMap,
  saveSchedule,
  getScheduleLocationList,
  saveScheduleLocationMap,

  // S service
  getUserList,
  saveUser,
};
