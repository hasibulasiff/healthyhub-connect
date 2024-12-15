import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  quote: string;
  delay: number;
}

const TestimonialCard = ({ name, role, image, quote, delay }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="w-20 h-20 ring-2 ring-purple-500/50 ring-offset-2 ring-offset-background transition-all duration-300 group-hover:ring-purple-500">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.p 
              className="text-gray-700 italic leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
              "{quote}"
            </motion.p>
            <div>
              <motion.h3 
                className="font-semibold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
              >
                {name}
              </motion.h3>
              <motion.p 
                className="text-sm text-purple-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.4 }}
              >
                {role}
              </motion.p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;