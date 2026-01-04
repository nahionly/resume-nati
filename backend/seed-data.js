const mongoose = require("mongoose")
require("dotenv").config()

const Project = require("./models/Project")
const Certificate = require("./models/Certificate")
const Message = require("./models/Message")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resume-nati"

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Certificate.deleteMany({}),
      Message.deleteMany({})
    ])
    console.log("Cleared existing data")

    // Sample Certificates
    const certificates = [
      {
        title: "Full Stack Web Development",
        organization: "Meta (Facebook)",
        category: "Web Development",
        issueDate: "2024-01-15",
        description: "Comprehensive course covering React, Node.js, Express, and MongoDB. Built multiple full-stack applications with modern web technologies.",
        certificateURL: "/placeholder.svg",
        verifyLink: "https://coursera.org/verify/certificate123"
      },
      {
        title: "AWS Cloud Practitioner",
        organization: "Amazon Web Services",
        category: "Cloud",
        issueDate: "2023-11-20",
        description: "Foundational understanding of AWS Cloud services, security, architecture, pricing, and support.",
        certificateURL: "/placeholder.svg",
        verifyLink: "https://aws.amazon.com/verification/certificate456"
      },
      {
        title: "JavaScript Algorithms and Data Structures",
        organization: "freeCodeCamp",
        category: "Web Development",
        issueDate: "2023-09-10",
        description: "Advanced JavaScript concepts including ES6, algorithms, data structures, and functional programming.",
        certificateURL: "/placeholder.svg",
        verifyLink: "https://freecodecamp.org/certification/certificate789"
      },
      {
        title: "MongoDB Developer Certification",
        organization: "MongoDB University",
        category: "Database",
        issueDate: "2023-08-05",
        description: "Database design, querying, indexing, and performance optimization with MongoDB.",
        certificateURL: "/placeholder.svg",
        verifyLink: "https://university.mongodb.com/certification/abc123"
      },
      {
        title: "Machine Learning Fundamentals",
        organization: "Google",
        category: "AI/ML",
        issueDate: "2023-06-12",
        description: "Introduction to machine learning concepts, supervised and unsupervised learning, and TensorFlow basics.",
        certificateURL: "/placeholder.svg",
        verifyLink: "https://developers.google.com/certification/def456"
      }
    ]

    // Sample Messages
    const messages = [
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@techcorp.com",
        subject: "Job Opportunity - Senior Full Stack Developer",
        message: "Hi Nati,\n\nI came across your portfolio and I'm impressed with your work! We have an exciting opportunity for a Senior Full Stack Developer position at TechCorp. The role involves working with React, Node.js, and AWS - technologies I see you're proficient in.\n\nWould you be interested in discussing this opportunity further? I'd love to schedule a call to learn more about your experience and share details about the position.\n\nBest regards,\nSarah Johnson\nTalent Acquisition Manager",
        status: "unread",
        date: "2024-01-03",
        time: "2:30 PM"
      },
      {
        name: "Michael Chen",
        email: "m.chen@startup.io",
        subject: "Freelance Project Inquiry",
        message: "Hello Nati,\n\nI'm reaching out regarding a potential freelance project. We're a startup looking to build a modern web application with real-time features. Based on your portfolio, particularly your chat application project, I believe you'd be a great fit.\n\nThe project involves:\n- React/Next.js frontend\n- Node.js/Express backend\n- Real-time messaging with Socket.io\n- MongoDB database\n\nWould you be available for a brief call this week to discuss the details and timeline?\n\nThanks,\nMichael Chen\nCTO, StartupIO",
        status: "unread",
        date: "2024-01-02",
        time: "11:15 AM"
      },
      {
        name: "Emily Rodriguez",
        email: "emily.r@designstudio.com",
        subject: "Collaboration Opportunity",
        message: "Hi there!\n\nI'm a UI/UX designer and I love the clean, modern design of your portfolio. I have several clients who need full-stack development work, and I think we could make a great team.\n\nWould you be interested in collaborating on some projects? I handle the design and user experience, and you could take care of the development side.\n\nLet me know if you'd like to chat more about this!\n\nBest,\nEmily Rodriguez\nSenior UI/UX Designer",
        status: "read",
        date: "2024-01-01",
        time: "4:45 PM"
      },
      {
        name: "David Kim",
        email: "david@webagency.net",
        subject: "Question about your Movie Booking System",
        message: "Hey Nati,\n\nI saw your movie ticket booking system project and I'm really impressed! The interface is clean and the functionality looks solid.\n\nI'm working on a similar project for a client and I'm curious about a few technical details:\n1. How did you handle seat selection and booking conflicts?\n2. What payment integration did you use?\n3. Any challenges you faced with real-time seat availability?\n\nWould appreciate any insights you could share!\n\nThanks,\nDavid Kim\nLead Developer",
        status: "read",
        date: "2023-12-30",
        time: "9:20 AM"
      },
      {
        name: "Lisa Thompson",
        email: "lisa.thompson@university.edu",
        subject: "Speaking Opportunity",
        message: "Dear Nati,\n\nI hope this message finds you well. I'm organizing a tech talk series at our university and I'd love to invite you to speak about full-stack development and your journey as a developer.\n\nThe event would be:\n- Date: February 15th, 2024\n- Duration: 45 minutes + Q&A\n- Audience: Computer Science students\n- Format: In-person or virtual\n\nWe can offer a speaking fee and would be happy to accommodate your schedule. The students would really benefit from hearing about your real-world experience and projects.\n\nPlease let me know if you're interested!\n\nBest regards,\nLisa Thompson\nCS Department Coordinator",
        status: "unread",
        date: "2023-12-28",
        time: "1:10 PM"
      }
    ]

    // Sample Projects
    const projects = [
      {
        title: "Modern Chat Application",
        description: "Real-time messaging app with Socket.io, featuring group chats, file sharing, and emoji reactions. Built with React, Node.js, and MongoDB.",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
        imageURL: "/modern-chat-app.png",
        liveURL: "https://chat-app-demo.vercel.app",
        githubURL: "https://github.com/nati/chat-app",
        category: "Full Stack",
        featured: true
      },
      {
        title: "Movie Ticket Booking System",
        description: "Complete booking system with seat selection, payment integration, and admin dashboard. Features real-time seat availability and booking management.",
        technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
        imageURL: "/movie-ticket-booking-interface.jpg",
        liveURL: "https://movie-booking-demo.vercel.app",
        githubURL: "https://github.com/nati/movie-booking",
        category: "Full Stack",
        featured: true
      },
      {
        title: "Inventory Management Dashboard",
        description: "Comprehensive inventory tracking system with analytics, reporting, and multi-user support. Built for small to medium businesses.",
        technologies: ["React", "Express", "MySQL", "Chart.js", "Bootstrap"],
        imageURL: "/inventory-management-system.png",
        liveURL: "https://inventory-demo.netlify.app",
        githubURL: "https://github.com/nati/inventory-system",
        category: "Full Stack",
        featured: false
      },
      {
        title: "Student Management System",
        description: "Educational platform for managing student records, grades, and course enrollment. Includes role-based access control.",
        technologies: ["Vue.js", "Laravel", "MySQL", "Vuetify"],
        imageURL: "/student-management-dashboard.png",
        liveURL: "https://student-mgmt-demo.herokuapp.com",
        githubURL: "https://github.com/nati/student-management",
        category: "Full Stack",
        featured: false
      }
    ]

    // Insert sample data
    await Certificate.insertMany(certificates)
    console.log(`✅ Added ${certificates.length} sample certificates`)

    await Message.insertMany(messages)
    console.log(`✅ Added ${messages.length} sample messages`)

    await Project.insertMany(projects)
    console.log(`✅ Added ${projects.length} sample projects`)

    console.log("\n🎉 Sample data seeded successfully!")
    console.log("\nYou can now:")
    console.log("1. Visit http://localhost:3000/admin/dashboard/certificates to see certificates")
    console.log("2. Visit http://localhost:3000/admin/dashboard/messages to see messages")
    console.log("3. Visit http://localhost:3000/admin/dashboard/projects to see projects")
    console.log("4. Visit http://localhost:3000/admin/dashboard to see the overview")

  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

seedData()