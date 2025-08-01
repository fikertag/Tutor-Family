"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How do I book a tutor?",
    answer:
      "Browse tutors, view their profiles, and click 'Book Session' to request a lesson.",
  },
  {
    question: "How do I post a tutoring ad?",
    answer:
      "Go to the 'Post Ad' page, fill out the form, and submit your request.",
  },
  {
    question: "How do I contact support?",
    answer: "Use the form below or email support@tutorfamily.com.",
  },
];

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">Support & Help</h1>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-muted rounded-lg p-4">
              <div className="font-semibold mb-1">{faq.question}</div>
              <div className="text-muted-foreground text-sm">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <form className="space-y-4">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <Textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            rows={4}
            required
          />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Other Ways to Reach Us</h2>
        <div className="text-muted-foreground text-sm mb-1">
          Email:{" "}
          <a href="mailto:support@tutorfamily.com" className="underline">
            support@tutorfamily.com
          </a>
        </div>
        <div className="text-muted-foreground text-sm">
          Phone:{" "}
          <a href="tel:+251123456789" className="underline">
            +251 123 456 789
          </a>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/faq" className="bg-muted px-4 py-2 rounded text-sm">
            FAQ
          </a>
          <a href="/post-ad" className="bg-muted px-4 py-2 rounded text-sm">
            Post an Ad
          </a>
          <a href="/findtutors" className="bg-muted px-4 py-2 rounded text-sm">
            Find Tutors
          </a>
        </div>
      </div>
    </div>
  );
}
