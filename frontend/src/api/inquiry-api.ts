import axios from "axios";

export const useInquiryInstance = () => {

    const axiosInquiryInstance = axios.create({
        baseURL: "http://localhost:5000/api/inquiry",
    })
    return axiosInquiryInstance
}