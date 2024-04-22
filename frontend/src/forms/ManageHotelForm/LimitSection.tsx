import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const LimitSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div className="bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Limits:</h2>
            <div className="grid grid-cols-2 gap-5">
                <label className="flex flex-col bg-gray-200 rounded-md p-2">
                    <span className="text-gray-700 text-sm font-semibold mb-1">Room:</span>
                    <input
                        className="border rounded-md py-2 px-3 text-gray-800"
                        type="number"
                        min={1}
                        {...register('limit', {
                            required: 'This field is required',
                        })}
                    />
                    {errors.limit?.message && (
                        <span className="text-red-500 text-sm mt-1">{errors.limit?.message}</span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default LimitSection;
