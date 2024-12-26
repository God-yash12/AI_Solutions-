
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { reviewInstance } from "../api/review-instance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewSchemaType, ReviewSchema } from "../components/schemas/reviews-schema";


const UserReviewServices = () => {

    const axiosReviewInstance = reviewInstance()

      const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm<ReviewSchemaType>({
        resolver: zodResolver(ReviewSchema),
        mode: "onChange",
      });

  const { mutateAsync } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosReviewInstance.post("/create-review", formData);
      console.log(response)
      return response;
    },
    onSuccess: () => {
      reset()
      toast.success("Thank you for your Review");
    },
    onError: (error) => {
      console.log(error, "review post error");
      toast.error("Failed to Rate, Try again later");
    },
  });

  const onSubmit = async (data: ReviewSchemaType) => {
    const formData = new FormData();
    console.log("formdata", formData)
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("company", data.company);
    formData.append("position", data.position);
    formData.append("ratings", String(data.ratings));
    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      await mutateAsync(formData);
    } catch (error) {
      console.log(error, "post review error");
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    setValue,
  };





};


export default UserReviewServices
