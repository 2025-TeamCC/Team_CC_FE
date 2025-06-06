import axios from "axios";

export const codeVerifyAPI = async (inviteCode) => {
  try {
    ``;
    const accessToken = sessionStorage.getItem("accessToken");
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/event/code`,
      { inviteCode },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};

export const attendAPI = async (postAttendInfo) => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/event/join`,
      postAttendInfo,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};
