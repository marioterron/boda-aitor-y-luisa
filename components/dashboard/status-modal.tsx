import { AlertCircle, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StatusModalProps {
  isOpen: boolean;
  type: "error" | "empty";
  onClose: () => void;
}

export function StatusModal({ isOpen, type, onClose }: StatusModalProps) {
  const config = {
    error: {
      title: "Error Loading Data",
      description:
        "There was an error loading the dashboard data. Please try again later or contact the developer.",
      icon: AlertCircle,
      iconClass: "text-destructive",
    },
    empty: {
      title: "No Data Available",
      description:
        "There are no RSVPs to display yet. Check back later for updates.",
      icon: Info,
      iconClass: "text-info",
    },
  }[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <config.icon className={`h-5 w-5 ${config.iconClass}`} />
            <DialogTitle>{config.title}</DialogTitle>
          </div>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
