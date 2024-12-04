import { Dumbbell, Yoga, Trophy, Heart, Swimming, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Gyms",
    icon: Dumbbell,
    count: 150,
    color: "bg-red-100",
    iconColor: "text-red-500"
  },
  {
    id: 2,
    name: "Yoga Studios",
    icon: Yoga,
    count: 89,
    color: "bg-purple-100",
    iconColor: "text-purple-500"
  },
  {
    id: 3,
    name: "Sports Centers",
    icon: Trophy,
    count: 120,
    color: "bg-blue-100",
    iconColor: "text-blue-500"
  },
  {
    id: 4,
    name: "Wellness Centers",
    icon: Heart,
    count: 95,
    color: "bg-pink-100",
    iconColor: "text-pink-500"
  },
  {
    id: 5,
    name: "Swimming Pools",
    icon: Swimming,
    count: 45,
    color: "bg-cyan-100",
    iconColor: "text-cyan-500"
  },
  {
    id: 6,
    name: "Group Classes",
    icon: Users,
    count: 200,
    color: "bg-orange-100",
    iconColor: "text-orange-500"
  }
];

const Categories = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Browse Categories</h2>
        <p className="text-neutral text-center mb-12">Explore different types of fitness and wellness activities</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`${category.color} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-neutral">{category.count} places</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;