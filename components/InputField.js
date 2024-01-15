const InputField = ({ fields, register, errors }) => (
    <>
     {fields.map((field, index) => (
       <section key={index}>
         <input 
           className='appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900  focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md'
           type={field.type || "text"}
           id={field.id}
           name={field.name}
           placeholder={field.placeholder}

           {...register(field.name, {required:{
             value: true,
             message: 'this is required'
           }})}
           
         />
         {errors[field.name] && <p className='text-red-600 text-sm mt-2'>{errors[field.name].message}</p>}
       </section>
     ))}
    </>
   );
   
   export default InputField;
   