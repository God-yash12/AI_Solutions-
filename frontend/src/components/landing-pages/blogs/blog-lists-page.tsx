
import { BlogServices } from "../../../services/blog-services";
import Loader from "../../loader/loader";
import Card from "../../ui/card/blog-card";
import { useNavigate } from "react-router-dom";

const BlogLists = () => {
  const { data, isLoading, error } = BlogServices();
  const navigate = useNavigate()

  const handleReadMore = (blogId:string) => {
    navigate(`/blog-details/${blogId}`)
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto mt-24 px-14">
       <h1 className="text-center text-5xl text-gray-700 font-bold font-serif tracking-wider mb-10">
        Our Latest Blogs
       </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-8 gap-5">

        {isLoading && <Loader />}
        {data && data.length > 0 ? (
          data.map((blog) => (
            <Card
              key={blog._id}
              title={blog.title}
              image={blog.image}
              time={new Date(blog.time).toLocaleString()}
              isAdmin={false}
              onReadMore={() => handleReadMore(blog._id)}         />
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogLists;
