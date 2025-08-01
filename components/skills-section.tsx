"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Zap } from "lucide-react"
import type { Skill } from "@/app/page"

interface SkillsSectionProps {
  skills: Skill[]
  setSkills: (skills: Skill[]) => void
}

export default function SkillsSection({ skills, setSkills }: SkillsSectionProps) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
    }
    setSkills([...skills, newSkill])
  }

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)))
  }

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-500">
      {skills.map((skill, index) => (
        <Card
          key={skill.id}
          className="border border-slate-200 hover:border-blue-300 transition-all duration-300 animate-in slide-in-from-bottom-2"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <Zap className="w-4 h-4 text-yellow-600" />
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                  placeholder="Skill name (e.g., JavaScript, Project Management)"
                  className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Select value={skill.level} onValueChange={(value) => updateSkill(skill.id, "level", value)}>
                <SelectTrigger className="w-32 transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeSkill(skill.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={addSkill}
        className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white transition-all duration-300 hover:shadow-lg"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Skill
      </Button>
    </div>
  )
}
