import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

// 3D Blob Component
const Blob = () => {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      <ambientLight intensity={1} />
      <directionalLight position={[3, 2, 1]} />
      <Sphere args={[1, 100, 200]} scale={1.5}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.5}
          speed={2}
        />
      </Sphere>
    </Canvas>
  );
};

// Animated gradient text component
const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
    {children}
  </span>
);

export default function Landing() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <GradientText>Buy & Sell</GradientText> Businesses <br />
            with <GradientText>Confidence</GradientText>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
            A <span className="font-semibold text-indigo-600">modern platform</span> where{' '}
            <strong>sellers initiate</strong> and deals flow through guided,
            low-friction workflows — from NDA to close.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/seller-onboarding" 
                className="btn-brand px-8 py-3 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100"
              >
                I'm a Seller
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/buyer-onboarding" 
                className="btn-subtle px-8 py-3 text-lg font-medium rounded-xl border border-indigo-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-50"
              >
                I'm a Buyer
              </Link>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <img
                  key={item}
                  src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  alt="User"
                />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Join <span className="font-semibold text-indigo-600">1,200+</span> professionals
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          
          <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-slate-100 shadow-2xl backdrop-blur-sm bg-white/30">
            <Blob />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h3 className="font-bold text-xl">Streamlined Process</h3>
              <p className="text-sm opacity-80">From initial contact to final signature</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <div className="hidden lg:block">
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-indigo-400 opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/3 right-20 w-6 h-6 rounded-full bg-purple-400 opacity-20"
        />
      </div>
    </section>
  );
}