const path = require("path")
const fs = require("fs")
const express = require("express")
const cors = require("cors")
const multer = require("multer")
const mongoose = require("mongoose")
require("dotenv").config()

const Project = require("./models/Project")
const Certificate = require("./models/Certificate")
const Message = require("./models/Message")
const Metric = require("./models/Metric")

const app = express()
const PORT = process.env.PORT || 5000
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resume-nati"

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Simple admin auth
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || ""
  if (auth === "Bearer demo-token") return next()
  return res.status(401).json({ error: "unauthorized" })
}

// Multer storage
const uploadDir = path.join(__dirname, "uploads")
fs.mkdirSync(uploadDir, { recursive: true })
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`
    cb(null, safeName)
  },
})
const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ok = ["image/png", "image/jpeg", "image/jpg", "application/pdf"].includes(file.mimetype)
    cb(ok ? null : new Error("invalid file type"), ok)
  },
})

app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

app.get("/", (req, res) => {
  res.send(
    "Resume Nati API is running with MongoDB. Use /health and /api/projects, /api/certificates, /api/messages, /api/contact, /api/auth/login."
  )
})

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {}
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ success: true, token: "demo-token" })
  } else {
    res.status(401).json({ success: false })
  }
})

// --- PROJECTS ---

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/projects", requireAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put("/api/projects/:id", requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ error: "Not found" })
    res.json(project)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete("/api/projects/:id", requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ error: "Not found" })
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// --- CERTIFICATES ---

app.get("/api/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 })
    res.json(certificates)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/certificates/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
    if (!certificate) return res.status(404).json({ error: "Not found" })
    res.json(certificate)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/certificates", requireAdmin, upload.single("file"), async (req, res) => {
  try {
    const body = req.body || {}
    const filePath = req.file ? path.join("uploads", req.file.filename) : body.certificateURL
    
    const certificate = await Certificate.create({
      title: body.title,
      organization: body.organization,
      category: body.category,
      issueDate: body.issueDate,
      description: body.description,
      certificateURL: filePath,
      verifyLink: body.verifyLink,
    })
    res.status(201).json(certificate)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put("/api/certificates/:id", requireAdmin, upload.single("file"), async (req, res) => {
  try {
    const body = req.body || {}
    const certificate = await Certificate.findById(req.params.id)
    if (!certificate) return res.status(404).json({ error: "Not found" })

    const newPath = req.file ? path.join("uploads", req.file.filename) : certificate.certificateURL

    const updated = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        title: body.title || certificate.title,
        organization: body.organization || certificate.organization,
        category: body.category || certificate.category,
        issueDate: body.issueDate || certificate.issueDate,
        description: body.description || certificate.description,
        certificateURL: newPath,
        verifyLink: body.verifyLink || certificate.verifyLink,
      },
      { new: true }
    )
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete("/api/certificates/:id", requireAdmin, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id)
    if (!certificate) return res.status(404).json({ error: "Not found" })
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// --- MESSAGES ---

app.get("/api/messages", requireAdmin, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {}
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing fields" })
    }
    
    const now = new Date()
    const date = now.toISOString().split('T')[0] // YYYY-MM-DD
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    const newMessage = await Message.create({ 
      name, 
      email, 
      subject, 
      message,
      date,
      time
    })
    res.status(201).json(newMessage)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete("/api/messages/:id", requireAdmin, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)
    if (!message) return res.status(404).json({ error: "Not found" })
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// --- STATS & ANALYTICS ---

app.get("/api/stats", requireAdmin, async (_req, res) => {
  try {
    const [projects, certificates, messages, profileMetric] = await Promise.all([
      Project.countDocuments(),
      Certificate.countDocuments(),
      Message.countDocuments(),
      Metric.findOne({ key: "profile_views" }),
    ])
    res.json({
      projects,
      certificates,
      messages,
      profileViews: profileMetric?.value || 0,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/analytics/profile-view", async (_req, res) => {
  try {
    const metric = await Metric.findOneAndUpdate(
      { key: "profile_views" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    )
    res.json({ success: true, value: metric.value })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
