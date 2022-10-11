from django.urls import path
from django_distill import distill_path

from .views import getAboutView

urlpatterns = [
    distill_path('', getAboutView, name='aboutus', distill_file='aboutus.html'),
]
