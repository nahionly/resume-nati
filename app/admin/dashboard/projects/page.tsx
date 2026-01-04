"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, Play, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

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

const initialProjects: Project[] = [
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioProjects')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Failed to parse saved projects', e)
        }
      }
    }
    return initialProjects
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { toast } = useToast()

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioProjects', JSON.stringify(newProjects))
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const filtered = projects.filter((p) => p.id !== id)
      updateProjects(filtered)
      toast({
        title: "Project Deleted",
        description: "The project has been successfully deleted.",
      })
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingProject(null)
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    
    const fd = new FormData(e.currentTarget)
    const techStr = String(fd.get('tech') || '')
    
    const projectData = {
      title: String(fd.get('title') || ''),
      description: String(fd.get('description') || ''),
      tech: techStr.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: String(fd.get('githubUrl') || ''),
      liveUrl: String(fd.get('liveUrl') || ''),
      videoUrl: String(fd.get('videoUrl') || ''),
      image: String(fd.get('image') || ''),
    }

    try {
      if (editingProject?.id) {
        // Update existing project
        const updated = { ...projectData, id: editingProject.id }
        const updatedProjects = projects.map((p) => (p.id === editingProject.id ? updated : p))
        updateProjects(updatedProjects)
        toast({
          title: "Project Updated",
          description: "The project has been successfully updated.",
        })
      } else {
        // Add new project
        const newId = Math.max(...projects.map(p => p.id), 0) + 1
        const created = { ...projectData, id: newId }
        const newProjects = [created, ...projects]
        updateProjects(newProjects)
        toast({
          title: "Project Added",
          description: "The new project has been successfully added.",
        })
      }
      setIsDialogOpen(false)
      setEditingProject(null)
    } catch (e) {
      console.error("Failed to save", e)
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Projects</h1>
          <p className="text-slate-400">Add, edit, or remove your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              <DialogDescription className="text-slate-400">Fill in the project details below</DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter project title"
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingProject?.title}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  className="bg-slate-800 border-slate-700"
                  rows={4}
                  defaultValue={editingProject?.description}
                />
              </div>
              <div>
                <Label htmlFor="tech">Technologies (comma separated)</Label>
                <Input
                  id="tech"
                  name="tech"
                  placeholder="React, Node.js, MongoDB"
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingProject?.tech?.join(", ")}
                />
              </div>
              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/..."
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingProject?.githubUrl}
                />
              </div>
              <div>
                <Label htmlFor="liveUrl">Live Demo URL</Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  type="url"
                  placeholder="https://demo.example.com"
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingProject?.liveUrl}
                />
              </div>
              <div>
                <Label htmlFor="videoUrl">Video URL (YouTube embed)</Label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  type="url"
                  placeholder="https://www.youtube.com/embed/..."
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingProject?.videoUrl}
                />
              </div>
              <div>
                <Label htmlFor="image">Project Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://... or /image.jpg"
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingProject?.image}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600" disabled={isSubmitting}>
                  {editingProject ? (isSubmitting ? "Updating..." : "Update Project") : isSubmitting ? "Adding..." : "Add Project"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card 
            key={project.id} 
            className="group relative bg-slate-900/50 backdrop-blur-sm border-slate-800 hover:border-yellow-500/50 transition-all duration-500 shadow-lg shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-105 hover:-translate-y-2 overflow-hidden"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
            }}
          >
            {/* Animated corner ribbon */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-yellow-500/20 border-l-[60px] border-l-transparent transition-all duration-500 group-hover:border-t-[80px] group-hover:border-l-[80px] z-10" />
            
            <CardHeader className="p-0">
              <div className="relative aspect-video rounded-t-lg overflow-hidden bg-slate-800">
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
            </CardHeader>
            <CardContent className="relative p-6 space-y-4 bg-gradient-to-b from-transparent to-slate-900/50">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
              
              <CardTitle className="relative text-white group-hover:text-yellow-500 transition-all duration-300 group-hover:translate-x-1">
                {project.title}
              </CardTitle>
              <p className="relative text-slate-400 text-sm line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
                {project.description}
              </p>
              <div className="relative flex flex-wrap gap-2">
                {(project.tech || []).map((tech: string, techIndex: number) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer hover:scale-110"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="relative flex gap-2 pt-2">
                <Button
                  onClick={() => handleEdit(project)}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50"
                >
                  <Pencil className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(project.id)}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                >
                  <Trash2 className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video/Image Preview Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-slate-400">{selectedProject?.description}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-800">
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
    </div>
  )
}
