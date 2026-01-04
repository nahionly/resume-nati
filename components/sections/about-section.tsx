import { GraduationCap, Briefcase } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-normal bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-in zoom-in duration-700">
                About Me
              </h2>
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-in slide-in-from-left duration-1000 delay-300" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed animate-in fade-in duration-700 delay-500">
              A dedicated computer scientist with dual bachelor's degrees and hands-on experience in full-stack
              development and business management.
            </p>
          </div>

          {/* Education Timeline */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Computer Science Degree */}
            <div className="glass rounded-2xl p-6 md:p-8 space-y-4 hover:border-yellow-500/50 transition-all duration-300 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 hover:scale-105 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <GraduationCap className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-normal text-yellow-500">Bachelor of Computer Science & Engineering</h3>
                  <p className="text-muted-foreground">Bule Hora University</p>
                  <p className="text-sm text-muted-foreground">
                    Specialized in software engineering, data structures, algorithms, and modern web technologies
                    including MERN stack development.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Management Degree */}
            <div className="glass rounded-2xl p-6 md:p-8 space-y-4 hover:border-yellow-500/50 transition-all duration-300 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 hover:scale-105 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Briefcase className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-normal text-yellow-500">Bachelor of Business Management</h3>
                  <p className="text-muted-foreground">Paradise College</p>
                  <p className="text-sm text-muted-foreground">
                    Gained expertise in human resource management, account management, and strategic business
                    operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="glass rounded-2xl p-6 md:p-8 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
            <h3 className="text-2xl font-normal mb-4 text-yellow-500">Professional Focus</h3>
            <p className="text-muted-foreground text-pretty leading-relaxed mb-6">
              As a full-stack developer, I combine technical expertise with business acumen to deliver comprehensive
              solutions. My experience spans across hardware maintenance, software development, system administration,
              and human resource management. I specialize in building scalable web applications using modern
              technologies like React, Node.js, Express, and MongoDB.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer hover:scale-110">
                Full-Stack Development
              </span>
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer hover:scale-110">
                MERN Stack
              </span>
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer hover:scale-110">
                System Administration
              </span>
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer hover:scale-110">
                Business Management
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
