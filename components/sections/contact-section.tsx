"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        form.reset()
      } else {
        // Get error details from response
        let errorMessage = "Failed to send message. Please try again."
        try {
          const errorData = await res.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          // If can't parse JSON, use default message
        }
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error("Contact form error:", error)
      
      // Provide user-friendly error messages
      let userMessage = "Failed to send message. Please try again."
      
      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          userMessage = "Unable to connect to server. Please check your internet connection."
        } else if (error.message.includes("timeout")) {
          userMessage = "Request timed out. Please try again later."
        } else if (error.message.includes("NetworkError")) {
          userMessage = "Network error. Please check your connection and try again."
        } else {
          userMessage = error.message
        }
      }
      
      toast({
        title: "Error",
        description: userMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-normal bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-in zoom-in duration-700">
                Get In Touch
              </h2>
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-in slide-in-from-left duration-1000 delay-300" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed animate-in fade-in duration-700 delay-500">
              Have a project in mind or want to discuss opportunities? Feel free to reach out!
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
              <div className="glass rounded-2xl p-6 md:p-8 space-y-6 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300">
                <h3 className="text-2xl font-normal mb-6 text-yellow-500">Contact Information</h3>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href="mailto:nahiionly@gmail.com"
                      className="text-muted-foreground hover:text-yellow-500 transition-colors"
                    >
                      nahiionly@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">Phone</h4>
                    <a
                      href="tel:+251942435347"
                      className="text-muted-foreground hover:text-yellow-500 transition-colors"
                    >
                      +251 942 435 347
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-2xl p-6 md:p-8 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300">
                <h3 className="text-xl font-normal mb-4 text-yellow-500">Connect With Me</h3>
                <div className="flex gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50"
                  >
                    <Github className="h-5 w-5 hover:text-yellow-500 transition-colors" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50"
                  >
                    <Linkedin className="h-5 w-5 hover:text-yellow-500 transition-colors" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50"
                  >
                    <Instagram className="h-5 w-5 hover:text-yellow-500 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass rounded-2xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02156632103!2d38.6156061!3d8.9806346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass rounded-2xl p-6 md:p-8 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
              <h3 className="text-2xl font-normal mb-6 text-yellow-500">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required className="glass" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="glass"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" name="subject" placeholder="What is this about?" required className="glass" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    required
                    rows={6}
                    className="glass resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Button type="submit" size="lg" className="w-full gap-2 bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                  {/* Alternative Contact Method */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Or contact me directly:</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                      onClick={() => {
                        const subject = encodeURIComponent("Portfolio Contact")
                        const body = encodeURIComponent("Hi Nati,\n\nI'm interested in discussing...")
                        window.open(`mailto:nahiionly@gmail.com?subject=${subject}&body=${body}`, '_blank')
                      }}
                    >
                      <Mail className="h-4 w-4" />
                      Email Directly
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Nati Logo" className="h-12 w-12 object-contain" />
                <div className="flex flex-col">
                  <span className="text-lg font-medium">Nati</span>
                  <span className="text-xs text-muted-foreground">Full-Stack Developer</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building innovative web solutions with expertise in MERN stack development.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-yellow-500">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#home" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-yellow-500">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#resume" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    Resume
                  </Link>
                </li>
                <li>
                  <Link href="#certificates" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    Certificates
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-yellow-500">Get In Touch</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <a 
                    href="mailto:nahiionly@gmail.com" 
                    className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors break-all"
                  >
                    nahiionly@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <a 
                    href="tel:+251942435347" 
                    className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors"
                  >
                    +251 942 435 347
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Addis Ababa, Ethiopia
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © 2025 Nati Ebisa Feysa. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>

              {/* Tech Stack */}
              <p className="text-sm text-muted-foreground text-center md:text-right">
                Built with Next.js & TailwindCSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
