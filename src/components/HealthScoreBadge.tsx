import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showTrend?: boolean;
  trend?: "up" | "down" | "stable";
  className?: string;
}

const HealthScoreBadge = ({ 
  score, 
  size = "md", 
  showTrend = false, 
  trend = "stable",
  className 
}: HealthScoreBadgeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "health-excellent";
    if (score >= 70) return "health-good";
    if (score >= 50) return "health-fair";
    return "health-poor";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-20 h-20 text-base"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  };

  const colorClass = getScoreColor(score);
  const label = getScoreLabel(score);

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Circular Badge */}
      <div className="relative">
        <div 
          className={cn(
            "rounded-full border-4 flex items-center justify-center font-bold transition-all duration-300 hover:scale-105",
            sizeClasses[size],
            colorClass === "health-excellent" && "bg-success/10 border-success text-success",
            colorClass === "health-good" && "bg-warning/10 border-warning text-warning",
            colorClass === "health-fair" && "bg-orange-500/10 border-orange-500 text-orange-500",
            colorClass === "health-poor" && "bg-destructive/10 border-destructive text-destructive"
          )}
        >
          {score}
        </div>
        
        {/* Trend Indicator */}
        {showTrend && (
          <div className="absolute -top-1 -right-1">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center",
              trend === "up" && "bg-success text-success-foreground",
              trend === "down" && "bg-destructive text-destructive-foreground",
              trend === "stable" && "bg-muted text-muted-foreground"
            )}>
              <TrendIcon className="w-3 h-3" />
            </div>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="flex flex-col">
        <span className={cn("font-semibold", textSizeClasses[size])}>
          AI Health Score
        </span>
        <span className={cn(
          "font-medium",
          textSizeClasses[size],
          colorClass === "health-excellent" && "text-success",
          colorClass === "health-good" && "text-warning", 
          colorClass === "health-fair" && "text-orange-500",
          colorClass === "health-poor" && "text-destructive"
        )}>
          {label} ({score}/100)
        </span>
      </div>
    </div>
  );
};

export default HealthScoreBadge;