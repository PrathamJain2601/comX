import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const CELL_SIZE = 19;
const DAYS_IN_WEEK = 7;
const WEEKS_IN_YEAR = 53;
const MARGIN_LEFT = 75;

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

  // Generate month labels based on start date
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
          x: weekIndex * CELL_SIZE + MARGIN_LEFT,
        });
      }
    }
    return labels;
  }, [startDate]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${WEEKS_IN_YEAR + 1}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${DAYS_IN_WEEK + 2}, ${CELL_SIZE}px)`,
        gap: "2px",
        position: "relative",
        width: `${(WEEKS_IN_YEAR + 1) * CELL_SIZE + MARGIN_LEFT}px`,
        height: `${(DAYS_IN_WEEK + 2) * CELL_SIZE}px`,
      }}
    >
      {/* Month labels */}
      {monthLabels.map((month, index) => (
        <div
          key={index}
          style={{
            gridColumnStart: Math.floor(month.x / CELL_SIZE) + 2,
            gridRowStart: 1,
            fontSize: "12px",
            textAlign: "left",
          }}
        >
          {month.label}
        </div>
      ))}
      <div
        key={12}
        style={{
          gridColumnStart: Math.floor((monthLabels[0].x + monthLabels[11].x + 25) / CELL_SIZE) + 2,
          gridRowStart: 1,
          fontSize: "12px",
          textAlign: "left",
        }}
      >
        {monthLabels[0].label}
      </div>

      {/* Weekday labels */}
      {weekdayNames.map((day, index) => (
        <div
          key={day}
          style={{
            gridColumnStart: 1,
            gridRowStart: index + 2,
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          {day}
        </div>
      ))}

      {/* Render heatmap cells */}
      {data.map((day, index) => {
        const col = Math.floor(index / DAYS_IN_WEEK);
        const row = index % DAYS_IN_WEEK;
        return (
          <div
            key={day.date.toISOString()}
            style={{
              gridColumnStart: col + 3,
              gridRowStart: row + 2,
              width: `${CELL_SIZE - 2}px`,
              height: `${CELL_SIZE - 2}px`,
              backgroundColor: interpolateGreens(colorScale(day.count)),
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#fff",
              cursor: "pointer",
            }}
            title={`${day.date.toDateString()}: ${day.count} contribution${
              day.count !== 1 ? "s" : ""
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default function ImprovedCodeHeatmap({
  data,
  title = "Contribution Heatmap",
  description = "Visualization of your coding activity over the past year",
}: HeatmapProps) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-auto">
          <CustomHeatmap data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
