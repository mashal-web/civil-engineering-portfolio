from fastapi import FastAPI
from pydantic import BaseModel, Field, model_validator
app = FastAPI(title="Civil Engineering Analysis Service", version="1.0.0")
class BeamLoad(BaseModel):
    span_m: float = Field(gt=0, le=10000, description="Beam span in metres")
    load_kn: float = Field(ge=0, le=1000000, description="Single vertical point load in kN")
    distance_m: float = Field(ge=0, description="Load distance from left support in metres")
    @model_validator(mode="after")
    def load_is_inside_span(self):
        if self.distance_m > self.span_m:
            raise ValueError("distance_m must be between 0 and span_m")
        return self
@app.get("/health")
def health():
    return {"status": "ok", "service": "python-analysis"}
@app.post("/api/beam-reactions")
def beam_reactions(load: BeamLoad):
    right = load.load_kn * load.distance_m / load.span_m
    left = load.load_kn - right
    return {
        "leftReactionKN": round(left, 6), "rightReactionKN": round(right, 6),
        "maxMomentKNm": round(left * load.distance_m, 6),
        "model": "simply-supported beam, single point load",
        "warning": "Educational estimate only; excludes self-weight, distributed loads, deflection, design codes and load factors."
    }
