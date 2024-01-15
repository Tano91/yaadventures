import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '@/components/Header'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import InputField from '@/components/InputField'
import FormButtonGroup from '@/components/FormButtonGroup'

const maxSteps = 5

const createListing = () => {

  const [formStep, setFormStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState(null);


  const stepValidationSchemas = [
    yup.object().shape({
      selectedOption: yup.string().required('This field is required')
    }),
    yup.object().shape({
      title: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      price: yup.number().positive().integer().required('Price is required')
    }),
    yup.object().shape({
      address: yup.string().required('Address is required'),
      city: yup.string().required('City is required'),
      parish: yup.string().required('Parish is required')
    }),
    yup.object().shape({
      imageLink: yup.string().required('Image link is required')
    }),
    yup.object().shape({}) // This could be empty if there are no fields in the final step
   ];
  

  // Modify your useForm call to use the current step's validation schema
const { register, setValue, trigger, watch, handleSubmit, formState: { errors, isValid } } = useForm({
  resolver: yupResolver(stepValidationSchemas[formStep - 1])
 });



  // Modify your completeFormStep function to run validation before proceeding
const completeFormStep = async () => {
  const result = await trigger();
  if (result) {
    setFormStep((cur) => cur + 1);
  }
 };

 // In your renderButton function, disable the "Next" button only if the current step is invalid

    const renderButton = () => {
      if(formStep >= maxSteps){

        return(
          <button
            type='button'
            className='mt-6 bg-emerald-600 text-white rounded px-8 py-4 disabled:bg-gray-400 disabled:cursor-not-allowed'
            onClick={handleSubmit(submitForm)}>
            Submit YaadVenture!
          </button>
        )
      }  else {
        return (
          <button
            disabled={!isValid}
            type='button'
            className='mt-6 bg-emerald-600 text-white rounded px-8 py-4 disabled:bg-gray-400 disabled:cursor-not-allowed'
            onClick={completeFormStep}>
            Next Step
          </button>
        );
      }
     }
     
     
     


  const goToPreviousStep = () =>{
    setFormStep(cur => cur - 1)
  }

  const submitForm = (values) => {
    console.log(values)
  }

  return (
    <div className='h-screen '>
        <Header />

        <form onSubmit={handleSubmit(submitForm)}>

          <div>
            <h1>YaadVenture Info</h1>
          </div>

          {formStep <= maxSteps && 
          <div className='flex items-center mb-2'>

            {formStep > 1 && <button 
            type='button'
            onClick={goToPreviousStep}>
            <ChevronLeftIcon className='w-4 text-gray-400 hover:text-emerald-600 mr-2'/>
          </button>}

            <p className='text-sm text-gray-700'>{formStep} of {maxSteps}</p>
          </div>}

          {/* Step 1 - Types of YaadVentures */}
          {formStep === 1 &&(
            
            <FormButtonGroup options={["Breakfast", "Lunch", "Dinner"]} setSelectedOption={setSelectedOption} register={register} setValue={setValue} trigger={trigger}/>

             )}

           
            
          {/* Step 2 - Description of YaadVenture */}
          {formStep === 2 &&(
            
            <InputField fields={[
              
              { id: 'title', name: 'title', label: 'Title', type: 'text', placeholder: 'Type the Name of Your YaadVenture' }, 

              { id: 'description', name: 'description', label: 'Description', type: 'text', placeholder: 'Tell us about Your YaadVenture' }, 
              
              { id: 'price', name: 'price', label: 'Price', type: 'number', placeholder: 'What is the Entry Fee? (JMD)' }]} 
              
              register={register} errors={errors} watch={watch} />

   
             )}

            {/* Step 3 - Location of Yaadventure*/}
          {formStep === 3 &&(

         <InputField fields={[
          
          { id: 'address', name: 'address', label: 'Address', type: 'text', placeholder: 'Type Your Address...' },

          { id: 'city', name: 'city', label: 'City', type: 'text', placeholder: 'Type Your City...' },
          
          { id: 'parish', name: 'parish', label: 'Parish', type: 'text', placeholder: 'Type Your parish...' },
        
        ]} 
          
          register={register} errors={errors} />

          )}

           {/* Step 4 - Images of YaadVenture*/}
           {formStep === 4 &&(

          <InputField fields={[
          
            { id: 'imageLink', name: 'imageLink', label: 'imageLink', type: 'text', placeholder: 'Add a link to your Images! (COMING SOON)' }]} 
          
          register={register} errors={errors} />

          )}

        </form>


         {/* Step 5 - Verification Page*/}
         {/* Moved because the form was auto-submitting when complete, before the button was clicked! */}
         {formStep === 5 &&(

        <p>COMPLETED! - IS THIS ACCURATE?: </p>

        )}

        {renderButton()}

        <pre>
        {JSON.stringify(watch(), null, 2)}
        </pre>
    </div>
  )
}

export default createListing