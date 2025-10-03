# API Endpoints Documentation

This document lists all available API endpoints, their request/response data, and usage for connecting your static UI.

---

## Health Endpoints

### `GET /health/ready`
- **Request:** None
- **Response:** `{ "status": "ok" }`

### `GET /health/live`
- **Request:** None
- **Response:** `{ "status": "ok" }`

---

## Campaigns Endpoints

### `POST /campaigns/`
- **Request:**
```json
{
  "title": "string",
  "body": "string",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "medias": [
    { "url": "string", "type": "string" }
  ]
}
```
- **Response:**
```json
{
  "id": 1,
  "title": "string",
  "body": "string",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "medias": [
    { "url": "string", "type": "string" }
  ]
}
```

### `GET /campaigns/`
- **Request:** Query params: `skip` (int), `limit` (int)
- **Response:** List of Campaign objects (see above)

### `GET /campaigns/{campaign_id}`
- **Request:** Path param: `campaign_id` (int)
- **Response:** Campaign object (see above)

### `DELETE /campaigns/{campaign_id}`
- **Request:** Path param: `campaign_id` (int)
- **Response:** No content (204)

---

## Comments Endpoints

### `POST /comments/`
- **Request:**
```json
{
  "campaign_id": 1,
  "email": "user@example.com",
  "comment": "string",
  "replied_to": 2
}
```
- **Response:**
```json
{
  "id": 1,
  "campaign_id": 1,
  "email": "user@example.com",
  "comment": "string",
  "comment_en": "string",
  "lang": "string",
  "replied_to": 2,
  "created_at": "YYYY-MM-DDTHH:MM:SS"
}
```

### `GET /comments/by-campaign/{campaign_id}`
- **Request:** Path param: `campaign_id` (int), Query params: `skip` (int), `limit` (int)
- **Response:** List of Comment objects (see above)

---

## Reports Endpoints

### `GET /reports/{campaign_id}/sentiments`
- **Request:** Path param: `campaign_id` (int), Query param: `batch_size` (int)
- **Response:** List of objects:
```json
{
  "comment_id": 1,
  "campaign_id": 1,
  "lang": "string",
  "comment": "string",
  "comment_en": "string",
  "sentiment": {
    "scores": { "neg": 0.0, "neu": 0.0, "pos": 0.0, "compound": 0.0 },
    "label": "string"
  }
}
```

### `GET /reports/{campaign_id}/summary`
- **Request:** Path param: `campaign_id` (int), Query params: `top_n` (int), `batch_size` (int)
- **Response:**
```json
{
  "campaign_id": 1,
  "total_comments": 100,
  "average_compound": 0.5,
  "sentiment_distribution": {
    "positive": 10,
    "neutral": 80,
    "negative": 10
  },
  "word_cloud": {
    "top_n": 10,
    "words": [ { "word": "string", "count": 5 } ]
  },
  "sentiments_pie": {
    "labels": ["positive", "neutral", "negative"],
    "values": [10, 80, 10],
    "percentages": [10.0, 80.0, 10.0]
  }
}
```

---

**Note:**
- All endpoints may require authentication/authorization depending on your backend setup.
- Data types and field names are based on backend models and may be subject to change.


just to create campain we need.
async def require_admin_key(x_admin_key: str | None = Header(default=None, alias="X-Admin-Key")) -> None:
    expected = settings.admin_key or ""
    if not expected:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="admin key not configured")
    if x_admin_key != expected:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="invalid admin key")
    return None 

this header thing


curl -X 'POST' \
  'https://zany-space-halibut-6vwqqwxx9jphrvj-8000.app.github.dev/api/v1/campaigns/' \
  -H 'accept: application/json' \
  -H 'X-Admin-Key: abcd' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "string",
  "body": "string",
  "start_date": "2025-10-03",
  "end_date": "2025-10-03",
  "medias": []
}'