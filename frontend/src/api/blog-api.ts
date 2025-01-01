import axios from 'axios';

const useAxiosPrivateBlog = () => {

  const axiosPrivateblog = axios.create({
    baseURL: "http://localhost:5000/api/blog",
  });
  
  return axiosPrivateblog;
  
};

export default useAxiosPrivateBlog;
