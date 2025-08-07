// app/components/FaceSwapSteps.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, Share, ScanFace } from "lucide-react";
import { Sparkles } from "lucide-react";

const steps = [
  {
    title: "Create Your Profile",
    description:
      "Start by creating your profile and telling us about your child.",
    icon: <Upload className="w-15 h-15 text-primary" />,
    step: "Step 1",
  },
  {
    title: "Browse  Tutors",
    description: "Select a tutor by filtering subject, availability and more.",
    icon: <ScanFace className="w-15 h-15 text-primary" />,
    step: "Step 2",
  },
  {
    title: "Connect",
    description: "Connect, and find the best fit for your needs.",
    icon: <Sparkles className="w-15 h-15 text-primary" />,
    step: "Step 3",
  },
  {
    title: "Start Learning",
    description: "Schedule sessions and begin your learning journey.",
    icon: <Share className="w-15 h-15 text-primary" />,
    step: "Step 4",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-to"
      className="max-w-6xl mx-auto px-4 sm:py-10 text-center"
    >
      <Badge variant="outline" className="mb-2">
        How it works
      </Badge>
      <h2 className="md:text-4xl text-3xl  font-bold mb-4">
        How TutorBridge Works
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
        Our tutor matching process is simple, fast, and produces amazing results
        in just a few easy steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="p-4 flex flex-col items-start justify-between text-center h-70"
          >
            <div className="flex justify-center items-center w-full h-full relative">
              <span className="absolute inset-0 rounded-full bg-secondary opacity-30 blur-lg"></span>
              <span className="relative z-10">{step.icon}</span>
            </div>
            <div className="text-start">
              <h4 className="text-sm text-destructive">{step.step}</h4>
              <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground text-start">
                {step.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
