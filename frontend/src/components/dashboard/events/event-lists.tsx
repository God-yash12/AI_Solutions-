import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../../loader/loader";
import axios from "axios";
import Card from "../../ui/event-card";
import React from "react";
import { toast } from "react-toastify";


const EventLists: React.FC = () => {


  const getEventLists = async () => {
    const response = await axios.get("http://localhost:5004/api/admin/get-events");
    return {
      previousEvent: response.data.previousEvent,
      upcomingEvent: response.data.upcomingEvent,
    };
  };


  const { data, isLoading, error } = useQuery({
    queryKey: ["eventlists"],
    queryFn: getEventLists,
  });

  // Handle event deletion
  const handleDelete = async (id: string) => {
    if (!id) {
      console.log("Event ID is missing!");
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:5004/api/admin/delete-event/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["eventlists"]);
      toast.success("Event deleted successfully")
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
      toast.error("Failed to deleted event")
    },
  });

  const deleteEvent = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Loading and error handling
  if (isLoading) {
    return <Loader />;
  }

  if (error instanceof Error) {
    return <p>Event Fetch Error: {error.message}</p>;
  }

  return (
    <div>

      {/* Display Upcoming Events */}
      {data?.upcomingEvent?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-5">
            {data?.upcomingEvent.map((event) => (
              <Card
                key={event.id}
                eventId={event._id}
                title={event.title}
                date={new Date(event.date).toLocaleString()}
                image={event.images}
                isAdmin={true}
                onDelete={deleteEvent}

              />
            ))}
          </div>
        </div>
      )}

      {/* Display Previous Events */}
      {data?.previousEvent?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Previous Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-5">
            {data?.previousEvent.map((event) => (
              <Card
                key={event.id}
                eventId={event._id}
                title={event.title}
                date={event.date}
                image={event.images}
                isAdmin={true}
                onDelete={deleteEvent}
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

export default EventLists;
