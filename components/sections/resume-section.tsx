"use client"

import { Button } from "@/components/ui/button"
import { Download, Briefcase, GraduationCap, Award } from "lucide-react"

const experience = [
  {
    title: "Full-Stack Developer",
    company: "Freelance",
    period: "2022 - Present",
    description:
      "Developed multiple MERN stack applications including student clearance systems, inventory management, and chat applications.",
  },
  {
    title: "IT Support Specialist",
    company: "Various Organizations",
    period: "2023 - Present",
    description: "Provided hardware maintenance, software troubleshooting, and system administration services.",
  },
]

const education = [
  {
    degree: "Bachelor of Computer Science & Engineering",
    institution: "Bule Hora University",
    period: "2021 - 2026",
    description: "Specialized in software engineering, data structures, and web development.",
  },
  {
    degree: "Bachelor of Business Management",
    institution: "Paradise College",
    period: "2021 - 2026",
    description: "Focused on human resource management and business operations.",
  },
]

export function ResumeSection() {
  const handleDownload = () => {
    // Create a link to download the resume
    const link = document.createElement('a')
    link.href = '/nati Resume.pdf' // Using the actual resume file in public folder
    link.download = 'Nati_Ebisa_Feysa_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="resume" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-normal bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-in zoom-in duration-700">
                Resume
              </h2>
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-in slide-in-from-left duration-1000 delay-300" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed animate-in fade-in duration-700 delay-500">
              A comprehensive overview of my professional experience and educational background.
            </p>
            <Button size="lg" onClick={handleDownload} className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105">
              <Download className="h-5 w-5" />
              Download PDF Resume
            </Button>
          </div>

          {/* Resume Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Experience Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center animate-pulse">
                  <Briefcase className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-normal text-yellow-500">Experience</h3>
              </div>

              {experience.map((item, index) => (
                <div key={index} className="glass rounded-xl p-6 space-y-3 hover:border-yellow-500/50 transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-xl hover:shadow-yellow-500/20 hover:scale-105 animate-in fade-in slide-in-from-left-4 duration-700" style={{ animationDelay: `${(index + 1) * 200}ms` }}>
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.period}</span>
                  </div>
                  <p className="text-sm font-medium text-yellow-500">{item.company}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Education Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center animate-pulse">
                  <GraduationCap className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-normal text-yellow-500">Education</h3>
              </div>

              {education.map((item, index) => (
                <div key={index} className="glass rounded-xl p-6 space-y-3 hover:border-yellow-500/50 transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-xl hover:shadow-yellow-500/20 hover:scale-105 animate-in fade-in slide-in-from-right-4 duration-700" style={{ animationDelay: `${(index + 1) * 200}ms` }}>
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-lg">{item.degree}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.period}</span>
                  </div>
                  <p className="text-sm font-medium text-yellow-500">{item.institution}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div className="glass rounded-2xl p-6 md:p-8 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center animate-pulse">
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-500">Key Achievements</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-yellow-500 mt-1">▹</span>
                <span className="text-muted-foreground leading-relaxed">
                  Successfully developed and deployed 6+ full-stack MERN applications serving real-world clients
                </span>
              </li>
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-yellow-500 mt-1">▹</span>
                <span className="text-muted-foreground leading-relaxed">
                  Completed dual bachelor's degrees in Computer Science and Business Management
                </span>
              </li>
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-yellow-500 mt-1">▹</span>
                <span className="text-muted-foreground leading-relaxed">
                  Expertise in hardware maintenance and software problem-solving across various platforms
                </span>
              </li>
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-yellow-500 mt-1">▹</span>
                <span className="text-muted-foreground leading-relaxed">
                  Proven track record in system administration and online system management
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
