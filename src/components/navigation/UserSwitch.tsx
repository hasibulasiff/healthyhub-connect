import { User, Building2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface UserSwitchProps {
  isOwner: boolean;
  onSwitchChange: (checked: boolean) => void;
}

export const UserSwitch = ({ isOwner, onSwitchChange }: UserSwitchProps) => {
  return (
    <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-full">
      <User size={20} className={!isOwner ? "text-purple-400" : "text-white/50"} />
      <Switch
        checked={isOwner}
        onCheckedChange={onSwitchChange}
        className="data-[state=checked]:bg-purple-500"
      />
      <Building2 size={20} className={isOwner ? "text-purple-400" : "text-white/50"} />
    </div>
  );
};