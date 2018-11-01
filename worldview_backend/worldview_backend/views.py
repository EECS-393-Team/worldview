import requests
from django.http import HttpResponse, JsonResponse
from .constants import OUTPOST_IPS


def index(request):
    return HttpResponse()


def get_url(request, url):
    """
    Iterates over a list of outpost ip's (Later to be specified in the helm config)
    sends same request to each ip and returns the list of responses
    """
    all_responses = {}
    for ip in OUTPOST_IPS:
        r = requests.get(f"{ip}/fetch?url={url}")
        all_responses[ip] = r.text
    return JsonResponse(all_responses)
