import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marta Alem",
    avatar: "/model1.webp",
    rating: 5,
    comment:
      " easy to find qualified tutors. My daughter improved her grades within weeks.",
  },
  {
    id: 2,
    name: "አስፋው ደሴት",
    avatar: "/model1.webp",
    rating: 4.5,
    comment: "አስደናቂ ነው ግንባር ግልጽ እና ንቁ ነው። ልጄ ከዚህ ድህረ-ገጽ የትምህርት ጥቅም አገኘ።",
  },
  {
    id: 3,
    name: "Lily Haile",
    avatar: "/model1.webp",
    rating: 5,
    comment:
      "clear navigation, and flexible scheduling that made booking sessions simple.",
  },
];

export default function Testimony() {
  return (
    <section className="bg-zinc-50 pb-16 md:pb-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            What our users say
          </h2>
          <p className="mt-4">Real feedback from students and parents.</p>
        </div>

        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          {testimonials.map((t) => (
            <Card key={t.id} className="group shadow-zinc-950/5">
              <CardHeader className="flex items-center gap-4 pb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center ">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const idx = i + 1;
                      // full star
                      if (t.rating >= idx) {
                        return (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                          />
                        );
                      }
                      // half star support (e.g. 4.5)
                      if (t.rating + 0.5 >= idx) {
                        return (
                          <StarHalf
                            key={i}
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                          />
                        );
                      }
                      // empty star
                      return (
                        <Star
                          key={i}
                          className="w-4 h-4 text-muted-foreground"
                        />
                      );
                    })}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm">{t.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
