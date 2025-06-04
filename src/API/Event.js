import axios from "axios";

export const eventListAPI = async () => {
    try {

        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get("http://192.168.1.134:8080/event",
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` } });

        // console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};


export const postEventAPI = async (eventInfo) => {
    try {

        const accessToken = sessionStorage.getItem("accessToken");
        await axios.post("http://192.168.1.134:8080/event",
            eventInfo,
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` } });

        // console.log(response.data);

        // return response.data.register;
        
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};


export const eventAPI = async (eventId) => {
    try {

        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(`http://192.168.1.134:8080/event/detail?eventId=${eventId}`,
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` } });

        // console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};
