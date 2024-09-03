"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Copy, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function StampGen() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("00:00");
  const [copied, setCopied] = useState("");

  const generateTimestamp = (format: string) => {
    if (!date) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const timestamp = new Date(date);
    timestamp.setHours(hours, minutes);
    return `<t:${Math.floor(timestamp.getTime() / 1000)}:${format}>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const timestampFormats = [
    { format: "t", description: "Short Time" },
    { format: "T", description: "Long Time" },
    { format: "d", description: "Short Date" },
    { format: "D", description: "Long Date" },
    { format: "f", description: "Short Date/Time" },
    { format: "F", description: "Long Date/Time" },
    { format: "R", description: "Relative Time" },
  ];

  return (
    <div className="min-h-screen bg-[#36393f] text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-[#2f3136] p-6 rounded-lg shadow-xl w-fit flex flex-row justify-between gap-8 align-middle">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-[#ffffff] flex items-center">
            <Clock className="mr-2 h-6 w-6 text-[#7289da]" />
            Discord Timestamp Generator
          </h1>
          <div className="space-y-6">
            <div>
              <Label htmlFor="datePicker" className="text-[#b9bbbe] mb-2 block">
                Select Date
              </Label>
              <div className="bg-[#40444b] p-3 rounded-md">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-[#40444b]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="timePicker" className="text-[#b9bbbe] mb-2 block">
                Select Time
              </Label>
              <Input
                type="time"
                id="timePicker"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-[#40444b] border-[#40444b] text-[#ffffff]"
              />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {timestampFormats.map(({ format, description }) => (
            <div
              key={format}
              className="flex items-center justify-between bg-[#40444b] p-3 rounded-md"
            >
              <span className="text-[#b9bbbe]">{description}</span>
              <div className="flex items-center space-x-2">
                <code className="bg-[#2f3136] px-2 py-1 rounded text-[#7289da]">
                  {generateTimestamp(format)}
                </code>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(generateTimestamp(format))
                        }
                        className="h-8 w-8 hover:bg-[#7289da] hover:text-white transition-colors"
                      >
                        {copied === generateTimestamp(format) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {copied === generateTimestamp(format)
                          ? "Copied!"
                          : "Copy to clipboard"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </div>
        {copied && (
          <div className="mt-4 text-[#43b581] text-center bg-[#40444b] p-2 rounded-md">
            Copied: {copied}
          </div>
        )}
    </div>
  );
}
