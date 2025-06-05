import axios from "axios";

export const eventListAPI = async () => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/event`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });

        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const postEventAPI = async (eventInfo) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        await axios.post(`${process.env.REACT_APP_API_URL}/event`, eventInfo, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });

        // console.log(response.data); return response.data.register;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};
export const eventAPI = async (eventId) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/event/detail?eventId=${eventId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      let extendedData = { ...response.data };
  
      if (response?.data?.isPaired === "ING") {
        const res = await getIsSelectMember(eventId);
        extendedData.isSelected = res?.isSelected ?? false; // 없으면 false 처리
      }
  
      console.log(extendedData);
      return extendedData;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };
  

export const memberAPI = async (eventId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/event/member?eventId=${eventId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const postSelectMissionListAPI = async (eventId, missionList) => {
    console.log(missionList);
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        await axios.post(`${process.env.REACT_APP_API_URL}/mission/board`, {
            eventId: eventId,
            missionId: missionList
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });

        // console.log(response.data); return response.data.register;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const postStartMatching = async (eventId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/pairing?eventId=${eventId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(response);
        // console.log(response.data); return response.data.register;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const getIsSelectMember = async (eventId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pairing?eventId=${eventId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const putSelectMember = async (eventId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/pairing/select?eventId=${eventId}`, null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const getRank = async (eventId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/score?eventId=${eventId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const getPairMissionListInfo = async (eventId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/mission/pair?eventId=${eventId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};


export const getPairMissionDetailInfo = async (missionId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/mission/detail?missionId=${missionId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const postPairMission = async (pairMissionInfo) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/mission/submit`, pairMissionInfo, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(response);
        // console.log(response.data); return response.data.register;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};