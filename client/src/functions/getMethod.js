import axios from "axios";

const GetMethod = async (endPoint) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1` + endPoint,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.status === 200 || response?.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export default GetMethod;
