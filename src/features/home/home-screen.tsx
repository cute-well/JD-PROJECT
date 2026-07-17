"use client";

import { motion } from "framer-motion";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Download, WandSparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip);

const formSchema = z.object({
  role: z.string().min(2, "Role is required"),
  focus: z.string().min(2, "Focus area is required"),
});

type FormValues = z.infer<typeof formSchema>;

const STORAGE_KEY = "careercanvas_preferences";

export function HomeScreen() {
  const [chartReady, setChartReady] = useState(false);
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { role: "", focus: "" },
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      reset(JSON.parse(saved) as FormValues);
    }
  }, [reset]);

  useEffect(() => {
    if (!chartCanvasRef.current) {
      return;
    }

    const chart = new Chart(chartCanvasRef.current, {
      type: "bar",
      data: {
        labels: ["Networking", "Portfolio", "Interview", "Skill Depth"],
        datasets: [
          {
            label: "Readiness Score",
            data: [72, 86, 64, 78],
            borderRadius: 8,
            backgroundColor: ["#6366f1", "#22c55e", "#06b6d4", "#f59e0b"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });

    setChartReady(true);
    return () => chart.destroy();
  }, []);

  const onSubmit = (values: FormValues) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  };

  const summary = useMemo(
    () => [
      { label: "Active Plans", value: "04" },
      { label: "Opportunities", value: "11" },
      { label: "Goal Progress", value: "78%" },
    ],
    [],
  );

  const exportPdf = async () => {
    if (!cardRef.current) return;

    const { default: html2pdf } = await import("html2pdf.js");

    html2pdf(cardRef.current, {
      margin: 0.4,
      filename: "careercanvas-summary.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    });
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/20 bg-card/70 p-6 shadow-xl backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">CareerCanvas AI</h1>
            <p className="text-sm text-muted-foreground">
              Plan, visualize, and track your career momentum.
            </p>
          </div>
          <Button variant="outline" onClick={exportPdf}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {summary.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/20 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section
          ref={cardRef}
          className="rounded-2xl border border-white/20 bg-card/70 p-6 shadow-xl backdrop-blur-xl"
        >
          <h2 className="mb-4 text-lg font-semibold">Readiness Snapshot</h2>
          <canvas ref={chartCanvasRef} aria-label="Readiness chart" />
          {!chartReady && (
            <p className="mt-3 text-sm text-muted-foreground">Preparing visualization...</p>
          )}
        </section>

        <section className="rounded-2xl border border-white/20 bg-card/70 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <WandSparkles className="h-5 w-5 text-primary" /> Preference Capture
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="role" className="mb-1 block text-sm font-medium">
                Target Role
              </label>
              <input
                id="role"
                {...register("role")}
                className="w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-sm"
              />
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
            </div>

            <div>
              <label htmlFor="focus" className="mb-1 block text-sm font-medium">
                Current Focus
              </label>
              <input
                id="focus"
                {...register("focus")}
                className="w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-sm"
              />
              {errors.focus && <p className="mt-1 text-xs text-red-500">{errors.focus.message}</p>}
            </div>

            <Button className="w-full" type="submit">
              Save to LocalStorage
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
