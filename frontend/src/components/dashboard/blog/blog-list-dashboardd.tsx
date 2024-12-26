import { BlogServices } from "../../../services/blog-services";
import Card from "../../ui/card/blog-card";
import Loader from "../../loader/loader";

const BloglistAdmin = () => {
    const { data, isLoading, error, onDeleteBlog } = BlogServices();

    return (
        <div>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-5">
                    {error && <p>Error Message: {error.message}</p>}
                    {isLoading && <Loader />}
                    {data && data.length > 0 ? (
                        data.map((blog) => (
                            <Card
                                key={blog._id}
                                blogId={blog._id} 
                                title={blog.title}
                                image={blog.image}
                                time={new Date(blog.time).toLocaleString()}
                                isAdmin={true}
                                onDelete={onDeleteBlog}
                            />
                        ))
                    ) : (
                        <p>No blogs available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BloglistAdmin;
