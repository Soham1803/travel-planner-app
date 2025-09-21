"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from "lucide-react"
import TravelOutputPanel from "@/components/travel-output-panel"

interface AudioMessage {
  id: string
  role: "user" | "assistant"
  content: string
  audioUrl?: string
  timestamp: Date
  isPlaying?: boolean
}

export default function AudioChatInterface() {
  const [messages, setMessages] = useState<AudioMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI travel planner. I can help you create amazing itineraries, find accommodations, suggest restaurants, and plan your perfect trip. Where would you like to go?",
      timestamp: new Date(),
    },
  ])
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio context for better browser support
    if (typeof window !== "undefined") {
      audioRef.current = new Audio()
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        await processAudioMessage(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check your permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsProcessing(true)
    }
  }

  const processAudioMessage = async (audioBlob: Blob) => {
    // Simulate transcription and AI response
    const transcribedText = "I'd like to plan a 3-day trip to Tokyo with a medium budget."

    const userMessage: AudioMessage = {
      id: Date.now().toString(),
      role: "user",
      content: transcribedText,
      audioUrl: URL.createObjectURL(audioBlob),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: AudioMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Great choice! Tokyo is an amazing destination. I'll help you create a perfect 3-day itinerary with a medium budget. Let me suggest some must-visit places, accommodations, and local dining experiences that will make your trip unforgettable.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)

      // Auto-play AI response if not muted
      if (!isMuted) {
        playAIResponse(aiResponse.content)
      }
    }, 2000)
  }

  const playAIResponse = async (text: string) => {
    // Simulate text-to-speech
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onstart = () => setCurrentlyPlaying("ai-response")
      utterance.onend = () => setCurrentlyPlaying(null)

      speechSynthesis.speak(utterance)
    }
  }

  const togglePlayback = (messageId: string, audioUrl?: string, text?: string) => {
    if (currentlyPlaying === messageId) {
      // Stop current playback
      if (audioUrl && audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      } else {
        speechSynthesis.cancel()
      }
      setCurrentlyPlaying(null)
    } else {
      // Start playback
      if (audioUrl && audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
        audioRef.current.onended = () => setCurrentlyPlaying(null)
        setCurrentlyPlaying(messageId)
      } else if (text) {
        playAIResponse(text)
        setCurrentlyPlaying(messageId)
      }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Audio Chat Panel */}
      <Card className="flex flex-col gradient-card border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Mic className="w-5 h-5 text-primary" />
              Voice Chat with AI
            </h2>
            <Button variant="outline" size="sm" onClick={() => setIsMuted(!isMuted)} className="gap-2">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString()}</span>
                  </div>

                  {/* Audio playback controls */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      togglePlayback(
                        message.id,
                        message.audioUrl,
                        message.role === "assistant" ? message.content : undefined,
                      )
                    }
                    className="p-1 h-auto"
                  >
                    {currentlyPlaying === message.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary audio-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">Processing your request...</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recording Controls */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <Button
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`w-16 h-16 rounded-full ${
                  isRecording
                    ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                {isRecording ? "Recording... Tap to stop" : isProcessing ? "Processing..." : "Tap to speak"}
              </p>
            </div>
          </div>

          {/* Audio Visualization */}
          {isRecording && (
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                  }}
                ></div>
              ))}
            </div>
          )}

          {/* AI Response Animation */}
          {currentlyPlaying === "ai-response" && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="text-primary">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">AI is speaking...</span>
            </div>
          )}
        </div>
      </Card>

      {/* Travel Output Panel */}
      <TravelOutputPanel />
    </div>
  )
}
