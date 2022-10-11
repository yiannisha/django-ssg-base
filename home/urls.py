from django.urls import path
from django_distill import distill_path

from .views import getHomeView

urlpatterns = [
    distill_path('', getHomeView, name='index', distill_file='index.html'),
]
