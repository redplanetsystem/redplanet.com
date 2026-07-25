#!/usr/bin/env python3

import os
import requests
from datetime import datetime
from typing import List, Dict

NASA_API_KEY = os.getenv('NASA_API_KEY')

def fetch_mars_news() -> List[Dict]:
    try:
        response = requests.get(
            'https://api.nasa.gov/planetary/apod',
            params={'api_key': NASA_API_KEY, 'count': 5}
        )
        data = response.json()
        return data if isinstance(data, list) else [data]
    except Exception as e:
        print(f'Error fetching Mars news: {e}')
        return []

def synthesize_news(items: List[Dict]) -> List[Dict]:
    return [{
        'title': item.get('title', 'Red Planet Update'),
        'description': item.get('explanation', ''),
        'category': 'Space',
        'timestamp': datetime.now().isoformat(),
    } for item in items]

def main():
    print(f'[{datetime.now().isoformat()}] Starting news automation...')
    news = fetch_mars_news()
    synthesized = synthesize_news(news)
    print(f'Published {len(synthesized)} news items')

if __name__ == '__main__':
    main()
