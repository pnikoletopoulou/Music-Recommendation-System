from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import VibeViewSet, predict_vibe
from .views import register_user
from .views import login_user

router = DefaultRouter()
router.register(r'vibes', VibeViewSet, basename='vibes')

urlpatterns = [
    path('', include(router.urls)),
    path('predict/', predict_vibe),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('vibe/', VibeViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('register/', register_user),
    path('login/', login_user),
]