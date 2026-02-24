import GlassCard from "@/app/(Admin)/admin-dashboard/components/GlassCard";
import { Loader2 } from "lucide-react";
export default function Loader() {
  return (
    <GlassCard>
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    </GlassCard>
  );
}
