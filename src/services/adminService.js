import axios from "axios";

const saveCategory = (data) => axios.post(`/saveCategory`, data);
const getCategory = (data) => axios.get(`/getCategory`, { params: data });

const savePackage = (data) => axios.post(`/api/v1/package`, data);
const getPackage = (data) => axios.get(`/api/v1/package`, { params: data });
const deletePackage = (data) => axios.post(`/api/v1/deletePackage`, data);

const saveProduct = (data) => axios.post(`/api/v1/saveProduct`, data);
const getProduct = (data) => axios.get(`/api/v1/getProduct`, { params: data });
const deleteProduct = (data) => axios.post(`/api/v1/deleteProduct`, data);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveCategory,
  getCategory,
  savePackage,
  getPackage,
  deletePackage,
  saveProduct,
  getProduct,
  deleteProduct,
};
