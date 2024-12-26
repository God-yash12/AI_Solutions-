import axios from 'axios';

const useAxiosPrivateEvent = () => {

  const axiosPrivate = axios.create({
    baseURL: "http://localhost:5004/api/admin",
  });
  
  return axiosPrivate;
  
};

export default useAxiosPrivateEvent;
