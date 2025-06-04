import axios from "axios";

export const loginAPI = async (accessToken) => {
    try {
        console.log("accessToken", accessToken);
        const response = await axios.post("http://192.168.1.134:8080/auth", { googleToken: accessToken.access_token }, { headers: { "Content-Type": "application/json" } });

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
        const response = await axios.post("http://192.168.1.134:8080/user",
            { name: registerInfo.name, gender: registerInfo.gender, studentId: registerInfo.studentId },
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` } });

        console.log(response);

        // return response.data.register;
        
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};