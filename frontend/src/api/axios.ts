import axios, { AxiosInstance} from "axios";


const useAxiosPrivate = (): AxiosInstance => {
  const axiosPrivate: AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/admin",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return axiosPrivate;
};

export default useAxiosPrivate;
