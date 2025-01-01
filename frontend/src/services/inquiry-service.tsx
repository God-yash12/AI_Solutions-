import { useMutation, useQuery } from "@tanstack/react-query";
import { useInquiryInstance } from "../api/inquiry-api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

type InquiryProps = {
  _id: string;
  title: string;
  email: string;
  description: string;
};

interface ResponseMessage {
  responseMessage: string;
  email: string;
  id: string;
}

export const useInquiryServices = () => {
  const inquiryInstance = useInquiryInstance();

  // Fetch all inquiries
  const getAllInquiries = async (): Promise<InquiryProps[]> => {
    const response = await inquiryInstance.get("/get-inquiries");
    return response.data.data;
  };

  const { data, isLoading, error } = useQuery<InquiryProps[], Error>({
    queryKey: ["inquiries"],
    queryFn: getAllInquiries,
  });

  // Mutation for responding to an inquiry
  const { mutateAsync: respondToInquiry } = useMutation({
    mutationFn: async (data: ResponseMessage) => {
      const response = await inquiryInstance.post(`/respond-inquiry/${data.id}`, data);
      return response;
    },
    onSuccess: () => {
      toast.success("Response sent successfully!");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      toast.error(axiosError?.response?.data?.message || "Failed to send response, please try again later.");
    },
  });

  // Handle submitting response to an inquiry
  const onSubmit = async (data: ResponseMessage) => {
    await respondToInquiry(data); // Use respondToInquiry for submitting response
  };


  // Handle submitting a new inquiry
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryProps>({
    mode: "onChange",
    defaultValues: {
      title: "",
      email: "",
      description: "",
    },
  });

  // Mutation for creating a new inquiry
  const { mutateAsync: createInquiry } = useMutation({
    mutationFn: async (data: InquiryProps) => {
      const response = await inquiryInstance.post("/create-inquiry", data);
      return response;
    },
    onSuccess: () => {
      reset()
      toast.success("Inquiry Sent Successfully, You will get a response soon!");
    },
    onError: (error) => {
      console.error("Inquiry submit error", error);
      toast.error("Failed to submit inquiry. Please try again.");
    },
  });


  const handleInquirySubmit = async (data: InquiryProps) => {
    await createInquiry(data);
  };

  // delete inqruies 
  const {mutateAsync: deleteMutation} = useMutation({
    mutationFn: async (id: string) => {

      if (!id) {
        toast.error("Inquiry doesnot found ")
      }
      const response = await inquiryInstance.delete(`/delete-inquiry/${id}`)
      return response.data;
    },
    onSuccess: () => {
      toast.success("Inquiry Deleted Successfully")
    },
    onError: (error: any) => {
      toast.error(`Failed to delete Inquiry ${error.message}`);
    }
  })

  const handleDelete = async (id: string) => {
    deleteMutation(id)
  }

  const getInquiryCount = async () => {
    const response = await inquiryInstance.get("/total-inquiry");
    console.log(response.data)
    return response.data;
  }

  const { data: countInquiry, isLoading: isLoadingInquiries, error: countInquiryError } = useQuery({
    queryKey: ["inquiries"],
    queryFn: getInquiryCount,
  })
  return { data, isLoading, error, onSubmit, handleInquirySubmit, register, handleSubmit, errors, countInquiry, countInquiryError, isLoadingInquiries, handleDelete };
};
