import type { BeamLoadInput, BeamReactionResult } from "../shared/beam";
export interface ApiHealth { status: "ok"; service: string; pythonService: "connected" | "unavailable"; }
/** Typed API client; use an absolute base URL when the backend is hosted separately. */
export class EngineeringApi {
  constructor(private readonly baseUrl = "") {}
  async health(signal?: AbortSignal): Promise<ApiHealth> { return this.request<ApiHealth>("/health", { signal }); }
  async beamReactions(input: BeamLoadInput, signal?: AbortSignal): Promise<BeamReactionResult> {
    return this.request<BeamReactionResult>("/api/engineering/beam-reactions", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input), signal,
    });
  }
  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const base = this.baseUrl || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
    const response = await fetch(new URL(path, base), init);
    const body = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) throw new Error(body.error ?? `Request failed (${response.status})`);
    return body as T;
  }
}
