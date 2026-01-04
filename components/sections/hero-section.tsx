"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail, Github, Linkedin, Instagram } from "lucide-react"
import { useEffect, useRef } from "react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleDownloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a')
    link.href = '/nati Resume.pdf' // Using the actual resume file in public folder
    link.download = 'Nati_Ebisa_Feysa_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleHireMe = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleViewProjects = () => {
    // Scroll to projects section
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(147, 112, 219, 0.3)"
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Profile Image */}
          <div className="mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full glass p-1 animate-in fade-in zoom-in duration-700">
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <img src="/professional-developer-avatar.png" alt="Nati Ebisa Feysa" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-balance bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-in fade-in duration-1000">
              Nati Ebisa Feysa
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-in fade-in duration-1000 delay-300">
              Full-Stack Developer | MERN Stack | Computer Science and Engineering Graduate
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed animate-in fade-in duration-1000 delay-500">
              Building innovative web solutions with expertise in hardware maintenance, software problem-solving, and
              full-stack development. Passionate about creating seamless digital experiences that solve real-world
              problems.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
            <Button 
              size="lg" 
              onClick={handleDownloadResume}
              className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <Download className="h-5 w-5" />
              Download Resume
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleHireMe}
              className="gap-2 bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              Hire Me
            </Button>
            <Button 
              size="lg" 
              onClick={handleViewProjects}
              className="bg-yellow-600 hover:bg-yellow-700 text-black shadow-lg hover:shadow-yellow-600/50 transition-all duration-300 hover:scale-105"
            >
              View Projects
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50"
            >
              <Github className="h-5 w-5 hover:text-yellow-500 transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50"
            >
              <Linkedin className="h-5 w-5 hover:text-yellow-500 transition-colors" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50"
            >
              <Instagram className="h-5 w-5 hover:text-yellow-500 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </section>
  )
}
