

# Create your models here.
from django.contrib.auth.models import User
from django.db import models


class Store(models.Model):
    id = models.AutoField(primary_key=True)
    # 商店名称
    name = models.CharField(max_length=50, verbose_name="店铺名称")
    # 店铺图片
    cover = models.ImageField(upload_to="static/images/store_img/", default='static/images/store_img/default/default.jpg')
    # 店铺介绍
    intro = models.CharField(max_length=255, verbose_name="店铺介绍")
    # 店铺状态 0:关闭 1:正常营业 2:休息
    status = models.IntegerField(default=2, verbose_name="店铺状态")
    # 店铺添加时间
    add_time = models.DateTimeField(auto_now_add=True, verbose_name="店铺添加时间")

    # 店铺所属用户
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="店铺店长")



