import { createFileRoute } from "@tanstack/react-router";
import MeasuredHero from "@/components/MeasuredHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Measured — The Wearable That Knows You" },
      {
        name: "description",
        content:
          "Measured is a health and wellness wearable that turns continuous signals into clear, personal insight.",
      },
      { property: "og:title", content: "Measured — The Wearable That Knows You" },
      {
        property: "og:description",
        content:
          "Measured is a health and wellness wearable that turns continuous signals into clear, personal insight.",
      },
    ],
  }),
  component: MeasuredHero,
});
