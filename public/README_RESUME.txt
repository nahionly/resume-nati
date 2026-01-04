IMPORTANT: Add Your Resume PDF Here
=====================================

To enable the "Download Resume" button functionality:

1. Create or export your resume as a PDF file
2. Name it "resume.pdf" (or update the filename in hero-section.tsx)
3. Place it in this /public folder
4. The download button will automatically work

Current expected filename: resume.pdf
Location: /public/resume.pdf

If you want to use a different filename, update line 13 in:
components/sections/hero-section.tsx

Change:
  link.href = '/resume.pdf'
To:
  link.href = '/your-filename.pdf'
