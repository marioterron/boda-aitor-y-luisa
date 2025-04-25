import { LucideIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import cn from "@/lib/utils/cn";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  badgeValue: string;
  footerText: string;
  variant?: "default" | "success" | "warning" | "info";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  badgeValue,
  footerText,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: {
      icon: "text-gray-500",
      badge: "border-gray-200 text-gray-600",
      value: "text-gray-900",
    },
    success: {
      icon: "text-green-500",
      badge: "border-green-200 text-green-600",
      value: "text-green-900",
    },
    warning: {
      icon: "text-amber-500",
      badge: "border-amber-200 text-amber-600",
      value: "text-amber-900",
    },
    info: {
      icon: "text-blue-500",
      badge: "border-blue-200 text-blue-600",
      value: "text-blue-900",
    },
  };

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>{title}</CardDescription>
        <CardTitle
          className={cn(
            "@[250px]/card:text-3xl text-2xl font-semibold tabular-nums",
            variantStyles[variant].value
          )}
        >
          {value}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge
            variant="outline"
            className={cn(
              "flex gap-1 rounded-lg text-xs",
              variantStyles[variant].badge
            )}
          >
            <Icon className={cn("size-3", variantStyles[variant].icon)} />
            {badgeValue}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {footerText}{" "}
          <Icon className={cn("size-4", variantStyles[variant].icon)} />
        </div>
        <div className="text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}
