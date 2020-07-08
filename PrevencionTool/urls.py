from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.default_map, name='default'),
    path('local-graph/', views.localGraphs),
    path('local-pie-graph/', views.localPieGraphs),
    path('add-feminicidio/', views.addFeminicidioCase),
    path('search-feminicidio/', views.searchFeminicidioCase),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
