# Full-stack architecture

The existing seven-page portfolio remains a static GitHub Pages site. This starter is separate so existing pages, theme toggle, course tools and Pages deployment keep working unchanged.

## Components
- TypeScript in src/: shared beam types, input validation and a typed HTTP client.
- Node.js + Express in backend/node/: API gateway, request validation, health endpoint and forwarding to Python.
- Python + FastAPI in backend/python/: isolated engineering calculation service.
- PostgreSQL in database/schema.sql: starter tables for courses, projects and calculation records. Persistence is not yet wired into API routes.
- Docker Compose for local API, Python service and database orchestration.
- GitHub Actions for TypeScript and Python checks.

## Run locally
Requirements: Node.js 22+, Python 3.12+, and Docker Compose (optional).

From the repository root:
1. Run npm install, then npm run typecheck and npm test.
2. Start Python: cd backend/python; create and activate a virtual environment; pip install -r requirements-dev.txt; PYTHONPATH=. pytest -q; uvicorn app.main:app --reload --port 8000.
3. In another root terminal: npm run build; set PYTHON_SERVICE_URL=http://127.0.0.1:8000; npm start.
4. Or set POSTGRES_PASSWORD to a local development password, then run docker compose up --build.

Node API: http://localhost:3000/health. Python API docs: http://localhost:8000/docs.

## Deploying safely
GitHub Pages only serves static files. Deploy Node and Python services and PostgreSQL separately to enable live backend features. Configure the frontend API base URL when hosted separately. Do not expose the database publicly in production; configure TLS, CORS, secrets, rate limits and authentication before adding accounts or user-specific data.

## Engineering safety
The beam example assumes a simply supported beam with one vertical point load. It is an educational demonstration, not a code-compliant design tool. It excludes self-weight, distributed loads, load combinations, deflection, material behavior and jurisdiction-specific requirements.
