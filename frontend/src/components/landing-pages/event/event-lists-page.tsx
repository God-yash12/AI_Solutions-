
import Loader from "../../loader/loader";
import Card from "../../ui/event-card"
import React from "react";
import { EventService } from "../../../services/event-services";


const LandingPageEvents: React.FC = () => {

  const { data, isLoading, error } = EventService()


  if (isLoading) {
    return <Loader />;
  }

  if (error instanceof Error) {
    return <p>Event Fetch Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto">

      {/* Display Upcoming Events */}
      {data?.upcomingEvent?.length > 0 && (
        <div className="container mx-auto mt-24 px-14">
          <h2 className="text-2xl text-center font-bold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-8 gap-5">
            {data?.upcomingEvent.map((event) => (
              <Card
                key={event.id}
                eventId={event._id}
                title={event.title}
                date={event.date}
                image={event.images}
                isAdmin={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Display Previous Events */}
      {data?.previousEvent?.length > 0 && (
        <div className="container m-5">
          <h2 className=" text-2xl text-center font-bold mb-4">Previous Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-8 gap-5">
            {data?.previousEvent.map((event) => (
              <Card
                key={event.id}
                eventId={event._id}
                title={event.title}
                date={event.date}
                image={event.images}
                isAdmin={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* If no events are available */}
      {data?.previousEvent?.length === 0 && data?.upcomingEvent?.length === 0 && (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default LandingPageEvents;
