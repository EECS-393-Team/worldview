from difflib import HtmlDiff
import requests
from django.http import HttpResponse, JsonResponse
from .constants import OUTPOST_IPS
from PIL import Image
from PIL import ImageChops


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
    image_responses = {}
    for ip in OUTPOST_IPS:
        r = requests.get(f"{ip}/fetch?url={url}")
        all_responses[ip] = r.text
        i = requests.get(f"{ip}/screenshot?url={url}")
        image_responses[ip] = i.content
    response_iter = iter(all_responses)
    base_ip = next(response_iter)
    diff_responses = {base_ip: ""}
    image_diff_responses = {base_ip: image_responses[base_ip]}
    for ip in response_iter:
        diff_responses[ip] = diff_html(all_responses[base_ip], all_responses[ip])
        image_diff_responses[ip] = diff_image(
            image_responses[base_ip], image_responses[ip]
        )
    total_responses = {
        "html": all_responses,
        "diff": diff_responses,
        "image": image_responses,
        "image_diff": image_diff_responses,
    }
    response = JsonResponse(total_responses)
    response["Access-Control-Allow-Origin"] = "localhost:4200"
    return response


def diff_html(base, other):
    """
    Uses difflib to construct a table that is the difference between the base and
    all of the other returned html
    """
    print(other)
    diff = HtmlDiff(wrapcolumn=60)
    return diff.make_table(fromlines=base.splitlines(), tolines=other.splitlines())


def diff_image(base, other):
    """
    Uses pillow's image diffing feature to compare the two screenshots returns a file
    """
    base_image = Image.open(base)
    other_image = Image.open(other)
    return ImageChops.difference(base_image, other_image)
