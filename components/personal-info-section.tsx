"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PersonalInfo } from "@/app/page"

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo
  setPersonalInfo: (info: PersonalInfo) => void
}

export default function PersonalInfoSection({ personalInfo, setPersonalInfo }: PersonalInfoSectionProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value })
  }

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
            Phone
          </Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-slate-700">
            Location
          </Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="New York, NY"
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm font-medium text-slate-700">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Brief professional summary highlighting your key skills and experience..."
          rows={4}
          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  )
}
