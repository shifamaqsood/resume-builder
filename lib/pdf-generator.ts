import jsPDF from "jspdf"
import type { PersonalInfo, Experience, Education, Skill, Achievement, ResumeSection } from "@/app/page"

interface ResumeData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  achievements: Achievement[]
  sections: ResumeSection[]
}

export const generatePDF = async (data: ResumeData) => {
  const pdf = new jsPDF()
  let yPosition = 20

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth = 180, fontSize = 10) => {
    pdf.setFontSize(fontSize)
    const lines = pdf.splitTextToSize(text, maxWidth)
    pdf.text(lines, x, y)
    return y + lines.length * (fontSize * 0.4)
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  // Header
  if (data.personalInfo.fullName) {
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text(data.personalInfo.fullName, 20, yPosition)
    yPosition += 10
  }

  // Contact info
  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  const contactInfo = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location]
    .filter(Boolean)
    .join(" | ")

  if (contactInfo) {
    yPosition = addText(contactInfo, 20, yPosition)
    yPosition += 5
  }

  // Summary
  if (data.personalInfo.summary) {
    yPosition = addText(data.personalInfo.summary, 20, yPosition, 170)
    yPosition += 10
  }

  // Process sections in order
  data.sections.forEach((section) => {
    if (yPosition > 250) {
      pdf.addPage()
      yPosition = 20
    }

    switch (section.type) {
      case "experience":
        if (data.experiences.length > 0) {
          pdf.setFontSize(14)
          pdf.setFont("helvetica", "bold")
          pdf.text("WORK EXPERIENCE", 20, yPosition)
          yPosition += 8

          data.experiences.forEach((exp) => {
            if (yPosition > 240) {
              pdf.addPage()
              yPosition = 20
            }

            pdf.setFontSize(12)
            pdf.setFont("helvetica", "bold")
            pdf.text(exp.position || "Position", 20, yPosition)

            pdf.setFont("helvetica", "normal")
            const dateRange = `${formatDate(exp.startDate)} - ${exp.current ? "Present" : formatDate(exp.endDate)}`
            pdf.text(dateRange, 150, yPosition)
            yPosition += 6

            pdf.setFontSize(10)
            pdf.setFont("helvetica", "italic")
            pdf.text(exp.company || "Company", 20, yPosition)
            yPosition += 6

            if (exp.description) {
              pdf.setFont("helvetica", "normal")
              yPosition = addText(exp.description, 20, yPosition, 170, 9)
            }
            yPosition += 5
          })
        }
        break

      case "education":
        if (data.education.length > 0) {
          if (yPosition > 240) {
            pdf.addPage()
            yPosition = 20
          }

          pdf.setFontSize(14)
          pdf.setFont("helvetica", "bold")
          pdf.text("EDUCATION", 20, yPosition)
          yPosition += 8

          data.education.forEach((edu) => {
            if (yPosition > 250) {
              pdf.addPage()
              yPosition = 20
            }

            pdf.setFontSize(12)
            pdf.setFont("helvetica", "bold")
            const degreeText = `${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}`
            pdf.text(degreeText, 20, yPosition)

            pdf.setFont("helvetica", "normal")
            const dateRange = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`
            pdf.text(dateRange, 150, yPosition)
            yPosition += 6

            pdf.setFontSize(10)
            pdf.setFont("helvetica", "italic")
            pdf.text(edu.institution || "Institution", 20, yPosition)
            yPosition += 4

            if (edu.gpa) {
              pdf.setFont("helvetica", "normal")
              pdf.text(`GPA: ${edu.gpa}`, 20, yPosition)
              yPosition += 4
            }
            yPosition += 3
          })
        }
        break

      case "skills":
        if (data.skills.length > 0) {
          if (yPosition > 240) {
            pdf.addPage()
            yPosition = 20
          }

          pdf.setFontSize(14)
          pdf.setFont("helvetica", "bold")
          pdf.text("SKILLS", 20, yPosition)
          yPosition += 8

          pdf.setFontSize(10)
          pdf.setFont("helvetica", "normal")
          const skillsText = data.skills.map((skill) => `${skill.name} (${skill.level})`).join(", ")
          yPosition = addText(skillsText, 20, yPosition, 170)
          yPosition += 5
        }
        break

      case "achievements":
        if (data.achievements.length > 0) {
          if (yPosition > 240) {
            pdf.addPage()
            yPosition = 20
          }

          pdf.setFontSize(14)
          pdf.setFont("helvetica", "bold")
          pdf.text("ACHIEVEMENTS", 20, yPosition)
          yPosition += 8

          data.achievements.forEach((achievement) => {
            if (yPosition > 240) {
              pdf.addPage()
              yPosition = 20
            }

            pdf.setFontSize(12)
            pdf.setFont("helvetica", "bold")
            pdf.text(achievement.title || "Achievement", 20, yPosition)

            if (achievement.date) {
              pdf.setFont("helvetica", "normal")
              pdf.text(formatDate(achievement.date), 150, yPosition)
            }
            yPosition += 6

            if (achievement.organization) {
              pdf.setFontSize(10)
              pdf.setFont("helvetica", "italic")
              pdf.text(achievement.organization, 20, yPosition)
              yPosition += 4
            }

            if (achievement.description) {
              pdf.setFont("helvetica", "normal")
              yPosition = addText(achievement.description, 20, yPosition, 170, 9)
            }
            yPosition += 5
          })
        }
        break
    }
  })

  // Save the PDF
  pdf.save(`${data.personalInfo.fullName || "Resume"}.pdf`)
}
