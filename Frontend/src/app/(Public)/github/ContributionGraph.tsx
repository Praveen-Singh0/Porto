"use client";

import { useMemo } from "react";

export interface GHContributionCalendar {
  totalContributions: number;
  weeks: {
    contributionDays: {
      date: string;
      contributionCount: number;
      contributionLevel:
        | "NONE"
        | "FIRST_QUARTILE"
        | "SECOND_QUARTILE"
        | "THIRD_QUARTILE"
        | "FOURTH_QUARTILE";
    }[];
  }[];
}

const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export default function GitHubContributionGraph({
  calendar,
}: {
  calendar?: GHContributionCalendar;
}) {
  const weeks = calendar?.weeks?.slice(-52) ?? [];
  const total = calendar?.totalContributions ?? 0;

  const monthLabels = useMemo(() => {
    const labels: { label: string; index: number }[] = [];
    let prevMonth: number | null = null;

    weeks.forEach((week, index) => {
      const firstDay = week?.contributionDays?.[0];
      if (!firstDay) return;

      const date = new Date(firstDay.date);
      const month = date.getMonth();

      // Only add label when month changes
      if (prevMonth === null || month !== prevMonth) {
        labels.push({
          label: date.toLocaleString("default", { month: "short" }),
          index,
        });

        prevMonth = month;
      }
    });

    return labels;
  }, [weeks]);

  if (!weeks.length) {
    return (
      <div className="border border-[#30363d] rounded-md p-6 text-center text-sm text-[#848d97]">
        Contribution data unavailable
      </div>
    );
  }

  return (
    <div className="border border-[#30363d] dark:bg-gray-900/70 rounded-md p-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span className="text-sm dark:text-[#e6edf3]">
          {total.toLocaleString()} contributions in the last year
        </span>
      </div>
      <div className="flex gap-1 overflow-x-auto  ">
        <div className="flex flex-col gap-[3px] pt-5 mr-1 shrink-0">
          {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
            <div
              key={i}
              className="h-[11px] text-[9px] text-[#848d97] leading-[11px] w-6 text-right"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-1 min-w-0 ">
          <div className="relative h-4 mb-1 text-[10px] text-[#848d97]">
            {monthLabels.map((m) => (
              <span
                key={`${m.label}-${m.index}`}
                style={{
                  position: "absolute",
                  left: `${m.index * 14}px`,
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[4px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[4px]">
                {week.contributionDays.map((day) => {
                  const level =
                    LEVEL_MAP[day.contributionLevel] === 0
                      ? Math.floor(Math.random() * 25)
                      : LEVEL_MAP[day.contributionLevel];

                  const formattedDate = new Date(day.date).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                    },
                  );

                  return (
                    <div
                      key={day.date}
                      title={`${day.contributionCount} contribution${
                        day.contributionCount !== 1 ? "s" : ""
                      } on ${formattedDate}`}
                      className="w-[11px] h-[11px] rounded-sm cursor-default hover:opacity-80 transition-opacity"
                      style={{
                        backgroundColor: LEVEL_COLORS[level] || "#00000043",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-[#848d97]">
        <span>Less</span>

        {LEVEL_COLORS.map((c, i) => (
          <div
            key={i}
            className="w-[11px] h-[11px] rounded-sm border border-[#30363d]"
            style={{
              backgroundColor: c,
            }}
          />
        ))}

        <span>More</span>
      </div>
    </div>
  );
}
