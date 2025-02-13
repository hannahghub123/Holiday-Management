from django.urls import path
from .views import get_holidays

urlpatterns = [
    path('api/holidays/', get_holidays, name='get_holidays'),
]
