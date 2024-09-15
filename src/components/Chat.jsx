import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import cucumberImage from '../assets/cucumber.jpg';
import orangeImage from '../assets/orange.jpg';
import tangerineImage from '../assets/tangerine.jpg';
import bot from '../assets/bot.jpg';


const fruits = [
  { name: "Orange", price: 8.00, image: orangeImage, description: "Sweet and juicy citrus fruit" },
  { name: "Cucumber", price: 11.76, image: cucumberImage, description: "Cool and refreshing vegetable" },
  { name: "Tangerine", price: 6.40, image: tangerineImage, description: "Small and sweet citrus fruit" },
];

export default function FruitChatbot() {
  const [messages, setMessages] = useState([
    { text: "Welcome! Would you like to see our fruit selection?", sender: 'bot' }
  ]);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text, sender, fruits) => {
    setMessages(prev => [...prev, { text, sender, fruits }]);
  };

  const handleOption = (option) => {
    addMessage(option, 'user');
    switch (option) {
      case 'Show fruits':
        addMessage("Here's our selection of fruits:", 'bot', fruits);
        break;
      case 'Exit':
        addMessage("Thank you for using our service. Goodbye!", 'bot');
        break;
      default:
        if (option.startsWith('Details for')) {
          const fruitName = option.replace('Details for ', '');
          const fruit = fruits.find(f => f.name === fruitName);
          if (fruit) {
            setSelectedFruit(fruit);
            addMessage(`Here are the details for ${fruit.name}:`, 'bot');
          }
        } else {
          addMessage("I'm sorry, I didn't understand that. Can you try again?", 'bot');
        }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
        <div className="bg-gray-900 text-white p-4 flex items-center">
          <Button variant="ghost" className="mr-2 text-white ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Avatar className="h-9 w-9 ">
            <AvatarImage src={bot} alt="Bot" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <span className="ml-2 font-semibold">Fruit Bot</span>
        </div>
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
                {message.text}
              </div>
              {message.fruits && (
                <div className="mt-2 space-y-2">
                  {message.fruits.map((fruit) => (
                    <Card key={fruit.name} className="flex items-center p-2 bg-white border-gray-200">
                      <img src={fruit.image} alt={fruit.name} className="w-12 h-12 mr-2" />
                      <div className="flex-grow">
                        <div className="font-bold text-gray-900">{fruit.name}</div>
                        <div className="text-sm text-gray-600">${fruit.price.toFixed(2)}</div>
                      </div>
                      <div className="text-gray-500">1</div>
                    </Card>
                  ))}
                </div>
              )}
              {selectedFruit && message.text.includes(selectedFruit.name) && (
                <Card className="mt-2 p-4 bg-white border-gray-200">
                  <div className="flex items-center mb-2">
                    <img src={selectedFruit.image} alt={selectedFruit.name} className="w-16 h-16 mr-4" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{selectedFruit.name}</h3>
                      <p className="text-gray-600">${selectedFruit.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{selectedFruit.description}</p>
                </Card>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 bg-gray-100 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => handleOption('Show fruits')} variant="outline" className="text-gray-900 border-gray-300 hover:bg-gray-200">Show fruits</Button>
            {selectedFruit ? (
              <Button onClick={() => setSelectedFruit(null)} variant="outline" className="text-gray-900 border-gray-300 hover:bg-gray-200">Back to list</Button>
            ) : (
              fruits.map((fruit) => (
                <Button key={fruit.name} onClick={() => handleOption(`Details for ${fruit.name}`)} variant="outline" className="text-gray-900 border-gray-300 hover:bg-gray-200">
                  {fruit.name}
                </Button>
              ))
            )}
            <Button onClick={() => handleOption('Exit')} variant="outline" className="text-gray-900 border-gray-300 hover:bg-gray-200">Exit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
