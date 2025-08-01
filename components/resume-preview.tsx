import { Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Zap, Trophy, Award } from "lucide-react"
import type { PersonalInfo, Experience, Education, Skill, Achievement, ResumeSection } from "@/app/page"

interface ResumePreviewProps {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  achievements: Achievement[]
  sections: ResumeSection[]
}

export default function ResumePreview({
  personalInfo,
  experiences,
  education,
  skills,
  achievements,
  sections,
}: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-red-200 text-red-800"
      case "Intermediate":
        return "bg-yellow-200 text-yellow-800"
      case "Advanced":
        return "bg-blue-200 text-blue-800"
      case "Expert":
        return "bg-green-200 text-green-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const renderSection = (section: ResumeSection) => {
    switch (section.type) {
      case "personal":
        return (
          <div key={section.id} className="mb-8 animate-in fade-in-50 duration-700">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{personalInfo.fullName || "Your Name"}</h1>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 mb-4">
                {personalInfo.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {personalInfo.email}
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {personalInfo.location}
                  </div>
                )}
              </div>
              {personalInfo.summary && (
                <p className="text-slate-700 leading-relaxed max-w-2xl mx-auto">{personalInfo.summary}</p>
              )}
            </div>
          </div>
        )

      case "experience":
        return (
          experiences.length > 0 && (
            <div key={section.id} className="mb-8 animate-in slide-in-from-left-4 duration-700">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Work Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-l-2 border-blue-200 pl-4 hover:border-blue-400 transition-colors duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-slate-800">{exp.position || "Position"}</h3>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <p className="font-medium text-blue-600 mb-2">{exp.company || "Company"}</p>
                    {exp.description && <p className="text-slate-700 text-sm leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )
        )

      case "education":
        return (
          education.length > 0 && (
            <div key={section.id} className="mb-8 animate-in slide-in-from-right-4 duration-700">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-l-2 border-green-200 pl-4 hover:border-green-400 transition-colors duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                      <h3 className="font-semibold text-slate-800">
                        {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                    <p className="font-medium text-green-600 mb-1">{edu.institution || "Institution"}</p>
                    {edu.gpa && <p className="text-sm text-slate-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )
        )

      case "skills":
        return (
          skills.length > 0 && (
            <div key={section.id} className="mb-8 animate-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${getSkillColor(skill.level)}`}
                  >
                    {skill.name || "Skill"} • {skill.level}
                  </span>
                ))}
              </div>
            </div>
          )
        )

      case "achievements":
        return (
          achievements.length > 0 && (
            <div key={section.id} className="mb-8 animate-in slide-in-from-top-4 duration-700">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="border-l-2 border-yellow-200 pl-4 hover:border-yellow-400 transition-colors duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-600" />
                        {achievement.title || "Achievement Title"}
                      </h3>
                      {achievement.date && (
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(achievement.date)}
                        </div>
                      )}
                    </div>
                    {achievement.organization && (
                      <p className="font-medium text-yellow-600 mb-2">{achievement.organization}</p>
                    )}
                    {achievement.description && (
                      <p className="text-slate-700 text-sm leading-relaxed">{achievement.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-slate-900 transition-all duration-500">
      {sections.map(renderSection)}

      {sections.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="text-lg mb-2">Your resume preview will appear here</p>
          <p className="text-sm">Enable sections and fill in your information to see the preview</p>
        </div>
      )}
    </div>
  )
}
