"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const API_BASE = 'http://localhost:5000'

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCert, setEditingCert] = useState<any>(null)
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [viewerCert, setViewerCert] = useState<any>(null)
  const [zoom, setZoom] = useState<number>(1)

  const getImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg"
    if (url.startsWith("http")) return url
    const clean = url.replace(/\\/g, "/").replace(/^\//, "")
    if (clean.startsWith("uploads/")) return `${API_BASE}/${clean}`
    return `/${clean}`
  }

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/certificates`)
        const data = await res.json()
        setCertificates(Array.isArray(data) ? data : [])
      } catch {}
    }
    load()
  }, [])

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      setCertificates(certificates.filter((c) => c.id !== id))
    }
  }

  const handleEdit = (cert: any) => {
    setEditingCert(cert)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingCert(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Certificates</h1>
          <p className="text-slate-400">Add, edit, or remove your certifications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle>{editingCert ? "Edit Certificate" : "Add New Certificate"}</DialogTitle>
              <DialogDescription className="text-slate-400">Fill in the certificate details below</DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()
                if (isSubmitting) return
                setIsSubmitting(true)
                const fd = new FormData()
                const form = e.currentTarget as HTMLFormElement
                const get = (name: string) => (form.querySelector(`#${name}`) as HTMLInputElement | HTMLTextAreaElement)?.value || ''
                fd.append('title', get('title'))
                fd.append('organization', get('organization'))
                fd.append('issueDate', get('issueDate'))
                fd.append('category', category || editingCert?.category || '')
                fd.append('description', get('description'))
                fd.append('verifyLink', get('verifyLink'))
                if (file) fd.append('file', file)
                try {
                  if (editingCert?.id) {
                    const res = await fetch(`${API_BASE}/api/certificates/${editingCert.id}`, {
                      method: 'PUT',
                      headers: { 'Authorization': 'Bearer demo-token' },
                      body: fd,
                    })
                    const updated = await res.json()
                    setCertificates((prev) => prev.map((c) => (String(c.id) === String(updated.id) ? updated : c)))
                  } else {
                    const res = await fetch(`${API_BASE}/api/certificates`, {
                      method: 'POST',
                      headers: { 'Authorization': 'Bearer demo-token' },
                      body: fd,
                    })
                    const created = await res.json()
                    setCertificates((prev) => [created, ...prev])
                  }
                  setIsDialogOpen(false)
                  setEditingCert(null)
                  setCategory(undefined)
                  setFile(null)
                } finally {
                  setIsSubmitting(false)
                }
              }}
            >
              <div>
                <Label htmlFor="title">Certificate Title</Label>
                <Input
                  id="title"
                  placeholder="Enter certificate title"
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingCert?.title}
                />
              </div>
              <div>
                <Label htmlFor="organization">Issuing Organization</Label>
                <Input
                  id="organization"
                  placeholder="e.g., IBM, Google, Meta"
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingCert?.organization}
                />
              </div>
              <div>
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="date"
                  placeholder="YYYY-MM-DD"
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingCert?.issueDate}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description"
                  className="bg-slate-800 border-slate-700"
                  rows={4}
                  defaultValue={editingCert?.description}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category ?? editingCert?.category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="Cloud">Cloud Computing</SelectItem>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="verifyLink">Verification Link (optional)</Label>
                <Input
                  id="verifyLink"
                  type="url"
                  placeholder="https://..."
                  className="bg-slate-800 border-slate-700"
                  defaultValue={editingCert?.verifyLink}
                />
              </div>
              <div>
                <Label htmlFor="file">Certificate File (PNG/JPG/PDF)</Label>
                <Input id="file" type="file" accept="image/png,image/jpeg,application/pdf" className="bg-slate-800 border-slate-700" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600" disabled={isSubmitting}>
                  {editingCert ? (isSubmitting ? "Updating..." : "Update Certificate") : isSubmitting ? "Adding..." : "Add Certificate"}
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
            <CardHeader>
              <div className="aspect-video rounded-lg overflow-hidden bg-slate-800 mb-4 flex items-center justify-center">
                {cert.certificateURL ? (
                  cert.certificateURL.endsWith('.pdf') ? (
                    <ExternalLink className="w-10 h-10 text-white" />
                  ) : (
                    <img src={getImageUrl(cert.certificateURL)} alt={cert.title} className="w-full h-full object-cover" />
                  )
                ) : (
                  <ExternalLink className="w-10 h-10 text-white" />
                )}
              </div>
              <CardTitle className="text-white text-lg">{cert.title}</CardTitle>
              <p className="text-sm text-purple-400">{cert.organization}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Date:</span>
                  <span className="text-white">{cert.issueDate || cert.date}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Category:</span>
                  <span className="text-white">{cert.category}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => {
                    setViewerCert(cert)
                    setZoom(1)
                  }}
                  size="sm"
                  className="flex-1 bg-slate-800/70 border-slate-700"
                >
                  Preview
                </Button>
                <Button
                  onClick={() => handleEdit(cert)}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-slate-700 hover:bg-slate-800"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={async () => {
                    if (!confirm("Are you sure you want to delete this certificate?")) return
                    await fetch(`${API_BASE}/api/certificates/${cert.id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer demo-token' } })
                    setCertificates((prev) => prev.filter((c) => String(c.id) !== String(cert.id)))
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-800 text-red-400 hover:bg-red-950/30"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Viewer Dialog */}
      <Dialog open={!!viewerCert} onOpenChange={(open) => !open && setViewerCert(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>{viewerCert?.title}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {viewerCert?.organization} • {viewerCert?.issueDate || viewerCert?.date} • {viewerCert?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 overflow-auto">
              <div className="flex items-center justify-center">
                {viewerCert?.certificateURL ? (
                  viewerCert.certificateURL.endsWith('.pdf') ? (
                    <a href={getImageUrl(viewerCert.certificateURL)} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                      Open PDF
                    </a>
                  ) : (
                    <img
                      src={getImageUrl(viewerCert.certificateURL)}
                      alt={viewerCert?.title}
                      style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                      className="max-h-[60vh] object-contain"
                    />
                  )
                ) : (
                  <p className="text-slate-400">No file uploaded</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="zoom">Zoom</Label>
              <input id="zoom" type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="flex-1" />
            </div>
            <div className="flex gap-2">
              {viewerCert?.verifyLink && (
                <Button asChild className="gap-2">
                  <a href={viewerCert.verifyLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" /> Verify
                  </a>
                </Button>
              )}
              {viewerCert?.certificateURL && (
                <Button variant="outline" asChild>
                  <a href={getImageUrl(viewerCert.certificateURL)} download>
                    Download
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
