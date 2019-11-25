from django.shortcuts import render
from rest_framework.views import APIView
from .models import do_project,prioritys
from .serliazer import d_project,getprority
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
#获取所有优先级
class  getpriorty(APIView):
    def post(self):
        ser=prioritys.objects.all()
        ser=getpriorty(data=ser)
        return Response(ser.data)



class modelview(ModelViewSet):
    queryset = do_project.objects.all()
    serializer_class = d_project
    pagination_class = PageNumberPagination
    def retrieveall(self,request,*args):

        ser=self.get_queryset()
        print(ser)
        if ser==[]:
            return Response([])
        # pa=page.paginate_queryset(ser,request,view=self)
        ser=self.get_serializer(instance=ser,many=True)
        return Response(ser.data)



class  addproject(APIView):
    def post(self,request):
        if request.data:
            ser=d_project(data=request.data)
            if ser.is_valid():
                ser.save()
                return Response(({'code':200},'添加成功'))
            else:
                return Response(({'status': 'erro'}, '数据格式错误'))
        else:
            return Response(({'status': 'erro'}, '数据无效'))



    pass

class  deleteproject(APIView):
    def post(self,request):
        if request.data:
            if request.data.get('id',None):
                ser=do_project.objects.filter(id=request.data['id']).first()
                ser.delete()
                return Response(({'code': 200}, '删除成功'))
            else:
                return Response(({'status': 'erro'}, '缺少id字段'))
        else:
            return Response(({'status': 'erro'}, '请求无效'))

    pass


class  updataproject(APIView):

    def post(self,request):
        print(request.data,"two:")
        if request.data:
            if request.data.get('id',None):
                ser=do_project.objects.filter(id=request.data['id']).first()
                ser2=d_project(ser,data=request.data)
                if ser2.is_valid():

                    # ser.isdone=request.data.get('isdone',None)
                    ser2.save()
                    return Response(({'code': 200}, '更新成功'))
            else:
                return Response(({'status': 'erro'}, '缺少id字段'))
        else:
            return Response(({'status': 'erro'}, '请求无效'))
    pass


# class  updataproject(APIView):
#
#     def post(self,request):
#         if request.data:
#             if request.data.get('id',None):
#                 ser=do_project.objects.filter(id=request.data['id']).first()
#                 if request.data.get('isdone',None):
#                     ser.isdone=request.data.get('isdone',None)
#                     ser.save()
#                 return Response(({'code': 200}, '更新成功'))
#             else:
#                 return Response(({'status': 'erro'}, '缺少id字段'))
#         else:
#             return Response(({'status': 'erro'}, '请求无效'))
#     pass


class  markproject(APIView):

    def post(self, request):
        if request.data:
            if request.data.get('id', None):
                ser = do_project.objects.filter(id=request.data['id']).first()
                if request.data.get('isdone', None):
                    ser.isdone = request.data.get('isdone', None)
                if request.data.get('content', None):
                    ser.content = request.data.get('isdone', None)

                ser.save()
                return Response(({'code': 200}, '更新成功'))
            else:
                return Response(({'status': 'erro'}, '缺少id字段'))
        else:
            return Response(({'status': 'erro'}, '请求无效'))

    pass
    pass


class  listproject(APIView):


    def get(self,request):
        # page = PageNumberPagination()
        ser=do_project.objects.all()
        print(ser)
        if ser==[]:
            return Response([])
        # pa=page.paginate_queryset(ser,request,view=self)
        ser=d_project(instance=ser,many=True)
        return Response(ser.data)


    def  post(self,request):
        if request.data.get('priority',None):
            page = PageNumberPagination()
            ser = do_project.objects.all().order_by(request.data['prioity'])
            pa = page.paginate_queryset(ser, request, view=self)
            ser=d_project(instance=pa)
            return  Response(ser.data)


    pass


# class  addproject(APIView):
#     pass

# Create your views here.
