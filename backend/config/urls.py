from django.contrib import admin
from django.urls import path, include
from api.views import register_user, login_user, predict_vibe, VibeViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register_user),
    path('api/login/', login_user),
    path('api/predict/', predict_vibe),
    path('vibe/', VibeViewSet.as_view({'get': 'list', 'post': 'create'})),
]
