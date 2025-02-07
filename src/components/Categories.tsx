import { useNavigate } from "react-router-dom";
import { Dumbbell, Trophy, Heart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Gyms",
    icon: Dumbbell,
    count: 150,
    color: "bg-red-100",
    iconColor: "text-red-500",
    type: "gym"
  },
  {
    id: 2,
    name: "Yoga Studios",
    icon: Heart,
    count: 89,
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    type: "yoga"
  },
  {
    id: 3,
    name: "Sports Centers",
    icon: Trophy,
    count: 120,
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    type: "sports"
  },
  {
    id: 4,
    name: "Wellness Centers",
    icon: Heart,
    count: 95,
    color: "bg-pink-100",
    iconColor: "text-pink-500",
    type: "wellness"
  },
  {
    id: 5,
    name: "Swimming Pools",
    icon: Users,
    count: 45,
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    type: "swimming"
  },
  {
    id: 6,
    name: "Group Classes",
    icon: Users,
    count: 200,
    color: "bg-orange-100",
    iconColor: "text-orange-500",
    type: "classes"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (type: string) => {
    navigate(`/search?category=${type}`);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-900 to-[#0a0118]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">Browse Categories</h2>
        <p className="text-white/70 text-center mb-12">Explore different types of fitness and wellness activities</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50"
              onClick={() => handleCategoryClick(category.type)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`${category.color} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-purple-600 to-pink-600`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">{category.name}</h3>
                <p className="text-sm text-white/70">{category.count} places</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;