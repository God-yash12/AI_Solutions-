import { BlogServices } from '../../services/blog-services';
import PrimaryButton from '../button/primary-button';
import InputField from '../input/input';
import { TextareaAutosize } from '@mui/material';

const PublishBlog = () => {
  const { register, setValue, handleSubmit, errors, onSubmit } = BlogServices();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Access the first file if it exists
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        setValue('image', file); 
      } else {
        alert('Please select a valid image file (png, jpeg, jpg).');
        e.target.value = ''; 
      }
    } else {
      alert('No file selected.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Publish a Blog</h2>

      <div className="mb-6">
        <InputField
          variant="outlined"
          label="Blog Title"
          type="text"
          {...register('title')}
          className="w-full p-3 rounded-lg border border-slate-300 focus:border-purple-500 focus:outline-none"
        />
        {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
      </div>

      <div className="mb-6">
        <TextareaAutosize
          {...register('content')}
          placeholder="Write your blog content here..."
          className="w-full p-3 rounded-lg border border-slate-300 focus:border-purple-500 focus:outline-none text-lg leading-6"
          minRows={6}
        />
        {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>}
      </div>

      <div className="mb-6">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          className="w-full p-3 rounded-lg border border-slate-300 focus:border-purple-500 focus:outline-none cursor-pointer"
        />
        {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>}
      </div>

      <div className="flex justify-center">
        <PrimaryButton type="submit" className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out">
          Publish Blog
        </PrimaryButton>
      </div>
    </form>
  );
};

export default PublishBlog;
