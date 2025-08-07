import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => (
  <section id="FAQ" className=" bg-background">
    <div className="container mx-auto px-4 max-w-2xl">
      <h2 className="md:text-4xl text-3xl font-bold mb-8 text-center ">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How does Tutor Bridge connect families and tutors?
          </AccordionTrigger>
          <AccordionContent>
            Tutor Bridge matches families with qualified tutors based on
            subject, availability, and learning preferences. Our platform makes
            it easy to browse, connect, and schedule sessions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Can I become a tutor on Tutor Bridge?
          </AccordionTrigger>
          <AccordionContent>
            Yes! If you are a qualified educator or subject expert, you can
            apply to become a tutor. Simply click &quot;Become a Tutor&quot; and
            complete your profile to get started.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Is Tutor Bridge safe for families and children?
          </AccordionTrigger>
          <AccordionContent>
            Safety is our top priority. All tutors are vetted and
            background-checked. Communication and scheduling are managed
            securely through our platform.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>What subjects are available?</AccordionTrigger>
          <AccordionContent>
            We offer tutoring in a wide range of subjects, including math,
            science, languages, test prep, and more. You can filter tutors by
            subject to find the perfect match.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
);

export default FAQ;
