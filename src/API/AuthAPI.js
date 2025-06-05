import axios from "axios";

export const loginAPI = async (accessToken) => {
  try {
    console.log("accessToken", accessToken);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth`,
      { googleToken: accessToken.access_token },
      { headers: { "Content-Type": "application/json" } }
    );

    sessionStorage.setItem("refreshToken", response.data.refreshToken);
    sessionStorage.setItem("accessToken", response.data.accessToken);

    return response.data.register;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};

export const registerAPI = async (registerInfo) => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("registerInfo", registerInfo);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user`,
      {
        name: registerInfo.name,
        gender: registerInfo.gender,
        studentId: registerInfo.studentId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response);

    // return response.data.register;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};
