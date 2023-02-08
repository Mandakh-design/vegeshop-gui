import axios from "axios";

// Ga service
const getOrderDetailCount = (data) => axios.get(`/api/v1/getOrderDetailCount`);

const getOrderDetail = (data) => axios.get(`/api/v1/getOrderDetail`, { params: data });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // G service
  getOrderDetailCount,
  getOrderDetail
};
