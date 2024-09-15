// section-links.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Languages, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function SectionLinks() {
  const sections = [
    { title: "Chat", icon: MessageSquare, href: "/chat", description: "Start a conversation" },
    { title: "Translate", icon: Languages, href: "/translate", description: "Convert between languages" },
    { title: "FAQs", icon: HelpCircle, href: "/faqs", description: "Find answers to common questions" },
    { title: "About", icon: Info, href: "/about", description: "Learn more about us" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-4xl bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Choose a section to explore our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <Link
                key={section.title}
                to={section.href}
                className="no-underline"
              >
                <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <CardContent className="flex items-center p-6">
                    <section.icon className="h-8 w-8 text-blue-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <p className="text-sm text-gray-500">{section.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
