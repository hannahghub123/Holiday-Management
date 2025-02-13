import requests
from django.conf import settings
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_holidays(request):
    country = request.GET.get('country', 'US')
    year = request.GET.get('year', 2024)
    cache_key = f"holidays_{country}_{year}"

    # Check cache first
    cached_data = cache.get(cache_key)
    if cached_data:
        return Response(cached_data)

    # Make API request
    url = f"https://calendarific.com/api/v2/holidays"
    params = {
        "api_key": settings.CALENDARIFIC_API_KEY,
        "country": country,
        "year": year,
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json().get("response", {}).get("holidays", [])
        cache.set(cache_key, data, timeout=86400)  # Cache for 24 hours
        return Response(data)
    else:
        return Response({"error": "Failed to fetch data"}, status=500)
