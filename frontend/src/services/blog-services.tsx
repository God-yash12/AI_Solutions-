import useAxiosPrivateBlog from "../api/blog-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BlogFormInputs, BlogSchema } from "../components/schemas/blog-schema";


type BlogProps = {
    _id: string; 
    title: string;
    image: string;
    content: string;
    time: string;
};

export const BlogServices = () => {
    const axiosBlogInstance = useAxiosPrivateBlog();
    const {blogId} = useParams<{blogId: string}>()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm<BlogFormInputs>({
        resolver: zodResolver(BlogSchema),
        mode: 'onChange',
      });
    
      const { mutateAsync } = useMutation({
        mutationFn: async (formData: FormData) => {
          const response = await axiosBlogInstance.post('/create-blog', formData);
          return response;
        },
        onSuccess: () => {
          toast.success('Blog Published Successfully');
          reset();
        },
        onError: (error) => {
          toast.error('Failed to Publish Blog');
          console.error('Blog publish error:', error);
        },
      });
    

      const onSubmit = async (data: BlogFormInputs) => {
        const formData = new FormData();
        formData.append('title', data.title); 
        formData.append('content', data.content);
    
        // Append the image file
        if (data.image) {
          formData.append('image', data.image); 
        }
    
        try {
          await mutateAsync(formData); 
          reset(); 
        } catch (error) {
          console.error('Error while posting blog:', error);
        }
      };
    

    const getAllBlogs = async (): Promise<BlogProps[]> => {
        const response = await axiosBlogInstance.get("/get-blogs");
        return response.data.data;
    };  

    const { data, isLoading, error } = useQuery<BlogProps[], Error>({
        queryKey: ["blogs"],
        queryFn: getAllBlogs,
    });

    const deleteBlog = async (blogId: string) => {
        if (!blogId) {
            throw new Error("Blog ID is missing");
        }
        const response = await axiosBlogInstance.delete(`/delete-blog/${blogId}`);
        return response.data;
    };

    const queryClient = useQueryClient();

    const deletemutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(["blogs"]);
            toast.success("Blog deleted successfully");
        },
        onError: (error: any) => {
            toast.error(`Failed to delete blog: ${error.message}`);
        },
    });

    const onDeleteBlog = (blogId: string) => {
        deletemutation.mutate(blogId);
    };


    const getBlogById = async (id: string): Promise<BlogProps> => {
        try {
          const response = await axiosBlogInstance.get(`/get-blog/${id}`);
          console.log("API Response:", response.data);
          if (!response.data || !response.data.blog) {
            throw new Error("Blog data is not available in the API response.");
          }
          return response.data.blog;
        } catch (error) {
          console.error("Error in getBlogById:", error);
          throw error;
        }
      };
      
      const {
        data: blogData,
        isLoading: isFetching,
        error: errorBlogDetail,
      } = useQuery<BlogProps, Error>({
        queryKey: ["blogs", blogId],
        queryFn: () => getBlogById(blogId!), 
        enabled: !!blogId, 
      });
      

    const getBlogCount = async () => {
      const response = await axiosBlogInstance.get('/total-blog');
      console.log(response.data.data);
      return response.data.data;
    }

    const { data: totalBLog, isLoading: isLoadingBlogs, error: countBlogError } = useQuery({
      queryKey: ["blogs"],
      queryFn: getBlogCount
    })

    return { data, isLoading, error, onDeleteBlog, blogData, isFetching, errorBlogDetail, register, setValue, handleSubmit, errors, onSubmit, totalBLog, countBlogError, isLoadingBlogs };
};
