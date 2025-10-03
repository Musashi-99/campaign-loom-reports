curl -X 'GET' \
  'https://zany-space-halibut-6vwqqwxx9jphrvj-8000.app.github.dev/api/v1/reports/1/summary?top_n=50&batch_size=100' \
  -H 'accept: application/json' \
  -H 'X-Admin-Key: sourav-ahmed'

  {
  "campaign_id": 1,
  "total_comments": 2,
  "average_compound": 0.71095,
  "sentiment_distribution": {
    "positive": 2,
    "neutral": 0,
    "negative": 0
  },
  "word_cloud": {
    "top_n": 50,
    "words": [
      {
        "word": "good",
        "count": 2
      },
      {
        "word": "support",
        "count": 1
      },
      {
        "word": "honest",
        "count": 1
      },
      {
        "word": "okay",
        "count": 1
      }
    ]
  },
  "sentiments_pie": {
    "labels": [
      "positive",
      "neutral",
      "negative"
    ],
    "values": [
      2,
      0,
      0
    ],
    "percentages": [
      100,
      0,
      0
    ]
  }
}



curl -X 'GET' \
  'https://zany-space-halibut-6vwqqwxx9jphrvj-8000.app.github.dev/api/v1/reports/1/sentiments?batch_size=100' \
  -H 'accept: application/json' \
  -H 'X-Admin-Key: sourav-ahmed'
  
[
  {
    "comment_id": 1,
    "campaign_id": 1,
    "lang": "en",
    "comment": "i do support this, to be honest. this is good",
    "comment_en": "i do support this, to be honest. this is good",
    "sentiment": {
      "scores": {
        "neg": 0,
        "neu": 0.403,
        "pos": 0.597,
        "compound": 0.836
      },
      "label": "positive"
    }
  },
  {
    "comment_id": 2,
    "campaign_id": 1,
    "lang": "en",
    "comment": "okay this is good.",
    "comment_en": "okay this is good.",
    "sentiment": {
      "scores": {
        "neg": 0,
        "neu": 0.294,
        "pos": 0.706,
        "compound": 0.5859
      },
      "label": "positive"
    }
  }
]