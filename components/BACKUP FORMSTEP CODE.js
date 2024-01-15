import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import Header from '@/components/Header'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

const maxSteps = 3

const createListing = () => {

  const [formStep, setFormStep] = useState(1)
  const { 
    watch, 
    register, 
    handleSubmit,
    formState:{ errors, isValid } } = useForm({mode:"all"})

   

  const completeFormStep = () =>{
    setFormStep(cur => cur + 1 )
    }

  const renderButton = () => {
    if(formStep > 3){
      return undefined
    } else if (formStep == 3){
      return(
        <button
        disabled={!isValid}
        type='submit'
        className='mt-6 bg-emerald-600 text-white rounded px-8 py 6 disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          Create Account
        </button>
      )
    }  else {
      return(
        <button
        disabled={!isValid}
        type='button'
        className='mt-6 bg-emerald-600 text-white rounded px-8 py 6 disabled:bg-gray-400 disabled:cursor-not-allowed'
        onClick={completeFormStep }>
          Next Step
        </button>
      )
    }
  }


  const goToPreviousStep = () =>{
    setFormStep(cur => cur - 1)
  }

  const submitForm = (values) => {
    console.log(values)
    completeFormStep()
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

          {/* Step 1 */}
          {formStep === 1 &&(<section>
            <input 
              type="text"
              id='username'
              name='username'
              className='text-input appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md'
              {...register("username", {required:{
                value: true,
                message: "Please type Username!"
              }})}
              />
              {errors.username && <p className='text-red-600 text-sm mt-2'>{errors.username.message}</p>}
          </section>)}

           
            
          {/* Step 2 */}
          {formStep === 2 &&(<section>
            <input 
              type="text"
              id='email'
              name='email'
              className='text-input appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md'
              {...register("email", {required: {
                value: true,
                message: "Please enter email"
              }})}
              />
              {errors.email && <p className='text-red-600 text-sm mt-'>{errors.email.message}</p>}
          </section>)}

            {/* Step 3 */}
          {formStep === 3 &&(<section>
            <input 
              type="text"
              id='address'
              name='address'
              className='text-input appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md'
              {...register("address", {required:{
                value: true,
                message: "Please enter address"
              }})}
              />
               {errors.address && <p className='text-red-600 text-sm mt-'>{errors.addrss.message}</p>}
          </section>)}

          {renderButton()}

          <pre>
            {JSON.stringify(watch(), null, 2)}
          </pre>

        </form>
    </div>
  )
}

export default createListing