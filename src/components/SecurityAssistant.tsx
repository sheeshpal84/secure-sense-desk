import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const SecurityAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Sentinel, your AI security assistant. I'm here to help you stay secure online. Here are some things I can help you with:",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: Lock, text: "Check your password", action: "password" },
    { icon: AlertTriangle, text: "See latest breaches", action: "breaches" },
    { icon: Shield, text: "Security checklist", action: "checklist" },
    { icon: CheckCircle, text: "Email leak check", action: "email" },
  ];

  const faqs = {
    "password": "I recommend using strong, unique passwords for each account. You can check your password strength using our Password Checker tool. Would you like me to guide you there?",
    "breaches": "I can show you the latest data breaches on our Global Breach Map. It displays real-time security incidents worldwide. The map is available on your dashboard.",
    "checklist": "Our Security Checklist helps you maintain good cybersecurity hygiene. It includes essential steps like enabling 2FA, updating software, and more.",
    "email": "You can check if your email has been compromised in data breaches using our Email Leak Checker. It's always good to verify your accounts regularly.",
    "2fa": "Two-Factor Authentication (2FA) adds an extra layer of security to your accounts. Enable it wherever possible, especially for email, banking, and social media.",
    "phishing": "Phishing attacks try to steal your personal information through fake emails or websites. Always verify the sender and look for suspicious links or requests.",
    "vpn": "A VPN encrypts your internet connection and hides your IP address. It's especially useful on public Wi-Fi networks.",
    "default": "I can help you with password security, data breaches, security checklists, email leak checks, and general cybersecurity questions. What would you like to know?"
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuickAction = (action: string) => {
    const actionText = quickActions.find(qa => qa.action === action)?.text || action;
    addMessage(actionText, true);
    setTimeout(() => {
      const response = faqs[action as keyof typeof faqs] || faqs.default;
      addMessage(response, false);
    }, 500);
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, true);
    const userInput = inputValue.toLowerCase();
    setInputValue('');

    setTimeout(() => {
      let response = faqs.default;
      
      // Simple keyword matching for responses
      if (userInput.includes('password')) response = faqs.password;
      else if (userInput.includes('breach') || userInput.includes('hack')) response = faqs.breaches;
      else if (userInput.includes('checklist') || userInput.includes('security')) response = faqs.checklist;
      else if (userInput.includes('email') || userInput.includes('leak')) response = faqs.email;
      else if (userInput.includes('2fa') || userInput.includes('authentication')) response = faqs['2fa'];
      else if (userInput.includes('phishing') || userInput.includes('spam')) response = faqs.phishing;
      else if (userInput.includes('vpn')) response = faqs.vpn;

      addMessage(response, false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/20 z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md max-h-[600px] bg-gray-900/95 border border-red-500/20 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-5 w-5" />
            Sentinel AI Assistant
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-[450px]">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      message.isUser
                        ? 'bg-red-600 text-white ml-4'
                        : 'bg-gray-800 text-gray-200 mr-4 border border-gray-700'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {messages.length === 1 && (
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {quickActions.map((action) => (
                    <Button
                      key={action.action}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="justify-start border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
                    >
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about cybersecurity..."
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-red-500"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityAssistant;