import axios from "axios";

export const useInquiryInstance = () => {

    const axiosInquiryInstance = axios.create({
        baseURL: "http://localhost:5004/api/inquiry",
    })
    return axiosInquiryInstance
}