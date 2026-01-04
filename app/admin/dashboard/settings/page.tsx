"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, User, Mail, Github, Linkedin, Twitter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Settings saved",
      description: "Your profile has been updated successfully.",
    })

    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your portfolio information and preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6" suppressHydrationWarning>
        {/* Personal Information */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-slate-400">Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-slate-300">
                  First Name
                </Label>
                <Input id="firstName" defaultValue="Nati" suppressHydrationWarning className="bg-slate-800 border-slate-700 text-white" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-slate-300">
                  Last Name
                </Label>
                <Input id="lastName" defaultValue="Ebisa Feysa" suppressHydrationWarning className="bg-slate-800 border-slate-700 text-white" />
              </div>
            </div>
            <div>
              <Label htmlFor="title" className="text-slate-300">
                Professional Title
              </Label>
              <Input
                id="title"
                defaultValue="Full Stack Developer & IT Professional"
                suppressHydrationWarning
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-slate-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                rows={4}
                defaultValue="Passionate Full Stack Developer specializing in MERN stack development with expertise in building scalable web applications."
                suppressHydrationWarning
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
            <CardDescription className="text-slate-400">Update your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="natiebi92@gmail.com"
                suppressHydrationWarning
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-slate-300">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+251 923 094 751"
                suppressHydrationWarning
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-slate-300">
                Location
              </Label>
              <Input
                id="location"
                defaultValue="Addis Ababa, Ethiopia"
                suppressHydrationWarning
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Social Media Links</CardTitle>
            <CardDescription className="text-slate-400">Update your social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="github" className="text-slate-300 flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Label>
              <Input
                id="github"
                type="url"
                placeholder="https://github.com/natifeyisa"
                suppressHydrationWarning
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="text-slate-300 flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                suppressHydrationWarning
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="twitter" className="text-slate-300 flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/yourhandle"
                suppressHydrationWarning
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
