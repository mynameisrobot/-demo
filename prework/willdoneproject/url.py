from django.conf.urls import include, url
from .views import listproject,addproject,updataproject,deleteproject
urlpatterns=[
    url('gettask/',listproject.as_view()),
    url('add/',addproject.as_view()),
    url('updata/',updataproject.as_view()),
    url('delete/',deleteproject.as_view())
]