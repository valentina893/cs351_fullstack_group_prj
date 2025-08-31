from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_cta_trains, name="cta-trains"),
]