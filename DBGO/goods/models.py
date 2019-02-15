from django.db import models


# Create your models here.


from stores.models import Store


# 商品种类
class GoodsType(models.Model):
    id = models.AutoField(primary_key=True)
    # 商品种类名称
    type_name = models.CharField(max_length=255, unique=True, verbose_name='商品种类名称')
    # 商品类别图片
    goodtype_cover = models.ImageField(upload_to='static/images/goods', default='static/images/goods/default/default.jpg', verbose_name='商品类型图片')
    # 商品介绍
    intro = models.CharField(max_length=255, verbose_name="商品类型描述")

    # 商品父类
    parent = models.ForeignKey('self', null=True, blank=True, verbose_name='品牌父类')



class Goods(models.Model):
    id = models.AutoField(primary_key=True)
    # 商品名称
    good_name = models.CharField(max_length=255, verbose_name='商品名称')
    # 商品单价
    good_price = models.FloatField(verbose_name='商品单价')
    # 商品库存
    good_stack = models.IntegerField(verbose_name='商品库存')
    # 商品销量
    good_count = models.IntegerField(default=0, verbose_name='商品销量')
    # 商品详细介绍
    good_desc = models.CharField(max_length=255, verbose_name='商品详细介绍')
    # 商品的状态 0:隐藏 1:可用
    status = models.IntegerField(default=1, verbose_name='商品状态')
    # 商品品牌
    good_type = models.ForeignKey(GoodsType, on_delete=models.CASCADE)
    # 商品图片
    # covers = models.ImageField(upload_to='static/images/goods', default='static/images/goods/default/default.jpg', verbose_name='商品类型图片')

    store = models.ForeignKey(Store, on_delete=models.CASCADE, verbose_name="商品店铺")
















