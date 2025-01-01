

import { BlogServices } from "../../../services/blog-services";
import Loader from "../../loader/loader";

const BlogDetails = () => {
    const { blogData, isFetching, errorBlogDetail } = BlogServices();

    if (errorBlogDetail) {
        return <p className="text-center text-red-500">Error: {errorBlogDetail.message}</p>;
    }

    if (!blogData) {
        return <p className="text-center text-gray-500">No blog found.</p>;
    }

    return (
        <div className="container mx-auto mt-24 max-w-4xl p-6 bg-white shadow-md rounded-md">
            {isFetching && <Loader/>}
            {/* Blog Title */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                {blogData.title}
            </h1>

            {/* Date and Time */}
            <div className="flex justify-end text-sm text-gray-500 mb-6">
                <span>{new Date(blogData.time).toLocaleString()}</span>
            </div>

            {/* Blog Image */}
            <div className="mb-6">
                <img
                    src={blogData.image}
                    alt={blogData.title}
                    className="w-1/2 h-auto rounded-md"
                />
                <p className="text-gray-800 font-semibold text-xl">By: AI solution</p>
            </div>

            {/* Blog Content */}
            <div className="text-gray-700 text-lg leading-relaxed">
                {blogData.content}
            </div>
        </div>
    );
};

export default BlogDetails;
