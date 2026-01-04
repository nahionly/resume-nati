"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, MailOpen, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const API_BASE = 'http://localhost:5000'

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/messages`, {
          headers: { 'Authorization': 'Bearer demo-token' }
        })
        const data = await res.json()
        setMessages(Array.isArray(data) ? data : [])
      } catch {}
    }
    load()
  }, [])

  const handleView = (message: any) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)
    // Mark as read
    setMessages(messages.map((m) => (m.id === message.id ? { ...m, status: "read" } : m)))
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this message?")) return
    await fetch(`${API_BASE}/api/messages/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer demo-token' } })
    setMessages((prev) => prev.filter((m) => String(m.id) !== String(id)))
  }

  const handleReplyViaEmail = (message: any) => {
    // Create Gmail compose URL with pre-filled data
    const subject = `Re: ${message.subject}`
    const body = `Hi ${message.name},

Thank you for reaching out through my portfolio website. I received your message:

"${message.message}"

Best regards,
Nati Ebisa Feysa
Full-Stack Developer`

    // Encode the parameters for URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(message.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank')
  }

  const unreadCount = messages.filter((m) => m.status === "unread").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-slate-400">
            You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
          {messages.length} Total
        </Badge>
      </div>

      <div className="space-y-3">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`
              bg-slate-900/50 backdrop-blur-sm border-slate-800 cursor-pointer
              transition-all hover:border-slate-700
              ${message.status === "unread" ? "border-l-4 border-l-blue-500" : ""}
            `}
            onClick={() => handleView(message)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {message.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${message.status === "unread" ? "text-white" : "text-slate-300"}`}>
                        {message.name}
                      </h3>
                      {message.status === "unread" && (
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{message.email}</p>
                    <p
                      className={`text-sm mb-2 ${message.status === "unread" ? "text-white font-medium" : "text-slate-300"}`}
                    >
                      {message.subject}
                    </p>
                    <p className="text-sm text-slate-500 line-clamp-2">{message.message}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {message.date} at {message.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {message.status === "unread" ? (
                    <Mail className="w-5 h-5 text-blue-400" />
                  ) : (
                    <MailOpen className="w-5 h-5 text-slate-500" />
                  )}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(message.id)
                    }}
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedMessage?.subject}</DialogTitle>
            <DialogDescription className="text-slate-400">
              From: {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span>
                {selectedMessage?.date} at {selectedMessage?.time}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => handleReplyViaEmail(selectedMessage)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Reply via Email
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDelete(selectedMessage?.id)}
                className="border-red-800 text-red-400 hover:bg-red-950/30"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
