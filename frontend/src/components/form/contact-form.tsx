import Select from "react-select";
import PrimaryButton from "../button/primary-button";
import Inputfield from "../input/input";
import { TextareaAutosize } from "@mui/material";
import { useContactServices } from "../../services/contact-service";
import { Controller } from "react-hook-form";
import { countryOptions } from "../ui/country-list";


const ContactForm = () => {
  const { register, handleSubmit, onSubmit, errors, control } = useContactServices();

  return (
    <div className="container mx-auto mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-center text-2xl lg:text-4xl mb-10">Stay in Touch</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-10">
          <div className="grid grid-rows-1 lg:grid-cols-2 gap-10">
            <div className="grid grid-rows-1 gap-5">
              <Inputfield variant="outlined" label="Name" type="text" {...register("name")} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              <Inputfield variant="outlined" label="Email" type="text" {...register("email")} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              <Inputfield variant="outlined" label="Phone" type="text" {...register("phone")} />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              <Inputfield variant="outlined" label="Company Name" type="text" {...register("company")} />
              {errors.company && <p className="text-red-500">{errors.company.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-5">
              <Inputfield variant="outlined" label="Job title" type="text" {...register("jobTitle")} />
              {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}

              {/* Country Dropdown */}
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    placeholder="Select Country"
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.country && <p className="text-red-500">{errors.country.message}</p>}

              {/* Event Details Textarea */}
              <TextareaAutosize
                className="text-lg lg:w-[20rem] md:w-80 sm:w-72 font-sans font-normal leading-5 px-3 py-4 rounded-lg shadow-md border border-solid border-slate-300 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                placeholder="Job Details"
                minRows={4}
                {...register("jobDetails")}
              />
              {errors.jobDetails && <p className="text-red-500">{errors.jobDetails.message}</p>}
            </div>
          </div>

          <div className="flex justify-center">
            <PrimaryButton type="submit" className="w-32 md:w-64 lg:w-80">
              Submit
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
