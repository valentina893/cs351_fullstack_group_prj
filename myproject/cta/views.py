from django.http import JsonResponse
import requests
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# BAD PRACTICE: hardcoding API key directly instead of using environment variables
CTA_API_KEY = "524e55641a6c4655a2378d3644ca06f3"

def get_cta_trains(request):
    """
    Fetches real-time train data from CTA API and returns JSON.
    """
    url = f"http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key={CTA_API_KEY}&mapid=40790&outputType=JSON"
    
    try:
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

