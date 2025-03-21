"use client"

import { Mic, MicOff, X } from "lucide-react"
import Image from "next/image"
import { useEffect,useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface VoiceChatProps {
  onClose: () => void
  onMessage: (message: string) => void
}

export function VoiceChat({ onClose, onMessage }: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")

  useEffect(() => {
    let recognition: SpeechRecognition | null = null

    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      // @ts-ignore
      const SpeechRecognitionEvent = window.SpeechRecognitionEvent
      // @ts-ignore
      const SpeechRecognitionErrorEvent = window.SpeechRecognitionErrorEvent
      recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        toast.error("An error occurred while recognizing speech")
        setIsListening(false)
      }
    } else {
        toast.error("Speech recognition is not supported in this browser")
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [toast])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    setTranscript("")
    setIsListening(true)

    // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      setTranscript(finalTranscript || interimTranscript)
    }

    recognition.onend = () => {
      if (isListening) {
        recognition.start()
      }
    }

    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)

    // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.stop()

    if (transcript) {
      onMessage(transcript)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-32 h-32 mb-6">
            <div
              className={`absolute inset-0 rounded-full ${isListening ? "bg-primary/10 animate-pulse" : "bg-muted"}`}
            >
              <Image
                src="/images/voice-wave.png"
                alt="Voice wave"
                width={128}
                height={128}
                className={`rounded-full ${isListening ? "opacity-100" : "opacity-50"}`}
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">{isListening ? "Listening..." : "Press to speak"}</h3>

          {transcript && <p className="text-muted-foreground text-center mb-6 max-w-xs">"{transcript}"</p>}

          <div className="flex gap-4">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className="rounded-full h-16 w-16 flex items-center justify-center"
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

