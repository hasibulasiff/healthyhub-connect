import { useEffect, useRef } from "react";
import * as THREE from "three";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import FeaturedListings from "@/components/FeaturedListings";
import Categories from "@/components/Categories";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Trophy, Users, Zap } from "lucide-react";

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Add meshes
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x6e59a5,
      wireframe: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 30;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Clean up Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1528]">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <Navbar />
      <main className="relative z-10">
        <HeroSearch />
        <div className="bg-gradient-to-b from-[#1a1528] to-[#0f0a1e]">
          <FeaturedListings />
          <Categories />
          
          {/* Why Choose Us Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-white">Why Choose Us</h2>
              <p className="text-white/70 text-center mb-12">Discover what makes us the best choice for your fitness journey</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Trusted Platform</h3>
                    <p className="text-white/70">Verified listings and secure bookings for your peace of mind</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Quality Assured</h3>
                    <p className="text-white/70">Only the best fitness and wellness centers make it to our platform</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Community Driven</h3>
                    <p className="text-white/70">Join a thriving community of fitness enthusiasts</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Instant Access</h3>
                    <p className="text-white/70">Quick and easy booking process for all services</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <Events />
          
          {/* Call to Action Section */}
          <section className="py-20 px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Fitness Journey?</h2>
              <p className="text-xl text-white/70 mb-8">Join thousands of satisfied users who have transformed their lives through our platform</p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/20">Learn More</Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;