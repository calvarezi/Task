from django.urls import path
from .views import TaskViewSet
from . import views


urlpatterns = [
    path('taskss/', TaskViewSet.as_view({'get': 'list'}), name='task-list'),
    path('tasks/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve'}), name='task-detail'),
] 