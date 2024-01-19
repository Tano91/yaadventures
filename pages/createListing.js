import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "@/components/Header";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import InputField from "@/components/InputField";
import FormButtonGroup from "@/components/FormButtonGroup";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import ImageUpload from "@/components/ImageUpload";

const maxSteps = 5;

const createListing = () => {
  const [formStep, setFormStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [isImageUploadValid, setIsImageUploadValid] = useState(false);

  const stepValidationSchemas = [
    yup.object().shape({
      selectedOption: yup.string().required("This field is required"),
    }),
    yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      price: yup.number().integer().min(0).required("Price is required"),
    }),
    yup.object().shape({
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      parish: yup.string().required("Parish is required"),
    }),
    yup.object().shape({
      imageLink: yup.string().required("Image link is required"),
    }),
    yup.object().shape({}), // This could be empty if there are no fields in the final step
  ];

  // Modify your useForm call to use the current step's validation schema
  const {
    register,
    setValue,
    trigger,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(stepValidationSchemas[formStep - 1]),
  });

  // Modify completeFormStep function to run validation before proceeding
  const completeFormStep = async () => {
    const result = await trigger();
    if (result || (formStep === 4 && isImageUploadValid)) {
      setFormStep((cur) => cur + 1);
      setIsImageUploadValid(false);
    }
  };

  // In your renderButton function, disable the "Next" button only if the current step is invalid

  const renderButton = () => {
    if (formStep >= maxSteps) {
      return (
        <button
          type="button"
          className="flex content-center  mt-6 bg-emerald-600 text-white rounded-xl px-8 py-4 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-emerald-800 hover:scale-105 active:scale-90  transform transition duration-300 ease-out"
          onClick={handleSubmit(submitForm)}
        >
          Submit!
          <PaperAirplaneIcon className="h-6 text-white ml-2" />
        </button>
      );
    } else {
      return (
        <button
          disabled={formStep !== 4 ? !isValid : !isImageUploadValid}
          type="button"
          className="flex content-center mt-6 bg-emerald-600 text-white rounded-xl px-8 py-4 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-emerald-800 hover:scale-105 active:scale-90  transform transition duration-300 ease-out"
          onClick={completeFormStep}
        >
          Next
          <ChevronRightIcon className="h-6 text-white ml-2 " />
        </button>
      );
    }
  };

  const goToPreviousStep = () => {
    setFormStep((cur) => cur - 1);
  };

  const submitForm = async (values) => {
    // Handle image upload
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "yaadventures_upload_present");

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,
          formData
        );
        values.imageLink = res.data.secure_url; // Use secure_url from response data
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Handle Pushinh to Firebase here!
    console.log(values);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Container Div */}
      <div className="container mx-auto px-5 ">
        {/* Form Div */}
        <div className="flex justify-center">
          <form onSubmit={handleSubmit(submitForm)}>
            {/* Step 1 - Types of YaadVentures */}
            {formStep === 1 && (
              <FormButtonGroup
                options={[
                  "Rivers",
                  "Hikes",
                  "Beaches",
                  "Caves",
                  "Springs",
                  "Other",
                ]}
                setSelectedOption={setSelectedOption}
                register={register}
                setValue={setValue}
                trigger={trigger}
              />
            )}

            {/* Step 2 - Description of YaadVenture */}
            {formStep == 2 && (
              <div>
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-10 mt-10">
                  Tells Us About Your YaadVenture
                </h1>
              </div>
            )}
            {formStep === 2 && (
              <InputField
                fields={[
                  {
                    id: "title",
                    name: "title",
                    label: "Title",
                    type: "text",
                    placeholder: "Type the Name of Your YaadVenture",
                  },

                  {
                    id: "description",
                    name: "description",
                    label: "Description",
                    type: "text",
                    placeholder: "Tell us about Your YaadVenture",
                  },

                  {
                    id: "price",
                    name: "price",
                    label: "Price",
                    type: "number",
                    placeholder: "What is the Entry Fee? (JMD)",
                  },
                ]}
                register={register}
                errors={errors}
                watch={watch}
              />
            )}

            {/* Step 3 - Location of Yaadventure*/}
            {formStep == 3 && (
              <div>
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-10 mt-10">
                  Where is your YaadVenture Located?
                </h1>
              </div>
            )}
            {formStep === 3 && (
              <InputField
                fields={[
                  {
                    id: "address",
                    name: "address",
                    label: "Address",
                    type: "text",
                    placeholder: "Type Your Address...",
                  },

                  {
                    id: "city",
                    name: "city",
                    label: "City",
                    type: "text",
                    placeholder: "Type Your City...",
                  },

                  {
                    id: "parish",
                    name: "parish",
                    label: "Parish",
                    type: "text",
                    placeholder: "Type Your parish...",
                  },
                ]}
                register={register}
                errors={errors}
              />
            )}

            {/* Step 4 - Images of YaadVenture*/}
            {formStep == 4 && (
              <div>
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-10 mt-10">
                  Upload Images of Your YaadVenture
                </h1>
              </div>
            )}
            {formStep === 4 && (
              <ImageUpload
                errors={errors}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                setIsImageUploadValid={setIsImageUploadValid}
              />
            )}
          </form>
        </div>

        {/* Step 5 - Verification Page*/}
        {/* Moved because the form was auto-submitting when complete, before the button was clicked! */}
        {formStep == 5 && (
          <div>
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-10 mt-10">
              Is This Information Accurate?:
            </h1>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
          </div>
        )}

        <div className="z-0 absolute bottom-0 left-0 right-0 mx-auto">
          <ProgressBar
            percent={(formStep / maxSteps) * 100}
            filledBackground={"#16a34a"}
          />
          <div className="flex justify-between bg-white pb-5 px-10">
            {formStep <= maxSteps && (
              <div className="flex items-center">
                {formStep > 1 && (
                  <button
                    className="flex content-center mt-6 bg-gray-600 text-white rounded-xl px-8 py-4 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 hover:scale-105 active:scale-90  transform transition duration-300 ease-out"
                    type="button"
                    onClick={goToPreviousStep}
                  >
                    <ChevronLeftIcon className="h-6 text-gray-400 mr-2" />
                    Back
                  </button>
                )}
              </div>
            )}

            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default createListing;
