"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mic } from "lucide-react"
import TextChatInterface from "@/components/text-chat-interface"
import AudioChatInterface from "@/components/audio-chat-interface"

export default function TravelPlannerApp() {
  const [activeMode, setActiveMode] = useState<"text" | "audio">("text")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Travel Planner</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={activeMode === "text" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMode("text")}
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Text Chat
              </Button>
              <Button
                variant={activeMode === "audio" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMode("audio")}
                className="gap-2"
              >
                <Mic className="w-4 h-4" />
                Voice Chat
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
        {activeMode === "text" ? <TextChatInterface /> : <AudioChatInterface />}
      </main>
    </div>
  )
}
