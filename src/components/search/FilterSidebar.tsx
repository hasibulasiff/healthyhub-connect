import { useState } from "react";
import { Car, Droplet, Waves, UserPlus, User, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [isOpenNow, setIsOpenNow] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="flex gap-2">
            {['$', '$$', '$$$', '$$$$'].map((price) => (
              <Button
                key={price}
                variant={priceRange.includes(price) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setPriceRange(prev => 
                    prev.includes(price) 
                      ? prev.filter(p => p !== price)
                      : [...prev, price]
                  );
                }}
              >
                {price}
              </Button>
            ))}
          </div>
        </div>

        {/* Facility Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Facility Type</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gym">Gyms</SelectItem>
              <SelectItem value="studio">Fitness Studios</SelectItem>
              <SelectItem value="sports">Sports Centers</SelectItem>
              <SelectItem value="events">Events</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Amenities</label>
          <div className="space-y-2">
            {[
              { id: 'parking', label: 'Parking', icon: Car },
              { id: 'showers', label: 'Showers', icon: Droplet },
              { id: 'pool', label: 'Pool', icon: Waves },
              { id: 'trainers', label: 'Personal Trainers', icon: UserPlus },
            ].map(({ id, label, icon: Icon }) => (
              <div key={id} className="flex items-center space-x-2">
                <Checkbox
                  id={id}
                  checked={amenities.includes(id)}
                  onCheckedChange={(checked) => {
                    setAmenities(prev =>
                      checked
                        ? [...prev, id]
                        : prev.filter(a => a !== id)
                    );
                  }}
                />
                <label
                  htmlFor={id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Special Features */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Special Features</label>
          <div className="space-y-2">
            {[
              { id: 'women-only', label: 'Women Only', icon: User },
              { id: 'free-trial', label: 'Free Trial', icon: Award },
              { id: 'kid-friendly', label: 'Kid Friendly', icon: Users },
              { id: 'group-discount', label: 'Group Discount', icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <div key={id} className="flex items-center space-x-2">
                <Checkbox
                  id={id}
                  checked={features.includes(id)}
                  onCheckedChange={(checked) => {
                    setFeatures(prev =>
                      checked
                        ? [...prev, id]
                        : prev.filter(f => f !== id)
                    );
                  }}
                />
                <label
                  htmlFor={id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex items-center space-x-2">
          <Switch
            id="open-now"
            checked={isOpenNow}
            onCheckedChange={setIsOpenNow}
          />
          <label
            htmlFor="open-now"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Open Now
          </label>
        </div>

        {/* Distance Slider */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Distance</label>
          <Slider
            defaultValue={[5]}
            max={50}
            step={1}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0 km</span>
            <span>50 km</span>
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;