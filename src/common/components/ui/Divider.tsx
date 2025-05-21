import { Separator } from "@radix-ui/react-separator";

export function DividerWithText({ text }: { text: string }) {
  return (
    <div className="my-4 flex items-center gap-4">
      <Separator className="flex-grow" />
      <span className="text-muted-foreground text-sm whitespace-nowrap">
        {text}
      </span>
      <Separator className="flex-grow" />
    </div>
  );
}
