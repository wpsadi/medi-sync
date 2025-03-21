"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowRight, Clock,QrCode, Shield } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 -z-10" />

      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Medi-Sync
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-xl text-muted-foreground mb-8 md:mb-12">{"you help all time near u"}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                {"Get Started"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/qr-system">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
               
                {"QR System"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{"feature title"}</h3>
              <p className="text-muted-foreground">{"hero.feature1.description"}</p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{"hero.feature2.title"}</h3>
              <p className="text-muted-foreground">{"hero.feature2.description"}</p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{"hero.feature3.title"}</h3>
              <p className="text-muted-foreground">{"hero.feature3.description"}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

