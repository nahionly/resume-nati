"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Award, ExternalLink, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Certificate {
  id: string
  title: string
  organization: string
  category: string
  issueDate: string
  description: string
  certificateURL: string
  verifyLink: string
}

const API_BASE = "http://localhost:5000"

export function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/certificates`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        // Ensure data is always an array
        setCertificates(Array.isArray(data) ? data : [])
        setError(null)
        setIsLoaded(true)
      })
      .catch((err) => {
        console.error("Failed to fetch certificates:", err)
        setCertificates([]) // Set empty array on error
        setError("Failed to load certificates. Please try again later.")
        setIsLoaded(true)
      })
  }, [])

  const categories = ["All", ...Array.from(new Set((certificates || []).map((c) => c.category).filter(Boolean)))]

  const getImageUrl = (url: string) => {
    if (!url) return null
    if (url.startsWith("http")) return url
    if (url.startsWith("/") && !url.startsWith("/uploads")) return url
    const cleanPath = url.replace(/\\/g, "/")
    return cleanPath.startsWith("uploads/") ? `${API_BASE}/${cleanPath}` : cleanPath
  }

  const filteredCertificates = (certificates || []).filter((cert) => {
    const matchesCategory = selectedCategory === "All" || cert.category === selectedCategory
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="certificates" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-normal bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-in zoom-in duration-700">
                Certificates
              </h2>
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-in slide-in-from-left duration-1000 delay-300" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed animate-in fade-in duration-700 delay-500">
              Professional certifications demonstrating expertise across various technologies and domains.
            </p>
          </div>

          {/* Loading State */}
          {!isLoaded && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading certificates...</p>
            </div>
          )}

          {/* Error State */}
          {isLoaded && error && (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-red-400/50 mx-auto mb-4" />
              <p className="text-red-400 mb-2">Error Loading Certificates</p>
              <p className="text-muted-foreground text-sm">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Content - Only show when loaded and no error */}
          {isLoaded && !error && (
            <>
              {/* Search and Filter */}
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search certificates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass border-primary/20"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 animate-in fade-in duration-700 delay-300">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg shadow-yellow-500/50"
                          : "border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:scale-105"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Certificates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id}
                    className="glass rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 group cursor-pointer shadow-lg shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 hover:scale-105"
                    onClick={() => setSelectedCertificate(certificate)}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    {/* Certificate Preview */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      {getImageUrl(certificate.certificateURL) ? (
                        <img
                          src={getImageUrl(certificate.certificateURL)!}
                          alt={certificate.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <Award className="h-20 w-20 text-primary/40 group-hover:scale-110 transition-transform" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>

                    {/* Certificate Info */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg group-hover:text-yellow-500 transition-colors line-clamp-2">
                          {certificate.title}
                        </h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{certificate.issueDate}</span>
                      </div>
                      <p className="text-sm font-medium text-yellow-500">{certificate.organization}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {certificate.description}
                      </p>
                      <div className="pt-2">
                        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">
                          {certificate.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredCertificates.length === 0 && certificates.length > 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No certificates found matching your criteria.</p>
                </div>
              )}

              {/* No Certificates */}
              {certificates.length === 0 && (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No certificates available at the moment.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Certificate Detail Dialog */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCertificate?.title}</DialogTitle>
            <DialogDescription>
              Issued by {selectedCertificate?.organization} in {selectedCertificate?.issueDate}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Certificate Image Placeholder */}
            <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
              {getImageUrl(selectedCertificate?.certificateURL || "") ? (
                <img
                  src={getImageUrl(selectedCertificate?.certificateURL || "")!}
                  alt={selectedCertificate?.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Award className="h-32 w-32 text-primary/40" />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedCertificate?.description}</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">
                  {selectedCertificate?.category}
                </span>
              </div>
            </div>

            {selectedCertificate?.verifyLink && (
              <Button className="w-full gap-2 bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105" asChild>
                <a href={selectedCertificate.verifyLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Verify Certificate
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
