"use client"

import { useState, useEffect, useRef } from "react"
import { Code2, Database, Wrench, Users } from "lucide-react"

const skillCategories = [
  {
    title: "Technical Skills",
    icon: Code2,
    skills: [
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React.js", level: 85 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "HTML / CSS", level: 95 },
      { name: "PHP", level: 75 },
    ],
  },
  {
    title: "Database & Backend",
    icon: Database,
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "Git & GitHub", level: 90 },
    ],
  },
  {
    title: "IT & System Management",
    icon: Wrench,
    skills: [
      { name: "Hardware Maintenance", level: 90 },
      { name: "Software Problem Solver", level: 85 },
      { name: "System Administration", level: 80 },
      { name: "WordPress", level: 75 },
    ],
  },
  {
    title: "Business & Management",
    icon: Users,
    skills: [
      { name: "Account Management", level: 85 },
      { name: "Human Resource Management", level: 80 },
      { name: "Online System Management", level: 85 },
      { name: "Problem Solving", level: 90 },
    ],
  },
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null)

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-normal bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-in zoom-in duration-700">
                Skills & Expertise
              </h2>
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-in slide-in-from-left duration-1000 delay-300" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed animate-in fade-in duration-700 delay-500">
              A comprehensive skill set spanning full-stack development, system administration, and business management.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 animate-in fade-in duration-700 delay-300">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              const isActive = activeCategory === index
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/50 scale-105"
                      : "glass hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:scale-105"
                  }`}
                  style={{
                    animation: `slideInScale 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Animated background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-transform duration-500 ${
                    isActive ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'
                  }`} />
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-2">
                    <Icon className={`h-5 w-5 transition-all duration-500 ${
                      isActive ? 'rotate-0 scale-110' : 'rotate-0 group-hover:rotate-12 group-hover:scale-110'
                    }`} />
                    <span className={`font-medium transition-all duration-300 ${
                      isActive ? 'text-black' : 'group-hover:text-black'
                    }`}>
                      {category.title}
                    </span>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-black rounded-t-full animate-in slide-in-from-bottom-2 duration-300" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories[activeCategory].skills.map((skill, index) => {
              const isHovered = hoveredIndex === index
              const isAnimating = animatingIndex === index
              const row = Math.floor(index / 2)
              
              return (
                <div
                  key={`${activeCategory}-${index}`}
                  className="group relative glass rounded-xl p-6 space-y-3 hover:border-yellow-500/50 transition-all duration-500 shadow-lg shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  onMouseEnter={() => {
                    setHoveredIndex(index)
                    setAnimatingIndex(index)
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null)
                  }}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${row * 0.15}s both`,
                  }}
                >
                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full transition-all duration-500 group-hover:w-32 group-hover:h-32" />
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex justify-between items-center">
                    <h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-yellow-500">
                      {skill.name}
                    </h3>
                    <span className={`text-sm font-medium transition-all duration-500 ${
                      isHovered ? 'text-yellow-500 scale-125' : 'text-muted-foreground'
                    }`}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    {/* Background shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-shimmer" 
                         style={{ backgroundSize: '200% 100%' }} />
                    
                    {/* Progress bar */}
                    <div
                      className="relative h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/50 transition-shadow duration-300 group-hover:shadow-yellow-500/80"
                      style={{
                        width: (isHovered || !isAnimating) ? `${skill.level}%` : '0%',
                        transition: isHovered ? 'width 2s ease-out, shadow 0.3s ease' : 'shadow 0.3s ease',
                      }}
                    >
                      {/* Shine effect on progress bar */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" 
                           style={{ backgroundSize: '200% 100%' }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Additional Skills Tags */}
          <div className="glass rounded-2xl p-6 md:p-8 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 animate-in fade-in duration-700 delay-500">
            <h3 className="text-xl font-medium mb-6 text-foreground">Core Competencies</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-yellow-500 text-black font-medium border border-yellow-600 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 cursor-pointer hover:scale-110">
                Data Structures & Algorithms
              </span>
              <span className="px-4 py-2 rounded-full bg-yellow-500 text-black font-medium border border-yellow-600 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 cursor-pointer hover:scale-110">
                MERN Stack Development
              </span>
              <span className="px-4 py-2 rounded-full bg-yellow-500 text-black font-medium border border-yellow-600 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 cursor-pointer hover:scale-110">
                Responsive Web Design
              </span>
              <span className="px-4 py-2 rounded-full bg-yellow-500 text-black font-medium border border-yellow-600 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 cursor-pointer hover:scale-110">
                API Development
              </span>
              <span className="px-4 py-2 rounded-full bg-yellow-500 text-black font-medium border border-yellow-600 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 cursor-pointer hover:scale-110">
                Database Design
              </span>
              <span className="px-4 py-2 rounded-full bg-yellow-500 text-black font-medium border border-yellow-600 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 cursor-pointer hover:scale-110">
                Project Management
              </span>
            </div>
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        
        .animate-shine {
          animation: shine 2s linear infinite;
        }
      `}</style>
    </section>
  )
}
