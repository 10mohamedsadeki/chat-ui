// chat.js
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;


export async function getChatList() {
  return axios.get(`${API}/chat/list`);
}


export async function getChatByUserId(userId) {
  return axios.get(`${API}/chatByUserId/${userId}`);
}


export async function addNewChat({ fromUser, toUser, message }) {
  return axios.post(`${API}/chat/add`, {
    fromUser,
    toUser,
    message,
  });
}


export async function getUserDetails(userId) {
  return axios.get(`${API}/user/${userId}`);
}

export async function sendMessage(fromUser, toUser, message) {
  return axios.post(`${API}/chat/add`, {
    fromUser,
    toUser,
    message
  });
}
