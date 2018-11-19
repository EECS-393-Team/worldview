from difflib import HtmlDiff
import requests
from django.http import HttpResponse, JsonResponse
from .constants import OUTPOST_IPS


def index(request):
    """
    The basic landing page for worldview
    """
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

    response_iter = iter(all_responses)
    base_ip = next(response_iter)
    diff_responses = {base_ip: ""}
    for ip in response_iter:
        diff_responses[ip] = diff_html(all_responses[base_ip], all_responses[ip])
    total_responses = {"html": all_responses, "diff": diff_responses}
    response = JsonResponse(total_responses)
    response["Access-Control-Allow-Origin"] = "localhost:4200"
    return response


def diff_html(base, other):
    """
    Uses difflib to construct a table that is the difference between the base and
    all of the other returned html
    """
    return HtmlDiff.make_table(base, other)
