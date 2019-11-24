from  rest_framework.serializers import  ModelSerializer
from  .models import  do_project,prioritys

class getprority(ModelSerializer):


    class Meta:
        model=prioritys
        fields=['id','priority']


class d_project(ModelSerializer):


    class Meta:
        model=do_project
        fields=('id','title','content','startime','endtime','isdone','priority','expire_date')