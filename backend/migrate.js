const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Project = require('./models/Project');
const Certificate = require('./models/Certificate');
const Message = require('./models/Message');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resume-nati";
const dbPath = path.join(__dirname, 'data', 'db.json');

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    if (!fs.existsSync(dbPath)) {
      console.log('No db.json found. Skipping migration.');
      process.exit(0);
    }

    const raw = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(raw);

    // Migrate Projects
    if (db.projects && db.projects.length > 0) {
      console.log(`Migrating ${db.projects.length} projects...`);
      await Project.deleteMany({}); // Clear existing to avoid duplicates during dev
      for (const p of db.projects) {
        // Skip empty projects
        if (!p.title) continue;
        
        await Project.create({
          title: p.title,
          description: p.description,
          tech: p.tech,
          image: p.image,
          videoUrl: p.videoUrl,
          githubUrl: p.githubUrl,
          liveUrl: p.liveUrl || p.demo
        });
      }
    }

    // Migrate Certificates
    if (db.certificates && db.certificates.length > 0) {
      console.log(`Migrating ${db.certificates.length} certificates...`);
      await Certificate.deleteMany({});
      for (const c of db.certificates) {
        // Skip empty certificates
        if (!c.title) continue;

        await Certificate.create({
          title: c.title,
          organization: c.organization || c.issuer,
          category: c.category,
          issueDate: c.issueDate || c.date,
          description: c.description,
          certificateURL: c.certificateURL || c.image || c.credentialUrl,
          verifyLink: c.verifyLink
        });
      }
    }

    // Migrate Messages
    if (db.messages && db.messages.length > 0) {
      console.log(`Migrating ${db.messages.length} messages...`);
      await Message.deleteMany({});
      for (const m of db.messages) {
        await Message.create({
          name: m.name,
          email: m.email,
          subject: m.subject,
          message: m.message,
          date: m.date,
          time: m.time,
          status: m.status
        });
      }
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
