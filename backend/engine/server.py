import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

from backend.engine.match import MatchService
from backend.engine.registry import HeroRegistry


HOST = os.environ.get("HEROES_BACKEND_HOST", "127.0.0.1")
PORT = int(os.environ.get("HEROES_BACKEND_PORT", "8000"))
REGISTRY = HeroRegistry()
MATCH_SERVICE = MatchService(REGISTRY)


class Handler(BaseHTTPRequestHandler):
    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length == 0:
            return {}
        raw = self.rfile.read(content_length)
        return json.loads(raw.decode("utf-8"))

    def do_OPTIONS(self):
        self._send_json({}, 204)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/health":
            self._send_json({"status": "ok"})
            return
        if path == "/api/heroes":
            self._send_json({"heroes": REGISTRY.list_heroes()})
            return
        if path.startswith("/api/matches/"):
            match_id = path.split("/")[-1]
            state = MATCH_SERVICE.get_match(match_id)
            if not state:
                self._send_json({"error": "Match not found"}, 404)
                return
            self._send_json(MATCH_SERVICE.serialize(state))
            return
        self._send_json({"error": "Not found"}, 404)

    def do_POST(self):
        path = urlparse(self.path).path
        payload = self._read_json()

        if path == "/api/matches":
            try:
                state = MATCH_SERVICE.create_match(payload.get("player1HeroId"), payload.get("player2HeroId"))
            except KeyError as exc:
                self._send_json({"error": str(exc)}, 400)
                return
            self._send_json(MATCH_SERVICE.serialize(state), 201)
            return

        if path.endswith("/round") and path.startswith("/api/matches/"):
            match_id = path.split("/")[-2]
            try:
                state = MATCH_SERVICE.queue_and_run_round(
                    match_id,
                    payload.get("player1Queue", []),
                    payload.get("player2Queue", []),
                )
            except KeyError as exc:
                status = 404 if str(exc) == "'Match not found'" else 400
                self._send_json({"error": str(exc)}, status)
                return

            self._send_json(MATCH_SERVICE.serialize(state))
            return

        self._send_json({"error": "Not found"}, 404)


def main():
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Python backend listening on http://{HOST}:{PORT}")
    server.serve_forever()
