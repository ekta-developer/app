import axios from "axios";
const BASE_URL = "http://localhost:8000/api/";
const userToken = localStorage.getItem("accessToken");
const url="http://192.168.23.3/patangg/api/store"
const token = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + `${userToken}`,
    },
  };

//user-list
  export const getUserListApi = async (data) => {
    return await axios.get(`${BASE_URL}userList`, data);
  };

  export const formAPI = async (data) => {
    return await axios.get(`${url}category`, data);
  };

//   //*create user
// export const createUserAPI = async (data) => {
//   return await axios.post(`${BASE_URL}createUser`, data);
// }

export const createUserAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}createUser`, formData);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Rethrow to let caller handle it as well
  }
}