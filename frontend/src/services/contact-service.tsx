import { contactAxiosInstance } from "../api/contact-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactFormValues, ContactSchema } from "../components/schemas/contact-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AxiosError } from "axios";



interface ContactResponse {
    message: string;
}


export const useContactServices = () => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(ContactSchema),
        mode: "onChange",
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (data: ContactFormValues) => {
            const response = await contactAxiosInstance.post<ContactResponse>("/contact", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Contact form submitted successfully!");
            reset()
        },
        onError: (error) => {
            const axiosError = error as AxiosError;
            toast.error(axiosError?.response?.data?.message || "An error occurred.");
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        await mutateAsync(data);
    };

    const getContacts = async () => {
        const response = await contactAxiosInstance.get("/get-contacts")
        return response.data;
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ["contacts"],
        queryFn: getContacts,
    })



    return { register, handleSubmit, errors, control, onSubmit, data, isLoading, error };
};
