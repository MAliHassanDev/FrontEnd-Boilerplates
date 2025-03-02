import { Button } from "@/common/components/ui/Button";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";

export const Home = () => {
  return (
    <main>
      <HomeHero />
    </main>
  );
};

function HomeHero() {
  return (
    <div className="pt-30">
      <div className="mx-auto flex max-w-1/2 flex-col items-center justify-center space-y-4 text-center">
        <h1 className="mb-6 text-6xl font-semibold">
          <span className="text-accent">GuardianGuide:</span> Nurturing
          Parenthood, One Tip at a Time
        </h1>

        <p className="mt-4 text-[22px] font-semibold text-gray-500">
          Revamp Parenthood: Expert Tips, Community Vibes, Delightful Daily!
        </p>

        <Button shape="primary" className="mt-10 w-40">
          <span>Get Started</span>
          <ArrowLongRightIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
