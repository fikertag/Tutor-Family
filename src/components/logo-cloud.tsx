import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import Image from "next/image";

export const LogoCloud = () => {
  return (
    <section className="bg-background pb-16 md:pb-32">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="inline md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">Trusted by the best teams</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              <div className="flex gap-2 items-center">
                <Image
                  className="mx-auto"
                  src="/adama.png"
                  alt="Adama Logo"
                  height={30}
                  width={30}
                />
                Adama University
              </div>

              <div className="flex gap-2 items-center">
                <Image
                  className="mx-auto  "
                  src="/bakos.png"
                  alt="Bakos Logo"
                  height={30}
                  width={30}
                />
                Bakos Technologys
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  className="mx-aut"
                  src="/hawassa.webp"
                  alt="Hawassa Logo"
                  height={30}
                  width={30}
                />
                Hawassa University
              </div>
              <div className="flex">200+ Families</div>
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
