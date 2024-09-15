import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "https://faq-backend-production.up.railway.app:8080/api/faqs";

export default function FAQComponent() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs`);
      if (!response.ok) throw new Error("Failed to fetch FAQs");
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch FAQs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      if (!response.ok) throw new Error("Failed to create FAQ");
      const newFaq = await response.json();
      setFaqs([...faqs, newFaq]);
      setIsDialogOpen(false);
      setNewQuestion("");
      setNewAnswer("");
      toast({
        title: "Success",
        description: "FAQ created successfully.",
      });
    } catch (error) {
      console.error("Error creating FAQ:", error);
      toast({
        title: "Error",
        description: "Failed to create FAQ. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs/${selectedFaq.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      if (!response.ok) throw new Error("Failed to update FAQ");
      const updatedFaq = await response.json();
      setFaqs(faqs.map((faq) => (faq.id === updatedFaq.id ? updatedFaq : faq)));
      setIsDialogOpen(false);
      setSelectedFaq(null);
      setNewQuestion("");
      setNewAnswer("");
      toast({
        title: "Success",
        description: "FAQ updated successfully.",
      });
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast({
        title: "Error",
        description: "Failed to update FAQ. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete FAQ");
      setFaqs(faqs.filter((faq) => faq.id !== id));
      toast({
        title: "Success",
        description: "FAQ deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast({
        title: "Error",
        description: "Failed to delete FAQ. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      
      <Button onClick={() => {
        setSelectedFaq(null);
        setNewQuestion("");
        setNewAnswer("");
        setIsDialogOpen(true);
      }}>
        Add New FAQ
      </Button>

      {isLoading ? (
        <div>Loading FAQs...</div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
                <div className="mt-2 space-x-2">
                  <Button variant="outline" onClick={() => {
                    setSelectedFaq(faq);
                    setNewQuestion(faq.question);
                    setNewAnswer(faq.answer);
                    setIsDialogOpen(true);
                  }}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(faq.id)}>
                    Delete
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedFaq ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
            <DialogDescription>
              {selectedFaq ? "Update the question and answer below." : "Enter the new question and answer below."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={selectedFaq ? handleUpdate : handleCreate}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">
                {selectedFaq ? "Update FAQ" : "Add FAQ"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
