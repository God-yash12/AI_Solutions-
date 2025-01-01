import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewInstance } from "../api/review-instance";
import { toast } from "react-toastify";



type ReviewProps = {
    _id: string;
    name: string;
    image?: string;
    description: string;
    company: string;
    position: string;
    ratings: number;
};

export const ReviewServices = () => {
    const axiosReviewInstance = reviewInstance();
    const clientQuery = useQueryClient();

    // Get all reviews
    const getAllReviews = async (): Promise<ReviewProps[]> => {
        const response = await axiosReviewInstance.get("/get-reviews");
        return response.data.data;
    };

    const { data, error, isLoading } = useQuery<ReviewProps[], Error>({
        queryKey: ["reviews"],
        queryFn: getAllReviews,
    });


    // Delete review function
    const deleteReview = async (reviewId: string) => {
        if (!reviewId) {
            throw new Error("Failed to retrieve Review ID to delete");
        }
        console.log(reviewId, " review id")
        const response = await axiosReviewInstance.delete(`/delete-review/${reviewId}`);
        return response.data.data;
    };

    // Delete review mutation
    const deleteReviewMutation = useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            clientQuery.invalidateQueries(["reviews"]);
            toast.success("Review deleted successfully");
        },
        onError: (error) => {
            console.log(error, "review delete error");
            toast.error("Failed to delete Review");
        },
    });

    // Delete review handler
    const onDeleteReview = (reviewId: string) => {
        deleteReviewMutation.mutate(reviewId);
    };

    // Get approved reviews
    const getApprovedReviews = async (): Promise<ReviewProps[]> => {
        const response = await axiosReviewInstance.get("/approved-reviews");
        return response.data.data;
    };

    const { data: approvedData, error: approveError, isLoading: approveLoading } = useQuery<ReviewProps[], Error>({
        queryKey: ["approvedReview"],
        queryFn: getApprovedReviews,
    });


    //   approve review
    const approveReview = async (reviewId: string): Promise<any> => {
        if (!reviewId) {
            throw new Error("Review ID is required to approve the review.");
        }
        const response = await axiosReviewInstance.patch(`/approve/${reviewId}`);
        return response.data; 
    };

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: approveReview,
        onSuccess: () => {
            // Invalidate queries to refresh the review lists
            queryClient.invalidateQueries(["reviews"]);
            toast.success("Review approved successfully!");
        },
        onError: (error: any) => {
            console.error("Error approving review:", error);
            toast.error(
                error.response?.data?.message || "Failed to approve the review."
            );
        },
    });

    const handleApproveReview = (reviewId:string) => {
        const confirmReview = window.confirm("Are you sure want to Approve this review")
        if(confirmReview){
            mutation.mutate(reviewId)
        }
    }


    const getTotalReviewsCount = async () => {
        const response = await reviewInstance.get('/total-reviews');
        return response.data;
      }
    
      const { data: totalReview, isLoading: isLoadingReviews, error: reviewError } = useQuery({
        queryKey: ["eventlists"],
        queryFn: getTotalReviewsCount,
      })


return {
    data,
    error,
    isLoading,
    approvedData,
    approveLoading,
    approveError,
    onDeleteReview,
    handleApproveReview,
    totalReview, 
    reviewError,
    isLoadingReviews,
};
};
