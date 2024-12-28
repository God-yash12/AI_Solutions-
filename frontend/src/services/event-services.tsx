import useAxiosPrivateEvent from "../api/event-api";
import { useQuery } from "@tanstack/react-query";


type Event = {
  id: string;
  title: string;
  images: string[];
  date: string;
  eventDetails: string;
};

type EventListsResponse = {
  previousEvent: Event[];
  upcomingEvent: Event[];
};

export const EventService = () => {
  const axiosPrivate = useAxiosPrivateEvent();

  // Get event lists  
  const getEventLists = async (): Promise<EventListsResponse> => {
    const response = await axiosPrivate.get("/get-events");
    return {
      previousEvent: response.data.previousEvent,
      upcomingEvent: response.data.upcomingEvent,
    };
  };


  const { data, isLoading, error } = useQuery({
    queryKey: ["eventlists"],
    queryFn: getEventLists,
  });


  const getTotalEvents = async () => {
    const response = await axiosPrivate.get('/total-events');
    return response.data;
  }

  const { data: totalEventData, error: totalEventError } = useQuery({
    queryKey: ["eventlists"],
    queryFn: getTotalEvents,
  })

  return { data, isLoading, error, totalEventData, totalEventError }


};
