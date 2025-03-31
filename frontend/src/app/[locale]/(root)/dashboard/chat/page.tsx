"use client";

import {
  AlertTriangle,
  Bot,
  MapPin,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatService } from "@/services/Chatservice";

interface ChatHistory {
  chatId: string;
  starting: boolean;
}

export default function ChatPage() {
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDisclaimerDialog, setShowDisclaimerDialog] = useState(false);
  const [showFindDoctorDialog, setShowFindDoctorDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    setIsLoading(true);
    const result = await ChatService.getChatIds();
    
    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
      return;
    }

    setChatHistory(result.data!);
    setIsLoading(false);
  };

  const handleCreateChat = async () => {
    setShowDisclaimerDialog(false);
    const loadingToast = toast.loading("Creating new chat...");
    
    const result = await ChatService.createChat();
    
    toast.dismiss(loadingToast);
    
    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Chat created successfully");
    router.push(`/dashboard/chat/${result.data}`);
  };

  const handleDeleteChat = async (chatId: string) => {
    const loadingToast = toast.loading("Deleting chat...");
    
    const result = await ChatService.delteChat(chatId);
    
    toast.dismiss(loadingToast);
    
    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Chat deleted successfully");
    loadChatHistory();
  };

  const handleFindDoctor = () => {
    setShowFindDoctorDialog(false);
    router.push("/geo-assistance");
  };

  const filteredChats = chatHistory.filter(chat => 
    chat.chatId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Sidebar */}
            <Card className="lg:col-span-1 h-[calc(100vh-8rem)]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowDisclaimerDialog(true)}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search conversations..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <CardContent className="space-y-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  ) : filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                      <div
                        key={chat.chatId}
                        className="p-3 rounded-md cursor-pointer hover:bg-muted"
                        onClick={() => router.push(`/dashboard/chat/${chat.chatId}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{
                            "Untitled"}</h4>
                            <p className="text-xs text-muted-foreground">
                              {chat.starting ? "Starting..." : "Active"}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.chatId);
                            }}
                          >
                            <Trash className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No conversations found
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
            </Card>

            {/* Welcome Screen */}
            <Card className="lg:col-span-3 h-[calc(100vh-8rem)] flex items-center justify-center">
              <div className="text-center p-6">
                <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Welcome to AI Chat</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start a new conversation or select an existing chat to begin.
                </p>
                <Button 
                  size="lg" 
                  onClick={() => setShowDisclaimerDialog(true)}
                >
                  Start New Conversation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer Dialog */}
      <AlertDialog open={showDisclaimerDialog} onOpenChange={setShowDisclaimerDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Medical Disclaimer</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    The AI Assistant provides general information and is not a substitute for
                    professional medical advice, diagnosis, or treatment.
                  </p>
                </div>
                <p>
                  Always seek the advice of your physician or other qualified health provider
                  with any questions you may have regarding a medical condition.
                </p>
                <p>
                  Never disregard professional medical advice or delay in seeking it because
                  of something you have read or heard from our AI Assistant.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateChat}>
              I Understand
            </AlertDialogAction>
            <Button
              variant="outline"
              className="sm:ml-auto"
              onClick={() => {
                setShowDisclaimerDialog(false);
                setShowFindDoctorDialog(true);
              }}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Locate a Doctor Instead
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Find Doctor Dialog */}
      <AlertDialog open={showFindDoctorDialog} onOpenChange={setShowFindDoctorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Find a Healthcare Provider</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to locate a healthcare provider near you instead of using
              the AI assistant?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFindDoctor}>
              <MapPin className="mr-2 h-4 w-4" />
              Find Nearby Doctors
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}