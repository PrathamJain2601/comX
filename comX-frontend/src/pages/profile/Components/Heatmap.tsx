"use client";

import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { scaleLinear } from "d3-scale";
import { interpolateGreens } from "d3-scale-chromatic";

interface ContributionData {
  date: Date;
  count: number;
}

interface HeatmapProps {
  data: ContributionData[];
  title?: string;
  description?: string;
}

const CELL_SIZE = 15;
const DAYS_IN_WEEK = 7;
const WEEKS_IN_YEAR = 53;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CustomHeatmap = ({ data }: { data: ContributionData[] }) => {
  const colorScale = scaleLinear<number>()
    .domain([0, Math.max(...data.map((d) => d.count))])
    .range([0, 1]);

  const startDate = data[0].date;
  const monthLabels = useMemo(() => {
    const labels = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const weekIndex = Math.floor(
        (firstDayOfMonth.getTime() - startDate.getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      );
      if (weekIndex < WEEKS_IN_YEAR) {
        labels.push({
          label: monthNames[date.getMonth()],
          x: weekIndex * CELL_SIZE,
        });
      }
    }
    return labels;
  }, [startDate]);

  return (
    <svg
      width={(WEEKS_IN_YEAR + 1) * CELL_SIZE}
      height={(DAYS_IN_WEEK + 2) * CELL_SIZE}
    >
      {/* Month labels */}
      {monthLabels.map((month, index) => (
        <text
          key={index}
          x={month.x}
          y={CELL_SIZE}
          fontSize={12}
          textAnchor="start"
        >
          {month.label}
        </text>
      ))}

      {/* Weekday labels */}
      {weekdayNames.map((day, index) => (
        <text
          key={day}
          y={(index + 2) * CELL_SIZE}
          x={0}
          fontSize={12}
          textAnchor="start"
          dominantBaseline="middle"
        >
          {day}
        </text>
      ))}

      {/* Heatmap cells */}
      {data.map((day, index) => {
        const col = Math.floor(index / DAYS_IN_WEEK);
        const row = index % DAYS_IN_WEEK;
        return (
          <rect
            key={day.date.toISOString()}
            x={(col + 1) * CELL_SIZE}
            y={(row + 2) * CELL_SIZE}
            width={CELL_SIZE - 1}
            height={CELL_SIZE - 1}
            fill={interpolateGreens(colorScale(day.count))}
            data-tip={`${day.date.toDateString()}: ${day.count} contribution${
              day.count !== 1 ? "s" : ""
            }`}
          />
        );
      })}
    </svg>
  );
};

export default function ImprovedLeetCodeHeatmap({
  data,
  title = "Contribution Heatmap",
  description = "Visualization of your coding activity over the past year",
}: HeatmapProps) {
  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <CustomHeatmap data={data} />
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample data generation for demonstration
const generateSampleData = (days: number): ContributionData[] => {
  const data: ContributionData[] = [];
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);
  for (let i = 0; i < days; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    data.unshift({
      date: date,
      count: Math.floor(Math.random() * 10),
    });
  }
  return data;
};

// Usage example
export function HeatmapExample() {
  const sampleData = React.useMemo(() => generateSampleData(365), []);
  return <ImprovedLeetCodeHeatmap data={sampleData} />;
}
