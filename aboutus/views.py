from django.shortcuts import render

# Create your views here.
def getAboutView (request):
    return render(request, 'aboutus/index.html', {})
