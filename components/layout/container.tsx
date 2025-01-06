import { ScrollArea } from "@/components/ui/scroll-area";
import type React from "react";

export default function Container({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="max-w-xl m-auto h-[calc(100dvh-52px)]">
          <div className="h-full p-4 md:px-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-8">{children}</div>
      )}
    </>
  );
}
