import axios from 'axios';

const useAxiosPrivateBlog = () => {

  const axiosPrivateblog = axios.create({
    baseURL: "http://localhost:5004/api/blog",
  });
  
  return axiosPrivateblog;
  
};

export default useAxiosPrivateBlog;
