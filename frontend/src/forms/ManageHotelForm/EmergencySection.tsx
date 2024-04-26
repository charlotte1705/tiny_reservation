import { useFormContext } from "react-hook-form";
import { hotelEmergency } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const EmergencySection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const emergencyWatch = watch("emergency");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Emergency</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelEmergency.map((emergency) => (
          <label
            className={
              String(emergencyWatch) === String(emergency)
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={emergency.toString()} // Convert boolean value to string
              {...register("emergency", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{emergency ? "Yes" : "No"}</span>
          </label>
        ))}
      </div>
      {errors.emergency && (
        <span className="text-red-500 text-sm font-bold">
          {errors.emergency.message}
        </span>
      )}
    </div>
  );
};

export default EmergencySection;