from django.db import models
from django.contrib.auth.models import User


# Create your models here.
from goods.models import Goods


class NormalUser(models.Model):
    # 用户ID
    id = models.AutoField(primary_key=True)
    # 用户昵称
    nickname = models.CharField(max_length=255, unique=True, verbose_name="用户昵称")
    # 用户年龄
    age = models.IntegerField(default=0, verbose_name="用户年龄")
    # 用户性别
    gender = models.CharField(max_length=5, blank=True, null=True, verbose_name="用户性别")
    # 用户头像
    header = models.ImageField(upload_to='static/images/headers',
                               default='static/images/headers/default/default.jpg',
                               verbose_name='用户头像')
    # 联系方式
    phone = models.CharField(max_length=30, blank=True, verbose_name='用户联系方式')
    # 用户邮箱
    email = models.CharField(max_length=50, blank=True, verbose_name='用户邮箱')
    # 出生日期
    birthday = models.DateTimeField(null=True, blank=True, verbose_name="出生日期")
    # 用户状态  0:隐藏用户 1:正常用户 2:使用手机号登陆的用户，没有用户名
    status = models.CharField(max_length=10, default=1, verbose_name="用户状态")

    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Address(models.Model):
    id = models.AutoField(primary_key=True)
    # 收货人姓名
    recv_name = models.CharField(max_length=255, verbose_name='收货人')
    # 收货人联系方式
    recv_phone = models.IntegerField(verbose_name="收货人联系方式")
    # 国家
    native = models.CharField(max_length=50, verbose_name="国家")
    # 省份
    provice = models.CharField(max_length=50, verbose_name="省份")
    # 市区
    city = models.CharField(max_length=50, verbose_name="市区")
    # 县区
    country = models.CharField(max_length=50, verbose_name="县区")
    # 街道
    street = models.CharField(max_length=255, verbose_name="街道")
    # 详细介绍
    desc = models.CharField(max_length=255, verbose_name="详细描述")
    # 是否是默认地址
    status = models.BooleanField(default=False, verbose_name="是否默认地址")

    # 属于谁的地址
    user = models.ForeignKey(User, on_delete=models.CASCADE)


# 购物车
class ShopCart(models.Model):
    id = models.AutoField(primary_key=True)
    # 购买数量
    count = models.IntegerField(default=0, verbose_name='购买数量')
    # 小计金额
    subtotal = models.FloatField(default=0, verbose_name="小计价格")
    # 添加时间
    add_time = models.DateTimeField(null=True, blank=True, verbose_name="添加时间")

    # 一对一用户外键
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # 购物车外键
    good = models.ForeignKey(Goods, verbose_name="购物车商品")

    class Meta:
        ordering = ["-add_time"]
