"use client";

import {
  ArrowLeft,
  Bot,
//   Clock,
  Mic,
  MicOff,
  MoreVertical,
  Send,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatService } from "@/services/Chatservice";

interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.chatId as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatHistory();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    setIsLoading(true);
    const result = await ChatService.getChatHistory(chatId);
    
    if (result.error) {
      toast.error(result.error);
      router.push("/dashboard/chat");
      return;
    }

    if (!result.data) {
      toast.error("No chat history found");
      router.push("/dashboard/chat");
      return;
    }

    const formattedMessages = result.data.messages.map((message) => ({
      content: message.content,
      sender: message.role === "user" ? "user" : "ai",
      timestamp: (new Date(message.timestamp)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }));

    console.log("Formatted Messages:", formattedMessages);
    setMessages( formattedMessages);
    setIsLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      content: newMessage,
      sender: "user" as const,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    const result = await ChatService.sendMessage(newMessage, chatId);
    
    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
      return;
    }

    const aiMessage = {
      content: result.data!.messages,
      sender: "ai" as const,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast.info("Voice recording started");
    } else {
      toast.info("Voice recording stopped");
      setNewMessage("I've been having headaches and dizziness lately. Could this be related to my blood pressure?");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 hidden">
        <Link href="/dashboard/chat">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Chats
          </Button>
        </Link>
      </div>

      <Card className="h-[calc(100vh-8rem)]">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">AI Assistant</CardTitle>
                <CardDescription className="text-xs">
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                    Online
                  </span>
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 p-4 h-[calc(100vh-16rem)]">
          <CardContent className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.sender === "ai" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
                      <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      {/* <Clock className="h-3 w-3 mr-1" /> */}
                      {message.timestamp}
                    </div>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 ml-2 mt-1">
                      <AvatarImage src="/user-avatar.png" alt="User" />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
        </ScrollArea>

        <CardFooter className="border-t p-4">
          <div className="flex items-center w-full gap-2">
            <Button 
              variant={isRecording ? "destructive" : "outline"} 
              size="icon" 
                className="hidden"
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}