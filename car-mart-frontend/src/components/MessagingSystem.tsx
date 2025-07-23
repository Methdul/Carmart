import { useState } from "react";
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Clock,
  Check,
  CheckCheck,
  Image,
  Paperclip,
  Smile
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "file";
  attachment?: string;
}

interface Conversation {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  avatar: string;
  rating?: number;
  vehicleTitle?: string;
  vehiclePrice?: number;
  vehicleImage?: string;
  messages: Message[];
}

interface MessagingSystemProps {
  conversations: Conversation[];
  onBack: () => void;
}

const MessagingSystem = ({ conversations, onBack }: MessagingSystemProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Mock conversation data with full chat history
  const mockConversations: Conversation[] = [
    {
      id: "1",
      from: "Sarah Fernando",
      subject: "Inquiry about BMW 3 Series",
      preview: "Hi, I'm interested in your BMW. Is it still available?",
      time: "2 hours ago",
      unread: true,
      avatar: "",
      rating: 4.8,
      vehicleTitle: "BMW 3 Series 320i Sport Line",
      vehiclePrice: 12500000,
      vehicleImage: "/placeholder.svg",
      messages: [
        {
          id: "1",
          text: "Hi! I'm very interested in your BMW 3 Series. Is it still available?",
          sender: "other",
          timestamp: "2 hours ago",
          status: "read",
          type: "text"
        },
        {
          id: "2", 
          text: "Yes, it's still available! Thanks for your interest. Would you like to know more details?",
          sender: "me",
          timestamp: "1 hour ago",
          status: "read",
          type: "text"
        },
        {
          id: "3",
          text: "Great! Can you tell me about the service history? Also, would it be possible to arrange a test drive?",
          sender: "other",
          timestamp: "45 minutes ago",
          status: "read",
          type: "text"
        },
        {
          id: "4",
          text: "Absolutely! The car has full BMW service history. All services done at authorized centers. I can arrange a test drive this weekend. What time works for you?",
          sender: "me",
          timestamp: "30 minutes ago",
          status: "delivered",
          type: "text"
        }
      ]
    },
    {
      id: "2",
      from: "Kamal Silva",
      subject: "RAV4 Test Drive",
      preview: "Can we arrange a test drive for this weekend?",
      time: "1 day ago",
      unread: false,
      avatar: "",
      rating: 4.5,
      vehicleTitle: "Toyota RAV4 Hybrid AWD",
      vehiclePrice: 15800000,
      vehicleImage: "/placeholder.svg",
      messages: [
        {
          id: "1",
          text: "Hello! I saw your RAV4 listing. Can we arrange a test drive for this weekend?",
          sender: "other",
          timestamp: "1 day ago",
          status: "read",
          type: "text"
        },
        {
          id: "2",
          text: "Hi! Sure, I'm available on Saturday or Sunday. What time works best for you?",
          sender: "me",
          timestamp: "1 day ago",
          status: "read",
          type: "text"
        },
        {
          id: "3",
          text: "Saturday around 2 PM would be perfect. Should I come to your location?",
          sender: "other",
          timestamp: "1 day ago",
          status: "read",
          type: "text"
        }
      ]
    },
    {
      id: "3",
      from: "Priya Jayawardene",
      subject: "Price Negotiation",
      preview: "Is there any room for price negotiation on the RAV4?",
      time: "2 days ago",
      unread: false,
      avatar: "",
      rating: 4.2,
      vehicleTitle: "Toyota RAV4 Hybrid AWD",
      vehiclePrice: 15800000,
      vehicleImage: "/placeholder.svg",
      messages: [
        {
          id: "1",
          text: "Hi! I'm interested in your RAV4. Is there any room for price negotiation?",
          sender: "other",
          timestamp: "2 days ago",
          status: "read",
          type: "text"
        },
        {
          id: "2",
          text: "Hello! The price is quite competitive for the market, but I'm open to reasonable offers. What did you have in mind?",
          sender: "me",
          timestamp: "2 days ago",
          status: "read",
          type: "text"
        }
      ]
    }
  ];

  const currentConversation = mockConversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentConversation) return;

    // In a real app, this would send to backend
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      timestamp: "Just now",
      status: "sent",
      type: "text"
    };

    // Add message to conversation (in real app, update backend)
    currentConversation.messages.push(message);
    setNewMessage("");
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0) return;
    
    // In real app, submit review to backend
    console.log("Review submitted:", {
      conversationId: selectedConversation,
      rating: reviewRating,
      text: reviewText
    });
    
    setShowReviewDialog(false);
    setReviewRating(0);
    setReviewText("");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', 'Rs.');
  };

  // Message List View
  if (!selectedConversation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="mr-3 sm:mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">Messages</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Communicate with buyers and sellers</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="space-y-1">
              {mockConversations.map((conversation) => (
                <div 
                  key={conversation.id} 
                  className="flex items-start space-x-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50 last:border-0"
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback className="bg-primary/10">
                        {conversation.from.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm sm:text-base truncate">{conversation.from}</span>
                        {conversation.rating && (
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground ml-1">{conversation.rating}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    
                    <div className="font-medium text-sm mb-1 truncate">{conversation.subject}</div>
                    <div className="text-sm text-muted-foreground truncate">{conversation.preview}</div>
                    
                    {conversation.vehicleTitle && (
                      <div className="mt-2 p-2 bg-muted/30 rounded-lg">
                        <div className="text-xs font-medium text-primary truncate">{conversation.vehicleTitle}</div>
                        <div className="text-xs text-highlight font-medium">{formatPrice(conversation.vehiclePrice || 0)}</div>
                      </div>
                    )}
                    
                    {conversation.unread && (
                      <Badge className="bg-highlight text-highlight-foreground mt-2 text-xs">New</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Individual Chat View
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSelectedConversation(null)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentConversation?.avatar} />
            <AvatarFallback className="bg-primary/10">
              {currentConversation?.from.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm sm:text-base truncate">{currentConversation?.from}</div>
            <div className="text-xs text-muted-foreground">Online 2 hours ago</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Video className="h-4 w-4" />
          </Button>
          
          <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Star className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Rate & Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Rating</Label>
                  <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1"
                      >
                        <Star 
                          className={`h-6 w-6 ${
                            star <= reviewRating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="review" className="text-sm font-medium">Review (Optional)</Label>
                  <Textarea
                    id="review"
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={3}
                    className="mt-2"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowReviewDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-highlight hover:bg-highlight/90"
                    onClick={handleSubmitReview}
                    disabled={reviewRating === 0}
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Vehicle Info Card */}
      {currentConversation?.vehicleTitle && (
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-12 bg-muted rounded-lg overflow-hidden">
              <img 
                src={currentConversation.vehicleImage} 
                alt={currentConversation.vehicleTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{currentConversation.vehicleTitle}</div>
              <div className="text-highlight font-medium text-sm">{formatPrice(currentConversation.vehiclePrice || 0)}</div>
            </div>
            <Button variant="outline" size="sm">
              View Listing
            </Button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentConversation?.messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] sm:max-w-[60%] ${
              message.sender === 'me' 
                ? 'bg-highlight text-highlight-foreground' 
                : 'bg-muted'
            } rounded-lg p-3`}>
              <div className="text-sm">{message.text}</div>
              <div className={`flex items-center justify-end space-x-1 mt-1 ${
                message.sender === 'me' ? 'text-highlight-foreground/70' : 'text-muted-foreground'
              }`}>
                <span className="text-xs">{message.timestamp}</span>
                {message.sender === 'me' && (
                  <div className="ml-1">
                    {message.status === 'sent' && <Check className="h-3 w-3" />}
                    {message.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                    {message.status === 'read' && <CheckCheck className="h-3 w-3 text-blue-400" />}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0">
            <Image className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-12"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="h-10 w-10 flex-shrink-0 bg-highlight hover:bg-highlight/90"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;