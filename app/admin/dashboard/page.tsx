"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, Award, Mail, Eye, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const API_BASE = 'http://localhost:5000'

type StatItem = { title: string; value: string | number; icon: any; trend?: string; color: string }

function toItems(stats: {projects: number; certificates: number; messages: number; profileViews: number}): StatItem[] {
  return [
    { title: 'Total Projects', value: stats.projects, icon: FolderKanban, trend: 'Live', color: 'from-blue-500 to-cyan-500' },
    { title: 'Certificates', value: stats.certificates, icon: Award, trend: 'Live', color: 'from-purple-500 to-pink-500' },
    { title: 'Messages', value: stats.messages, icon: Mail, trend: 'Live', color: 'from-orange-500 to-red-500' },
    { title: 'Profile Views', value: stats.profileViews, icon: Eye, trend: 'Live', color: 'from-green-500 to-emerald-500' },
  ]
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<StatItem[]>([])
  const [recentMessages, setRecentMessages] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, msgsRes] = await Promise.all([
          fetch(`${API_BASE}/api/stats`, { headers: { 'Authorization': 'Bearer demo-token' } }),
          fetch(`${API_BASE}/api/messages`, { headers: { 'Authorization': 'Bearer demo-token' } })
        ])
        const statsJson = await statsRes.json()
        setStats(toItems(statsJson))
        const msgsJson = await msgsRes.json()
        setRecentMessages(Array.isArray(msgsJson) ? msgsJson.slice(0, 3) : [])
      } catch (e) {
        console.error('Failed to load dashboard stats', e)
      }
    }
    load()
  }, [])
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back, Nati. Here's your portfolio analytics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages.map((message, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {String(message.name || '').charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-white truncate">{message.name}</p>
                    <span className="text-xs text-slate-500">{message.time || message.createdAt?.slice(0,10)}</span>
                  </div>
                  <p className="text-sm text-slate-400 truncate">{message.email}</p>
                  <p className="text-sm text-slate-300 mt-1">{message.subject}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              className="w-full p-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all text-left"
              onClick={() => router.push('/admin/dashboard/projects')}
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="w-5 h-5 text-white" />
                <div>
                  <p className="font-medium text-white">Add New Project</p>
                  <p className="text-sm text-blue-100">Showcase your latest work</p>
                </div>
              </div>
            </button>
            <button
              className="w-full p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all text-left border border-slate-700"
              onClick={() => router.push('/admin/dashboard/certificates')}
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium text-white">Add Certificate</p>
                  <p className="text-sm text-slate-400">Upload new certification</p>
                </div>
              </div>
            </button>
            <button
              className="w-full p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all text-left border border-slate-700"
              onClick={() => router.push('/admin/dashboard/messages')}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="font-medium text-white">View Messages</p>
                  <p className="text-sm text-slate-400">Check contact inquiries</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
