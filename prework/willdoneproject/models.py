from django.db import models
from django.utils.timezone import now


class prioritys(models.Model):
    id =models.AutoField(primary_key=True)
    priority=models.CharField('优先级',max_length=15)
    def __str__(self):
        return self.priority
    class Meta:
        verbose_name="优先级"
        verbose_name_plural=verbose_name

class do_project(models.Model):
    id =models.AutoField(primary_key=True)
    title=models.CharField('代办标题',max_length=200)
    startime=models.DateTimeField('开始时间',null=True)
    endtime=models.DateTimeField('结束时间',null=True)
    content=models.TextField('代办内容',)
    isdone=models.BooleanField('是否完成',default=False)
    priority=models.ForeignKey(prioritys,verbose_name='优先级',on_delete=models.CASCADE)
    expire_date=models.DateTimeField('过期时间',null=True)

    def __str__(self):
        return self.title
    class Meta:
        verbose_name="代办事项"
        verbose_name_plural=verbose_name






# Create your models here.
