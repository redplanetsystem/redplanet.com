#!/usr/bin/env python3

import os
import requests
from datetime import datetime

ALPHA_VANTAGE_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')

def fetch_stock_data(symbol: str) -> dict:
    try:
        url = 'https://www.alphavantage.co/query'
        params = {
            'function': 'GLOBAL_QUOTE',
            'symbol': symbol,
            'apikey': ALPHA_VANTAGE_KEY
        }
        response = requests.get(url, params=params)
        return response.json()
    except Exception as e:
        print(f'Error fetching stock data: {e}')
        return {}

def fetch_forex_data(from_currency: str, to_currency: str) -> dict:
    try:
        url = 'https://www.alphavantage.co/query'
        params = {
            'function': 'CURRENCY_EXCHANGE_RATE',
            'from_currency': from_currency,
            'to_currency': to_currency,
            'apikey': ALPHA_VANTAGE_KEY
        }
        response = requests.get(url, params=params)
        return response.json()
    except Exception as e:
        print(f'Error fetching forex data: {e}')
        return {}

def main():
    print(f'[{datetime.now().isoformat()}] Aggregating market data...')
    stocks = ['TSLA', 'AAPL', 'MSFT', 'NVDA']
    for stock in stocks:
        data = fetch_stock_data(stock)
        print(f'{stock}: {data}')

if __name__ == '__main__':
    main()
