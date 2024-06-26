import {
  ChevronDownIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  MapIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const InputField = ({ fields, register, errors }) => (
  <>
    {fields.map((field, index) => (
      <div key={index}>
        <div className="flex items-center">
          {field.name === "title" && <BookOpenIcon className="h-5 ml-2" />}
          {field.name === "description" && (
            <ChatBubbleBottomCenterTextIcon className="h-5 ml-2" />
          )}
          {field.name === "price" && (
            <CurrencyDollarIcon className="h-5 ml-2" />
          )}
          {field.name === "address" && <MapPinIcon className="h-5 ml-2" />}
          {field.name === "city" && (
            <BuildingOffice2Icon className="h-5 ml-2" />
          )}
          {field.name === "imageLink" && <PhotoIcon className="h-5 ml-2" />}
          {field.name === "parish" ? (
            <>
              <MapIcon className="h-5 ml-2" />
              <select
                className={`appearance-none relative block w-full px-4 py-8 placeholder-gray-400 text-black 
                
                focus:outline-none focus:ring-emerald-600 focus:border-b-emerald-600 focus:z-10 sm:text-md cursor-pointer`}
                id={field.id}
                name={field.name}
                {...register(field.name, {
                  required: {
                    value: true,
                    message: "this is required",
                  },
                })}
              >
                <option value="">Select a Parish</option>
                <option value="Clarendon">Clarendon</option>
                <option value="Hanover">Hanover</option>
                <option value="Kingston">Kingston</option>
                <option value="Manchester">Manchester</option>
                <option value="Portland">Portland</option>
                <option value="St. Andrew">St. Andrew</option>
                <option value="St. Ann">St. Ann</option>
                <option value="St. Catherine">St. Catherine</option>
                <option value="St. Elizabeth">St. Elizabeth</option>
                <option value="St. James">St. James</option>
                <option value="St. Mary">St. Mary</option>
                <option value="St. Thomas">St. Thomas</option>
                <option value="Trelawny">Trelawny</option>
                <option value="Westmoreland">Westmoreland</option>
              </select>
              <ChevronDownIcon className="h-5 ml-2 " />
            </>
          ) : null}
          {field.name !== "parish" && (
            <input
              className={`appearance-none relative block w-full px-4 py-8 placeholder-gray-400 text-black 
              border-b border-gray-400
              focus:outline-none focus:ring-emerald-600 focus:border-b-emerald-600 focus:z-10 sm:text-md`}
              type={field.type || "text"}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              {...register(field.name, {
                required: {
                  value: true,
                  message: "this is required",
                },
              })}
            />
          )}
        </div>
        {errors[field.name] && (
          <p className="text-red-600 text-sm mt-2">
            {errors[field.name].message}
          </p>
        )}
      </div>
    ))}
  </>
);

export default InputField;
