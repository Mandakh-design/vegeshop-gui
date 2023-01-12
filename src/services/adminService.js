import axios from "axios";

const saveCategory = (data) => axios.post(`/saveCategory`, data);
const getCategory = (data) => axios.get(`/getCategory`, { params: data });

const savePackage = (data) => axios.post(`/api/v1/package`, data);
const getPackage = (data) => axios.get(`/api/v1/package`, { params: data });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveCategory,
  getCategory,
  savePackage,
  getPackage,
};
