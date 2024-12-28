import Loader from "../../loader/loader";
import Card from "../../ui/event-card";
import React from "react";
import { EventService } from "../../../services/event-services";

const LandingPageEvents: React.FC = () => {
  const { data, isLoading, error } = EventService();

  if (isLoading) {
    return <Loader />;
  }

  if (error instanceof Error) {
    return <p>Event Fetch Error: {error.message}</p>;
  }

  // Function to find the nearest upcoming event
  const getNearestUpcomingEvent = (events: any[]) => {
    const now = new Date();
    return events.reduce((nearest, event) => {
      const eventDate = new Date(event.date);
      if (!nearest || (eventDate > now && eventDate < new Date(nearest.date))) {
        return event;
      }
      return nearest;
    }, null);
  };

  const nearestUpcomingEvent = data?.upcomingEvent?.length
    ? getNearestUpcomingEvent(data.upcomingEvent)
    : null;

  const otherUpcomingEvents = data?.upcomingEvent?.filter(
    (event) => nearestUpcomingEvent && event._id !== nearestUpcomingEvent._id
  );

  return (
    <div className="container mx-auto mt-28">
      {/* Highlight Nearest Upcoming Event */}
      {nearestUpcomingEvent && (
        <div className="my-12 px-4">
          <h2 className="text-3xl text-center font-bold mb-6 text-blue-700">Event Soon</h2>
          <div className="flex justify-center">
            <Card
              key={nearestUpcomingEvent.id}
              eventId={nearestUpcomingEvent._id}
              title={nearestUpcomingEvent.title}
              date={new Date(nearestUpcomingEvent.date).toLocaleString()}
              image={nearestUpcomingEvent.images}
              isAdmin={false}
              className="w-full md:w-1/2 lg:w-1/3 shadow-lg border-4 border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Display Other Upcoming Events */}
      {otherUpcomingEvents?.length > 0 && (
        <div className="container mx-auto mt-12 px-14">
          <h2 className="text-2xl text-center font-bold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-8 gap-5">
            {otherUpcomingEvents.map((event) => (
              <Card
                key={event.id}
                eventId={event._id}
                title={event.title}
                date={new Date(event.date).toLocaleString()}
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
          <h2 className="text-2xl text-center font-bold mb-4">Previous Events</h2>
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
