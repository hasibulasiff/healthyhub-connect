import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Building2 } from "lucide-react";

interface AuthButtonsProps {
  isOwner: boolean;
  onRoleChange: (checked: boolean) => void;
}

export const AuthButtons = ({ isOwner, onRoleChange }: AuthButtonsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 bg-white/10 p-2 rounded-full">
        <User size={20} className={!isOwner ? "text-purple-400" : "text-white/50"} />
        <Switch
          checked={isOwner}
          onCheckedChange={onRoleChange}
          className="data-[state=checked]:bg-purple-500"
        />
        <Building2 size={20} className={isOwner ? "text-purple-400" : "text-white/50"} />
      </div>
      
      <Link to="/register">
        <Button variant="outline" className="hidden md:flex bg-white/10">
          Register
        </Button>
      </Link>
      
      <Link to="/login">
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
          Login
        </Button>
      </Link>
    </div>
  );
};