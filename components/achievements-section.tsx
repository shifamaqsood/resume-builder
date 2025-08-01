"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Trophy } from "lucide-react"
import type { Achievement } from "@/app/page"

interface AchievementsSectionProps {
  achievements: Achievement[]
  setAchievements: (achievements: Achievement[]) => void
}

export default function AchievementsSection({ achievements, setAchievements }: AchievementsSectionProps) {
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: "",
      description: "",
      date: "",
      organization: "",
    }
    setAchievements([...achievements, newAchievement])
  }

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    setAchievements(
      achievements.map((achievement) => (achievement.id === id ? { ...achievement, [field]: value } : achievement)),
    )
  }

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter((achievement) => achievement.id !== id))
  }

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-500">
      {achievements.map((achievement, index) => (
        <Card
          key={achievement.id}
          className="border border-slate-200 hover:border-blue-300 transition-all duration-300 animate-in slide-in-from-left-2"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Achievement {index + 1}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeAchievement(achievement.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Achievement Title</Label>
              <Input
                value={achievement.title}
                onChange={(e) => updateAchievement(achievement.id, "title", e.target.value)}
                placeholder="e.g., Employee of the Year, Dean's List, Certification"
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Organization (Optional)</Label>
                <Input
                  value={achievement.organization || ""}
                  onChange={(e) => updateAchievement(achievement.id, "organization", e.target.value)}
                  placeholder="Company, University, Institution"
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Date</Label>
                <Input
                  type="month"
                  value={achievement.date}
                  onChange={(e) => updateAchievement(achievement.id, "date", e.target.value)}
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Description</Label>
              <Textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(achievement.id, "description", e.target.value)}
                placeholder="Describe the achievement, its significance, and any relevant details..."
                rows={3}
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={addAchievement}
        className="w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 text-white transition-all duration-300 hover:shadow-lg"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Achievement
      </Button>
    </div>
  )
}
