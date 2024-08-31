from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('verify/', views.verify_code, name='verify_code'),
    path('success/', views.success, name='success'),
]