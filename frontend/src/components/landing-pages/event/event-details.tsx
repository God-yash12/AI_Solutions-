import Loader from "../../loader/loader";
import { EventDetailsService } from "../../../services/event-details-service";

const EventDetails = () => {
  const { data, isLoading, error } = EventDetailsService();

  if (error) return <div>Error: {error.message}</div>;

  // Helper function to split date and time
  const formatDateAndTime = (dateString: string) => {
    const [date, time] = new Date(dateString).toISOString().split("T");
    return {
      date,
      time: time.slice(0, 5), 
    };
  };

  return (
    <div className="container mx-auto mt-10 min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading && <Loader />}
      {data && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
          {/* Event Title */}
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          {/* Event Date and Time */}
          <div className="text-right text-gray-500 mb-5">
            <p className="font-semibold">
              Date: {formatDateAndTime(data.date).date}
            </p>
            <p className="font-semibold">
              Time: {formatDateAndTime(data.date).time}
            </p>
          </div>

          {/* Event Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {data.images.map((img, index) => (
              <div
                key={index}
                className="flex justify-center items-center overflow-hidden rounded-lg bg-gray-50 w-full h-48 p-2"
              >
                <img
                  src={img}
                  alt={`Event Image ${index + 1}`}
                  className="w-[98%] h-[98%] object-contain object-center"
                />
              </div>
            ))}
          </div>

          {/* Event Details */}
          <p className="text-gray-600 text-lg mb-6">{data.eventDetails}</p>


        </div>
      )}
    </div>
  );
};

export default EventDetails;
