from django.conf.urls import include, url
from django.contrib import admin
import willdoneproject
urlpatterns = [
    # Examples:
    # url(r'^$', 'prework.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('willdoneproject.url')),
]
