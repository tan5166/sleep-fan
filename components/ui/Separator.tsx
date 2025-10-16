// components/ui/Separator.tsx
import { ThemedView } from "@/components/ThemedView";

/**
 * A simple divider line for separating content
 */
export function Separator() {
  return (
    <ThemedView
      lightColor="bg-slate-200"
      darkColor="bg-slate-700"
      className="h-[1px] w-full"
    />
  );
}
