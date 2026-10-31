from fastapi.testclient import TestClient
from app.main import app
client = TestClient(app)
def test_health():
    assert client.get("/health").json()["status"] == "ok"
def test_centered_load_reactions():
    response = client.post("/api/beam-reactions", json={"span_m": 10, "load_kn": 20, "distance_m": 5})
    assert response.status_code == 200
    body = response.json()
    assert body["leftReactionKN"] == 10
    assert body["rightReactionKN"] == 10
    assert body["maxMomentKNm"] == 50
def test_rejects_load_outside_span():
    response = client.post("/api/beam-reactions", json={"span_m": 8, "load_kn": 24, "distance_m": 9})
    assert response.status_code == 422
