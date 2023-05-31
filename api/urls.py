from django.urls import path, include
from .views import TaskViewSet
from . import views
from api.views import TaskViewSet
from rest_framework import routers



router = routers.DefaultRouter()
router.register('tasks', TaskViewSet)


urlpatterns = router.urls



# [
#     path('', include(router.urls)),
#     path('tasks/', TaskViewSet.as_view({'get': 'list'}), name='task-list'),
#     path('tasks/<int:pk>/',TaskViewSet.as_view({'get': 'retrieve'}), name='task-detail'),
# ]
