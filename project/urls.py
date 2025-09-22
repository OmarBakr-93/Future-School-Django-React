
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path(r'jet/', include('jet.urls', 'jet')), 
    path('admin/', admin.site.urls),
    path('', include('school.urls')),
]
