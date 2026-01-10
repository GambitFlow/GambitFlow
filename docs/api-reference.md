# API Reference

Complete API documentation for GambitFlow chess engines.

## Base URLs

Each model has its own endpoint:

- **Nexus-Nano**: `https://gambitflow-nexus-nano-inference-api.hf.space`
- **Nexus-Core**: `https://gambitflow-nexus-core-inference-api.hf.space`
- **Synapse-Base**: `https://gambitflow-synapse-base-inference-api.hf.space`

## Endpoints

### POST /get-move

Get the best move for a given chess position.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "fen": "string",
  "depth": integer,
  "time_limit": integer
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fen | string | Yes | Position in FEN notation |
| depth | integer | No | Search depth (1-10) |
| time_limit | integer | No | Time limit in milliseconds |

**Default values by model:**

| Model | Default Depth | Default Time Limit |
|-------|---------------|-------------------|
| Nano | 4 | 2000ms |
| Core | 5 | 3000ms |
| Base | 6 | 5000ms |

**Response:**
```json
{
  "best_move": "string",
  "evaluation": number,
  "depth_searched": integer,
  "seldepth": integer,
  "nodes_evaluated": integer,
  "time_taken": integer,
  "nps": integer,
  "pv": ["string"],
  "tt_hit_rate": number
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| best_move | string | Best move in UCI format (e.g., "e2e4") |
| evaluation | number | Position score in centipawns |
| depth_searched | integer | Actual search depth reached |
| seldepth | integer | Selective search depth |
| nodes_evaluated | integer | Total nodes evaluated |
| time_taken | integer | Time taken in milliseconds |
| nps | integer | Nodes per second |
| pv | array | Principal variation (best line) |
| tt_hit_rate | number | Transposition table hit rate (0-1) |

**Example Request:**
```bash
curl -X POST https://gambitflow-nexus-core-inference-api.hf.space/get-move \
  -H "Content-Type: application/json" \
  -d '{
    "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
    "depth": 5,
    "time_limit": 3000
  }'
```

**Example Response:**
```json
{
  "best_move": "e7e5",
  "evaluation": 0.15,
  "depth_searched": 5,
  "seldepth": 8,
  "nodes_evaluated": 125487,
  "time_taken": 1523,
  "nps": 82341,
  "pv": ["e7e5", "Ng1f3", "Nb8c6", "Bf1c4", "Ng8f6"],
  "tt_hit_rate": 0.68
}
```

**Error Responses:**

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request (bad FEN, invalid parameters) |
| 408 | Request timeout |
| 500 | Internal server error |
| 503 | Service unavailable |

**Error Response Format:**
```json
{
  "error": "string",
  "message": "string",
  "code": integer
}
```

---

### GET /health

Check the health status of the service.

**Response:**
```json
{
  "status": "online",
  "timestamp": "2025-01-09T12:34:56Z",
  "model": "string",
  "version": "string"
}
```

**Example Request:**
```bash
curl https://gambitflow-nexus-core-inference-api.hf.space/health
```

---

## Rate Limits

All endpoints have the following rate limits:

- **Requests per minute**: 60
- **Requests per hour**: 1000
- **Concurrent requests**: 5

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1641733856
```

---

## FEN Notation

FEN (Forsyth-Edwards Notation) describes a chess position. Format:

```
[pieces] [turn] [castling] [en passant] [halfmove] [fullmove]
```

**Example:**
```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```

**Components:**
1. **Pieces**: Rank-by-rank from 8 to 1
   - Uppercase = White pieces
   - Lowercase = Black pieces
   - Numbers = Empty squares
2. **Turn**: `w` (White) or `b` (Black)
3. **Castling**: `KQkq` or `-` if none available
4. **En passant**: Target square or `-`
5. **Halfmove clock**: For 50-move rule
6. **Fullmove number**: Starts at 1

---

## Move Notation

Moves are returned in UCI (Universal Chess Interface) format:

**Format:** `[from_square][to_square][promotion]`

**Examples:**
- `e2e4` - Pawn from e2 to e4
- `e1g1` - King from e1 to g1 (castling)
- `e7e8q` - Pawn from e7 to e8, promotes to Queen

**Promotion pieces:**
- `q` = Queen
- `r` = Rook
- `b` = Bishop
- `n` = Knight

---

## Code Examples

### JavaScript
```javascript
async function getMove(fen) {
  const response = await fetch(
    'https://gambitflow-nexus-core-inference-api.hf.space/get-move',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fen: fen,
        depth: 5,
        time_limit: 3000
      })
    }
  );
  
  return await response.json();
}
```

### Python
```python
import requests

def get_move(fen):
    response = requests.post(
        'https://gambitflow-nexus-core-inference-api.hf.space/get-move',
        json={
            'fen': fen,
            'depth': 5,
            'time_limit': 3000
        }
    )
    return response.json()
```

### cURL
```bash
curl -X POST \
  https://gambitflow-nexus-core-inference-api.hf.space/get-move \
  -H 'Content-Type: application/json' \
  -d '{
    "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "depth": 5,
    "time_limit": 3000
  }'
```

---

## Best Practices

1. **Always validate FEN strings** before sending requests
2. **Handle timeout errors** gracefully
3. **Implement retry logic** with exponential backoff
4. **Cache responses** when analyzing the same position
5. **Use appropriate depth** for your use case
6. **Monitor rate limits** to avoid throttling
7. **Check health endpoint** before making requests

---

## Support

For API issues or questions:
- Check [System Status](#status)
- Review error messages carefully
- Report bugs on GitHub
- Join our community discussions
