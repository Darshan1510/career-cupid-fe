import axios from "axios";

const requestHeaders = {
  Authorization: "Bearer YOUR_ACCESS_TOKEN",
  "Content-Type": "application/json",
};

export async function httpRequest(url, method, headers = {}, params = {}, data = {}) {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: { ...headers, ...requestHeaders },
      params: params,
      data: data,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error making request:", error);
    throw error; // Re-throwing the error for the caller to handle
  }
}
