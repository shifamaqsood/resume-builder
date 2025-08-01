"use client"

import PersonalInfoSection from "@/components/personal-info-section"
import ExperienceSection from "@/components/experience-section"
import EducationSection from "@/components/education-section"
import SkillsSection from "@/components/skills-section"
import AchievementsSection from "@/components/achievements-section"
import ResumePreview from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { generatePDF } from "@/lib/pdf-generator"

export type PersonalInfo = {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
}

export type Experience = {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export type Education = {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
}

export type Skill = {
  id: string
  name: string
  level: string
}

export type Achievement = {
  id: string
  title: string
  description: string
  date: string
  organization: string
}

export type ResumeSection = {
  id: string
  type: "personal" | "experience" | "education" | "skills" | "achievements"
}

export default function Page() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  })

  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])

  const [sections, setSections] = useState<ResumeSection[]>([
    { id: "personal", type: "personal" },
    { id: "experience", type: "experience" },
    { id: "education", type: "education" },
    { id: "skills", type: "skills" },
    { id: "achievements", type: "achievements" },
  ])

  const handleDownloadPdf = () => {
    generatePDF({ personalInfo, experiences, education, skills, achievements, sections })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <PersonalInfoSection personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
          <ExperienceSection experiences={experiences} setExperiences={setExperiences} />
          <EducationSection education={education} setEducation={setEducation} />
          <SkillsSection skills={skills} setSkills={setSkills} />
          <AchievementsSection achievements={achievements} setAchievements={setAchievements} />
        </div>

        <div>
          <ResumePreview
            personalInfo={personalInfo}
            experiences={experiences}
            education={education}
            skills={skills}
            achievements={achievements}
            sections={sections}
          />
        </div>
      </div>
      <Button onClick={handleDownloadPdf}>Download PDF</Button>
    </div>
  )
}
