"use client"

import { Navigation } from "@/components/navigation"
import { useEffect, useState } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ResumeSection } from "@/components/sections/resume-section"
import { CertificatesSection } from "@/components/sections/certificates-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Track profile view only on client side
    try {
      const key = "profileViewTracked"
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1")
        fetch("http://localhost:5000/api/analytics/profile-view", { method: "POST" }).catch(() => {})
      }
    } catch {}
  }, [])

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ResumeSection />
      <CertificatesSection />
      <ContactSection />
    </div>
  )
}
