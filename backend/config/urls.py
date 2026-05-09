from django.contrib import admin
from django.urls import path, include
from api.views import register_user, login_user, predict_vibe, VibeViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user),
    path('login/', login_user),
    path('predict/', predict_vibe),
    
    path('', include('api.urls')), 
    
    path('vibe/', VibeViewSet.as_view({'get': 'list', 'post': 'create'})),
]