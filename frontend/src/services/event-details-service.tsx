
import useAxiosPrivate from "../api/axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


interface Event {
    title: string;
    date: string;
    eventDetails: string;
    images: string[];
}

interface EventResponse {
    event: Event;
}

export const EventDetailsService = () => {

    const axiosPrivate = useAxiosPrivate();
    const { eventId } = useParams<{ eventId: string }>();

    const fetchEvent = async (id: string): Promise<Event> => {
        const response = await axiosPrivate.get<EventResponse>(`/get-event/${id}`);
        return response.data.event;
    };

    const { data, error, isLoading } = useQuery<Event, Error>({
        queryKey: ["event", eventId],
        queryFn: () => fetchEvent(eventId!),
        enabled: !!eventId,
    });


    return { data, error, isLoading }
}