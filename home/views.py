from django.shortcuts import render
# Create your views here.

def getHomeView (request):
    return render(request, 'home/index.html', {})
