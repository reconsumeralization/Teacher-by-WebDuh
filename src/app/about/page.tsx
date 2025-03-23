"use client"

import { motion } from "framer-motion"
import { Brain, BookOpen, Users, Globe, Target, Sparkles, Database, Network, Shield } from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Transforming Education Through AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Teacher by WebDuh is revolutionizing education by bridging the gap between traditional learning and cutting-edge AI technology.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Teacher by WebDuh, we&apos;re on a mission to eliminate educational inequality and accelerate human development through personalized AI-powered learning experiences. We believe that every student deserves access to world-class education, regardless of their background or circumstances.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Equal Access</h3>
                    <p className="text-muted-foreground">Breaking down barriers to quality education through innovative technology.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Sparkles className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Personalized Learning</h3>
                    <p className="text-muted-foreground">Adaptive learning paths tailored to individual needs and learning styles.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeIn}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <div className="h-full flex flex-col justify-center">
                  <Brain className="h-16 w-16 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">AI-Powered Education</h3>
                  <p className="text-muted-foreground">
                    Leveraging advanced AI to create dynamic, engaging, and effective learning experiences that adapt to each student's unique journey.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="p-6 rounded-xl bg-background border shadow-sm"
              variants={fadeIn}
            >
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Engaging content that combines traditional pedagogy with modern interactive elements.
              </p>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl bg-background border shadow-sm"
              variants={fadeIn}
            >
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Connect with peers and educators in a supportive learning environment.
              </p>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl bg-background border shadow-sm"
              variants={fadeIn}
            >
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-muted-foreground">
                Quality education available to anyone, anywhere, at any time.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technical Innovation Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Advanced Learning Technology</h2>
            <p className="text-lg text-muted-foreground">
              Powered by sophisticated AI systems that ensure consistent, personalized learning experiences
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="p-6 rounded-xl bg-background border shadow-sm"
              variants={fadeIn}
            >
              <Database className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Context-Aware Learning</h3>
              <p className="text-muted-foreground">
                Our model context providers maintain consistent learning states, ensuring your progress is tracked and adapted in real-time.
              </p>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl bg-background border shadow-sm"
              variants={fadeIn}
            >
              <Network className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Adaptive Intelligence</h3>
              <p className="text-muted-foreground">
                Dynamic learning paths that evolve based on your performance, preferences, and learning style.
              </p>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl bg-background border shadow-sm"
              variants={fadeIn}
            >
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Learning Environment</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security ensuring your learning data is protected and your progress is consistently maintained.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-2">Model Context Providers</h4>
                <p className="text-muted-foreground mb-4">
                  Our advanced AI system uses sophisticated model context providers to maintain consistent learning states across your educational journey. This ensures:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Real-time progress tracking and adaptation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Personalized learning path optimization
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Seamless state management across devices
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Learning Consistency</h4>
                <p className="text-muted-foreground mb-4">
                  The system ensures your learning experience remains consistent by:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Maintaining session state and progress
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Adapting content based on performance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Providing real-time feedback and adjustments
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join the Educational Revolution</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Be part of the future of education. Start your learning journey with Teacher by WebDuh today.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 