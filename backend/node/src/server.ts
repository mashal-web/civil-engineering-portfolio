import express, { type NextFunction, type Request, type Response } from "express";
const app = express();
const port = Number(process.env.PORT ?? 3000);
const pythonUrl = (process.env.PYTHON_SERVICE_URL ?? "http://python:8000").replace(/\/$/, "");
app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.get("/health", async (_req, res) => {
  let pythonService: "connected" | "unavailable" = "unavailable";
  try {
    const response = await fetch(`${pythonUrl}/health`, { signal: AbortSignal.timeout(1500) });
    if (response.ok) pythonService = "connected";
  } catch { /* Keep health useful if the optional analysis service is down. */ }
  res.json({ status: "ok", service: "portfolio-api", pythonService });
});
app.post("/api/engineering/beam-reactions", async (req, res, next) => {
  try {
    const { spanM, loadKN, distanceM } = req.body ?? {};
    if (![spanM, loadKN, distanceM].every((n) => typeof n === "number" && Number.isFinite(n))) {
      res.status(400).json({ error: "spanM, loadKN and distanceM must be finite numbers." }); return;
    }
    const response = await fetch(`${pythonUrl}/api/beam-reactions`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ span_m: spanM, load_kn: loadKN, distance_m: distanceM }),
      signal: AbortSignal.timeout(5000),
    });
    res.status(response.status).json(await response.json());
  } catch (error) { next(error); }
});
app.use((_req, res) => res.status(404).json({ error: "Route not found." }));
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = error instanceof Error ? error.message : "Unexpected server error.";
  res.status(503).json({ error: "Engineering service unavailable.", detail: message });
});
app.listen(port, "0.0.0.0", () => console.log(`Portfolio API listening on port ${port}`));
