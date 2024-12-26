const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div
        className="flex items-center justify-center h-32 w-32 animate-spin rounded-full border-4 border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-red-500"
        role="status"
      >
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
