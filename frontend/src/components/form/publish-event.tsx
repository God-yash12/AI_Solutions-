import { useState } from 'react';
import Inputfield from '../input/input';
import { DayPicker } from 'react-day-picker';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import PrimaryButton from '../button/primary-button';
import SectionHeading from '../ui/typography/section-heading';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EventSchemaType, EventSchema } from '../schemas/event-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosPrivateEvent from '../../api/event-api';
import 'react-day-picker/dist/style.css';

interface PublishEventProps {}

const PublishEvent: React.FC<PublishEventProps> = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivateEvent();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<EventSchemaType>({
    resolver: zodResolver(EventSchema),
    mode: 'onChange',
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosPrivate.post('/create-event', formData);
      console.log(response);
      return response;
    },
    onSuccess: () => {
      toast.success('Event Published Successfully');
      reset();
      setStartDate(new Date());
    },
    onError: (error) => {
      toast.error('Failed to Publish Event');
      console.error('Event publish error:', error);
    },
  });

  const onSubmit: SubmitHandler<EventSchemaType> = async (data: EventSchemaType) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('date', data.date.toString());
    formData.append('location', data.location);
    formData.append('eventDetails', data.eventDetails);

    data.images.forEach((file) => {
      formData.append('images', file);
    });

    await mutateAsync(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue('images', Array.from(e.target.files), { shouldValidate: true });
    }
  };

  const handleInputClick = () => {
    setIsCalendarVisible(true); 
  };

  const handleDateSelect = (date: Date) => {
    setStartDate(date);
    setValue('date', date); 
    setIsCalendarVisible(false); 
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center gap-10">
          <SectionHeading>Publish Event</SectionHeading>
          <div className="grid grid-rows-1 lg:grid-cols-2 gap-5">
            {/* Event Title */}
            <div>
              <Inputfield
                type="text"
                variant="outlined"
                label="Event Title"
                {...register('title')}
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            {/* Event Date */}
            <div>
              <div className="relative">
                <Inputfield
                  type="text"
                  variant="outlined"
                  label="Event Date"
                  value={startDate ? startDate.toLocaleDateString() : ''}
                  onClick={handleInputClick} // Show the calendar when clicked
                  readOnly
                />
                {isCalendarVisible && (
                  <div className="absolute z-10 top-12 left-0">
                    <DayPicker
                      selected={startDate}
                      onDayClick={handleDateSelect} // Set date on click
                      className="border p-3 rounded"
                    />
                  </div>
                )}
              </div>
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>

            {/* File Upload */}
            <div>
              <input
                type="file"
                name="images"
                multiple
                className="border rounded p-2"
                onChange={handleFileChange}
              />
              {errors.images && <p className="text-red-500">{errors.images.message}</p>}
            </div>

            {/* Location */}
            <div>
              <Inputfield
                type="text"
                variant="outlined"
                label="Location"
                {...register('location')}
              />
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>
          </div>

          {/* Event Details */}
          <div>
            <TextareaAutosize
              className="text-lg lg:w-[40rem] md:w-80 sm:w-72 font-sans font-normal leading-5 px-3 py-4 rounded-lg shadow-md border border-solid border-slate-300 focus:border-purple-500"
              placeholder="Event Details"
              {...register('eventDetails')}
            />
            {errors.eventDetails && <p className="text-red-500">{errors.eventDetails.message}</p>}
          </div>

          {/* Submit Button */}
          <PrimaryButton type="submit" className="w-64 lg:w-80">
            Publish Event
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default PublishEvent;
