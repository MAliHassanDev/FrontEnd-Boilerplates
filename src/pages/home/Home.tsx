import { Button } from "@/global/components/ui/Button";

export const Home = () => {
  return (
    <main className="m-2 flex items-center justify-center rounded border p-4">
      <div className="text-center">
        <h1 className="m-2 text-3xl">Home Page</h1>
        <Button shape="accent">Primary Button</Button>
      </div>
    </main>
  );
};
