import { hotelEmergency } from "../config/hotel-options-config";

type Props = {
  selectedEmergency: boolean[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Emergency = ({ selectedEmergency, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Emergency</h4>
      {hotelEmergency.map((emergency) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={emergency.toString()}
            checked={selectedEmergency.includes(emergency)}
            onChange={onChange}
          />
          <span>{emergency}</span>
        </label>
      ))}
    </div>
  );
};

export default Emergency;