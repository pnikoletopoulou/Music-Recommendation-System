from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VibeViewSet, predict_vibe
from .views import register_user
from .views import login_user

router = DefaultRouter()
router.register('vibes', VibeViewSet, basename='vibes')

urlpatterns = [
    path('', include(router.urls)),
    path('predict/', predict_vibe),
    path('vibe/', VibeViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('register/', register_user),
    path('login/', login_user),
]