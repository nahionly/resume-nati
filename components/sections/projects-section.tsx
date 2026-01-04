"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Play, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  videoUrl: string
  githubUrl: string
  liveUrl: string
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Online Student Clearance System",
    description:
      "A comprehensive MERN stack application for managing student clearance processes with role-based access control and automated workflow management.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/student-clearance-dashboard.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "Adama Administration Inventory Management",
    description:
      "Full-featured inventory management system with real-time tracking, analytics dashboard, and automated reporting for efficient resource management.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
    image: "/inventory-management-system.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Student Management System",
    description:
      "Complete student information system with grade management, attendance tracking, and parent portal integration for seamless communication.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    image: "/student-management-dashboard.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Movie Reservation Management System",
    description:
      "Interactive movie booking platform with seat selection, payment integration, and real-time availability updates for theaters.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: "/movie-ticket-booking-interface.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 5,
    title: "Real-time Chat Application",
    description:
      "Feature-rich chat application with private messaging, group chats, file sharing, and real-time notifications using Socket.io.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    image: "/modern-chat-app.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 6,
    title: "Portfolio CMS",
    description:
      "Dynamic content management system for portfolio websites with drag-and-drop interface and customizable themes.",
    tech: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    image: "/portfolio-cms-dashboard.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "#",
    liveUrl: "#",
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>(defaultProjects)

  useEffect(() => {
    // Load projects from localStorage
    const loadProjects = () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('portfolioProjects')
        if (saved) {
          try {
            setProjects(JSON.parse(saved))
          } catch (e) {
            console.error('Failed to parse saved projects', e)
          }
        }
      }
    }

    loadProjects()

    // Listen for storage changes (when admin updates projects)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolioProjects' && e.newValue) {
        try {
          setProjects(JSON.parse(e.newValue))
        } catch (err) {
          console.error('Failed to parse projects from storage event', err)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-normal bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-in zoom-in duration-700">
                Featured Projects
              </h2>
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-in slide-in-from-left duration-1000 delay-300" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed animate-in fade-in duration-700 delay-500">
              Showcasing real-world MERN stack applications with comprehensive functionality and modern user
              experiences.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative glass rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-500 shadow-lg shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-105 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                {/* Animated corner ribbon */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-yellow-500/20 border-l-[60px] border-l-transparent transition-all duration-500 group-hover:border-t-[80px] group-hover:border-l-[80px] z-10" />
                
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                  />
                  
                  {/* Small play/view button - always visible */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-yellow-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-yellow-500/50 hover:scale-110 hover:bg-yellow-500 transition-all duration-300 z-20 group/btn"
                  >
                    {project.videoUrl ? (
                      <Play className="h-5 w-5 ml-0.5 text-black transition-transform duration-300 group-hover/btn:scale-110" />
                    ) : (
                      <Eye className="h-5 w-5 text-black transition-transform duration-300 group-hover/btn:scale-110" />
                    )}
                  </button>
                  
                  {/* Large view button on hover - center */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"
                  >
                    <div className="relative w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/50 hover:scale-125 transition-all duration-300 animate-pulse-slow">
                      {/* Ripple effect */}
                      <div className="absolute inset-0 rounded-full bg-yellow-500 animate-ping opacity-75" />
                      <div className="relative z-10">
                        {project.videoUrl ? <Play className="h-8 w-8 ml-1 text-black" /> : <Eye className="h-8 w-8 text-black" />}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Project Info */}
                <div className="relative p-6 space-y-4 bg-gradient-to-b from-transparent to-background/50">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
                  
                  <h3 className="relative text-xl font-bold group-hover:text-yellow-500 transition-all duration-300 group-hover:translate-x-1">
                    {project.title}
                  </h3>
                  <p className="relative text-sm text-muted-foreground line-clamp-3 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="relative flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer hover:scale-110"
                        style={{
                          animation: `slideInScale 0.3s ease-out ${techIndex * 0.05}s both`,
                          animationPlayState: 'paused',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.animationPlayState = 'running'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="relative flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 gap-2 bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50" 
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                        Code
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 gap-2 bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105" 
                      onClick={() => window.location.href = project.liveUrl}
                    >
                      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      Demo
                    </Button>
                    {project.videoUrl && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 gap-2 bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50" 
                        onClick={() => {
                          if (project.videoUrl) {
                            window.location.href = project.videoUrl
                          }
                        }}
                      >
                        <Play className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        Video
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video/Image Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>{selectedProject?.description}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
            {selectedProject?.videoUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={selectedProject.videoUrl.replace('watch?v=', 'embed/')}
                title={selectedProject.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <img
                src={selectedProject?.image || "/placeholder.svg"}
                alt={selectedProject?.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedProject?.tech.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">
                {tech}
              </span>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
