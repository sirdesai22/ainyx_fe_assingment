import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Badge } from "../ui/badge";
import {
  Database,
  Server,
  Box,
  Settings,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NodeData } from "@/types";
import { Slider } from "../ui/slider";

const nodeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  postgres: Database,
  redis: Box,
  mongodb: Database,
  default: Server,
};

function getNodeIcon(label: string) {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("postgres")) return nodeIcons.postgres;
  if (lowerLabel.includes("redis")) return nodeIcons.redis;
  if (lowerLabel.includes("mongo")) return nodeIcons.mongodb;
  return nodeIcons.default;
}

function ServiceNode({ data, selected }: NodeProps<NodeData>) {
  const Icon = getNodeIcon(data.label);

  const statusConfig = {
    healthy: {
      color: "bg-green-500",
      icon: CheckCircle2,
      label: "Healthy",
      variant: "healthy" as const,
    },
    degraded: {
      color: "bg-yellow-500",
      icon: AlertTriangle,
      label: "Degraded",
      variant: "degraded" as const,
    },
    down: {
      color: "bg-red-500",
      icon: XCircle,
      label: "Down",
      variant: "down" as const,
    },
  };

  const status = statusConfig[data.status] || statusConfig.healthy;
  const StatusIcon = status.icon;

  return (
    <div
      className={cn(
        "px-4 py-4 rounded-xl border min-w-[400px] transition-all flex flex-col gap-5 items-center justify-center bg-black",
        selected
          ? "border-primary/50 shadow-lg ring-2 ring-primary/20 scale-[1.02]"
          : "border-border/50 hover:border-primary/30 hover:shadow-lg"
      )}
    >
      {/* <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-primary" /> */}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 w-full">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-white" />
          <div>
            <h3 className="font-semibold text-base text-foreground">
              {data.label}
            </h3>
            {/* <div className="flex items-center gap-1.5 mt-0.5">
              <div className={cn('w-1.5 h-1.5 rounded-full', status.color)} />
              <span className="text-xs text-muted-foreground">{status.label}</span>
            </div> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center border-2 border-green-500 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-white">$0.03/hr</span>
          </div>
          <button className="p-1.5 hover:bg-primary/20 transition-colors bg-primary/20 rounded-xl">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      {/* Resource Metrics Tabs & Values */}
      <div className="mb-3 w-full">
        {/* Top metric values */}
        <div className="flex items-center justify-around mb-2 text-xs font-medium text-white/90">
          <span>0.02</span>
          <span>0.05 GB</span>
          <span>10.00 GB</span>
          <span>1</span>
        </div>
        {/* Tabs */}
        <div className="flex bg-[#181a23] rounded-xl p-1 justify-around">
          <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/80 font-medium hover:bg-white/10 transition-all">
            <Icon className="h-4 w-4" />
            <span>CPU</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/80 font-medium hover:bg-white/10 transition-all">
            <Icon className="h-4 w-4" />
            <span>Memory</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/80 font-medium hover:bg-white/10 transition-all">
            <Icon className="h-4 w-4" />
            <span>Disk</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/80 font-medium hover:bg-white/10 transition-all">
            <Icon className="h-4 w-4" />
            <span>Region</span>
          </button>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="w-full flex items-center justify-between gap-2">
        <Slider
          className="w-full z-50"
          min={0}
          max={100}
          value={50}
          onValueChange={(value: number) => console.log(value)}
        />
          <span className="text-xs text-white/80">100%</span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between w-full">
        <Badge variant={status.variant} className="text-xs font-medium">
          <StatusIcon className="h-3 w-3 mr-1" />
          {status.label}
        </Badge>
        <Icon className="h-4 w-4 text-white" />
      </div>

      {/* <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary"
      /> */}
    </div>
  );
}

export default memo(ServiceNode);
