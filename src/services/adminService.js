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
const getPackageWithDtl = (data) =>
  axios.get(`/api/v1/getPackageWithDtl`, { params: data });
const deletePackage = (data) => axios.post(`/api/v1/deletePackage`, data);

const saveProduct = (data) => axios.post(`/api/v1/saveProduct`, data);
const getProduct = (data) => axios.get(`/api/v1/getProduct`, { params: data });
const deleteProduct = (data) => axios.post(`/api/v1/deleteProduct`, data);
const getProductById = (data) =>
  axios.get(`/api/v1/getProductById`, { params: data });
const getProductDetailListById = (data) =>
  axios.get(`/api/v1/getProductDetailListById`, { params: data });
const saveProductDetail = (data) =>
  axios.post(`/api/v1/saveProductDetail`, data);

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

const getOrderInvoiceInfo = (data) =>
  axios.get(`/api/v1/getOrderInvoiceInfo`, { params: data });

const saveSchedule = (data) => axios.post(`/api/v1/saveSchedule`, data);
const getScheduleLocationList = (data) =>
  axios.get(`/api/v1/getScheduleLocationList`, { params: data });
const saveScheduleLocationMap = (data) =>
  axios.post(`/api/v1/saveScheduleLocationMap`, data);
const getOrderDetail = (data) =>
  axios.get(`/api/v1/getOrderDetail`, { params: data });
const addProductToScheduleOrder = (data) =>
  axios.post(`/api/v1/addProductToScheduleOrder`, data);
const deleteProductDetail = (data) =>
  axios.post(`/api/v1/deleteProductDetail`, data);

const getLandingProduct = () => axios.post(`/api/v1/getLandingProduct`);
const searchData = (data) => axios.post(`/api/v1/searchData`, data);
const deleteOrderDtl = (data) => axios.post(`/api/v1/deleteOrderDtl`, data);
const createInvoice = (data) => axios.post(`/api/v1/createInvoice`, data);
const submitOrder = (data) => axios.post(`/api/v1/submitOrder`, data);
const submitLocation = (data) => axios.post(`/api/v1/submitLocation`, data);
const changeOrderStep = (data) => axios.post(`/api/v1/changeOrderStep`, data);
const saveProductDetailOrder = (data) =>
  axios.post(`/api/v1/saveProductDetailOrder`, data);
const changeScheduleDetail = (data) =>
  axios.post(`/api/v1/changeScheduleDetail`, data);

const config = {
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const uploadImages = (data) => axios.post(`/api/v1/upload`, data, config);

// S service
const getUserList = () => axios.get(`api/v1/getUserList`);
const saveUser = (data) => axios.put(`api/v1/saveUser`, data);

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
  getProductById,
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
  submitLocation,
  getScheduleLocationList,
  saveScheduleLocationMap,
  getOrderInvoiceInfo,
  getOrderDetail,
  addProductToScheduleOrder,
  getLandingProduct,
  searchData,
  getPackageWithDtl,
  deleteOrderDtl,
  createInvoice,
  submitOrder,
  changeOrderStep,
  uploadImages,
  saveProductDetail,
  deleteProductDetail,
  getProductDetailListById,
  saveProductDetailOrder,
  changeScheduleDetail,

  // S service
  getUserList,
  saveUser,
};
