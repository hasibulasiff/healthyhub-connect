import { MapPin } from "lucide-react";

interface EventMapProps {
  location: string;
}

const EventMap = ({ location }: EventMapProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Location</h3>
      <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p>{location}</p>
          <p className="text-sm">Map integration will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default EventMap;