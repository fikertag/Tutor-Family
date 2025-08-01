import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimony() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Families Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 rounded-lg bg-card text-card-foreground">
            <div className="flex items-center mb-4">
              <Avatar className="mr-4 w-12 h-12">
                <AvatarImage src="/parent1.jpg" alt="Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-muted-foreground">Parent of 8th grader</p>
              </div>
            </div>
            <p className="text-foreground">
              &quot;We found the perfect math tutor for our daughter through
              TutorBridge. Her grades improved dramatically in just two
              months!&quot;
            </p>
          </Card>
          <Card className="p-8 rounded-lg bg-card text-card-foreground">
            <div className="flex items-center mb-4">
              <Avatar className="mr-4 w-12 h-12">
                <AvatarImage src="/parent2.jpg" alt="Michael Chen" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Michael Chen</h4>
                <p className="text-muted-foreground">Parent of 10th grader</p>
              </div>
            </div>
            <p className="text-foreground">
              &quot;The Spanish tutor we connected with has been amazing.
              Flexible scheduling and personalized lessons have made all the
              difference.&quot;
            </p>
          </Card>
          <Card className="p-8 rounded-lg bg-card text-card-foreground">
            <div className="flex items-center mb-4">
              <Avatar className="mr-4 w-12 h-12">
                <AvatarImage src="/parent3.jpg" alt="Amina Yusuf" />
                <AvatarFallback>AY</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Amina Yusuf</h4>
                <p className="text-muted-foreground">Parent of 6th grader</p>
              </div>
            </div>
            <p className="text-foreground">
              &quot;TutorBridge made it easy to find a science tutor who really
              connects with my son. He looks forward to every session!&quot;
            </p>
          </Card>
          <Card className="p-8 rounded-lg bg-card text-card-foreground">
            <div className="flex items-center mb-4">
              <Avatar className="mr-4 w-12 h-12">
                <AvatarImage src="/parent3.jpg" alt="Amina Yusuf" />
                <AvatarFallback>AY</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Amina Yusuf</h4>
                <p className="text-muted-foreground">Parent of 6th grader</p>
              </div>
            </div>
            <p className="text-foreground">
              &quot;TutorBridge made it easy to find a science tutor who really
              connects with my son. He looks forward to every session!&quot;
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
