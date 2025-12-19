import { memo, useState, useEffect } from "react";
import { NodeProps, useReactFlow } from "reactflow";
import { Badge } from "../ui/badge";
import {
  Database,
  Server,
  Box,
  Settings,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  HardDrive,
  Globe,
  MemoryStick,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NodeData } from "@/types";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

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

function ServiceNode({ data, selected, id }: NodeProps<NodeData>) {
  const Icon = getNodeIcon(data.label);
  const { setNodes } = useReactFlow();
  const [activeTab, setActiveTab] = useState("cpu");
  const [sliderValue, setSliderValue] = useState(data.value || 0);

  // Sync slider value with node data
  useEffect(() => {
    setSliderValue(data.value || 0);
  }, [data.value]);

  // Update node data when slider changes
  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              value,
            },
          };
        }
        return node;
      })
    );
  };

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

  const tabIcons = {
    cpu: Cpu,
    memory: MemoryStick,
    disk: HardDrive,
    region: Globe,
  };

  const tabLabels = {
    cpu: "CPU",
    memory: "Memory",
    disk: "Disk",
    region: "Region",
  };

  // Prevent node selection when clicking on interactive elements
  const stopPropagation = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={cn(
        "min-w-[400px] bg-black border-border/50 transition-all flex flex-col gap-5",
        selected
          ? "border-primary/50 shadow-lg ring-2 ring-primary/20 scale-[1.02]"
          : "hover:border-primary/30 hover:shadow-lg"
      )}
    >
      {/* <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-primary" /> */}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-white" />
            <CardTitle className="text-base text-foreground">
              {data.label}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-green-500 bg-green-500/10 text-green-400 px-3 py-1.5"
              onPointerDown={stopPropagation}
              onClick={stopPropagation}
            >
              $0.03/hr
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-primary/20 hover:bg-primary/30"
              onPointerDown={stopPropagation}
              onClick={stopPropagation}
            >
              <Settings className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* Resource Metrics Tabs & Values */}
        <div className="space-y-2">
          {/* Top metric values */}
          <div className="flex items-center justify-around text-xs font-medium text-white/90">
            <span>0.02</span>
            <span>0.05 GB</span>
            <span>10.00 GB</span>
            <span>1</span>
          </div>

          {/* Tabs */}
          <div
            onPointerDown={stopPropagation}
            onClick={stopPropagation}
            onMouseDown={stopPropagation}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-[#181a23] p-1">
                {(Object.keys(tabIcons) as Array<keyof typeof tabIcons>).map(
                  (key) => {
                    const TabIcon = tabIcons[key];
                    return (
                      <TabsTrigger
                        key={key}
                        value={key}
                        className="flex items-center gap-1 text-white/80 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                        onPointerDown={stopPropagation}
                        onClick={stopPropagation}
                        onMouseDown={stopPropagation}
                      >
                        <TabIcon className="h-4 w-4" />
                        <span>{tabLabels[key]}</span>
                      </TabsTrigger>
                    );
                  }
                )}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Slider Controls */}
        <div 
          className="flex items-center justify-between gap-3 w-full"
          onPointerDown={stopPropagation}
          onClick={stopPropagation}
          onMouseDown={stopPropagation}
        >
          <div 
            className="flex-1"
            onPointerDown={stopPropagation}
            onClick={stopPropagation}
            onMouseDown={stopPropagation}
          >
            <Slider
              className="w-full"
              min={0}
              max={100}
              step={1}
              value={[sliderValue]}
              onValueChange={(value) => handleSliderChange(value[0])}
            />
          </div>
          <span className="text-xs text-white/80 min-w-[3.5rem] text-right font-medium">
            {sliderValue}%
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between w-full">
          <Badge variant={status.variant as 'default' | 'secondary' | 'destructive' | 'outline'} className="text-xs font-medium">
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardContent>

      {/* <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary"
      /> */}
    </Card>
  );
}

export default memo(ServiceNode);
