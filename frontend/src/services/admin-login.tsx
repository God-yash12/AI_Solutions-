import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../api/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AdminloginSchemaType, AdminloginSchema } from "../components/schemas/admin-Login-Schema";
import { useAuth } from "../context/auth-context";

export function AdminService() {
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()

  const { setIsAuthenticated } = useAuth();

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm<AdminloginSchemaType>({
      resolver: zodResolver(AdminloginSchema),
      mode: "onChange",
  });

  const { mutateAsync } = useMutation({
      mutationFn: async (data: AdminloginSchemaType) => {
          const response = await axiosPrivate.post("/login", data);
          return response.data;
      },
      onSuccess: (data) => {
          setIsAuthenticated(true);
          navigate("/dashboard", { replace: true })
          toast.success((data?.message), {
              position: "top-center",

          })
      },
      onError: (error: AxiosError) => {
          if (error.response?.status === 401) {
              toast.error("Invalid email or password")
          } else {
              toast.error("Unexpected error occured, please try again later")
          }
          console.error("Login failed:", error);
      },
  });

  const onSubmit = async (data: AdminloginSchemaType) => {
      try {
          await mutateAsync(data)
          console.log(data)
      } catch (error) {
          console.error(error)
      }
  }


  const logoutMutation = useMutation ({
    mutationFn: async () => {
        const response = await axiosPrivate.post("/logout", {}, {withCredentials: true});
        return response.data;
    },
    onSuccess: () => {
        toast.success("Logout Successfull")
        setIsAuthenticated(false)
        navigate("/login")
    },
    onError: (error) => {
        console.log(error.message)
        toast.error("Failed to Logout", {
            position: "top-right"
        })
    }
  });

  const handleLogout = () =>{
    const confirmLogout = window.confirm("Are you sure want to Logout?");
    if(confirmLogout) {
        logoutMutation.mutate()
    }
  }

  
  

  return { register, handleSubmit, errors, onSubmit, handleLogout }

}
