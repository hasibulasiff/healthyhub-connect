import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface MapViewProps {
  onSearchAsMapMovesChange: (value: boolean) => void;
}

const MapView = ({ onSearchAsMapMovesChange }: MapViewProps) => {
  const [searchAsMapMoves, setSearchAsMapMoves] = useState(false);

  const handleSearchAsMapMovesChange = (checked: boolean) => {
    setSearchAsMapMoves(checked);
    onSearchAsMapMovesChange(checked);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Map View</CardTitle>
          <div className="flex items-center gap-2">
            <Switch
              id="search-as-map-moves"
              checked={searchAsMapMoves}
              onCheckedChange={handleSearchAsMapMovesChange}
            />
            <label
              htmlFor="search-as-map-moves"
              className="text-sm font-medium"
            >
              Search as map moves
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[calc(100vh-200px)] bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Map will be implemented here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;