import axios from "axios";

const postMethod = async (endPoint, data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1` + endPoint,
      data
    );

    if (response?.status == 200 || response?.status == 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default postMethod;
