from django.db import transaction
from django.http import HttpResponse
from django.shortcuts import render, redirect


from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import login_required


from goods import models
from goods.models import GoodsType
from shopsite.models import ShopCart

# Create your views here.

# 商品品牌的添加
@login_required
@transaction.atomic
def add_goods_type(request):
    """
    添加商品的品牌
    :param request:
    :return:
    """
    if request.method == 'GET':
        return render(request, 'goods/add_goods_type', {'msg': '请在下方完善商品品牌信息'})
    if request.method == "POST":
        goodstype_name = request.POST['goodstype_name']
        goodstype_intro = request.POST['goodstype_intro']
        goodstype_cover = request.FILE.get('goodstype_cover')
        goodstype_parent = request.POST.get('parent', '')
        goods_type = models.GoodsType(type_name=goodstype_name, cover=goodstype_cover, intro=goodstype_intro, parent=goodstype_parent)
        goods_type.save()
        # return render(request, 'stores/index.html')
        return redirect('/stores/index/0/')


# 商品添加
@login_required
@transaction.atomic
def add_good(request, store_id):
    """
    商品的添加函数
    :param request:
    :return:
    """
    store = models.Store.objects.get(id=store_id)
    if request.method == "GET":
        return render(request, 'goods/add_good1.html', {'msg': '添加你想要售卖的商品吧', 'store': store})
    if request.method == "POST":
        good_name = request.POST['good_name']
        good_price = request.POST['good_price']
        good_stack = request.POST['good_stack']
        good_desc = request.POST['good_desc']
        type_name = request.POST['type_name']
        print(type_name)
        good_type = GoodsType.objects.get(type_name=type_name)
        print('1')
        good = models.Goods(good_name=good_name, good_price=good_price, good_stack=good_stack, good_desc=good_desc, good_type=good_type)
        print('2')
        good.store = store
        good.save()
        # goods = models.Goods.objects.filter(store=store)
        # if goods:
        #     request.session['goods'] = goods
        # return render(request, 'stores/index1.html', {'store': store})
        return redirect('/stores/index/0/')

# 商品的修改
@login_required
@transaction.atomic
def update_good(request, good_id):
    """
    修改商品信息函数
    :param request:
    :return:
    """
    good = models.Goods.objects.get(id=good_id)
    if request.method == "GET":
        return render(request, 'goods/update_good.html', {'good': good})
    if request.method == "POST":
        good_name = request.POST['good_name']
        good_price = request.POST['good_price']
        good_stack = request.POST['good_stack']
        good_desc = request.POST['good_desc']
        type_name = request.POST['type_name']
        print("type_name : "+type_name)
        good_type = models.GoodsType.objects.get(type_name=type_name)
        # print('good_type:'+str(good_type))
        # print('good.good_type'+str(good.good_type))
        good.good_name = good_name
        good.good_price = good_price
        good.good_stack = good_stack
        good.good_desc = good_desc
        good.good_type = good_type
        good.save()
        goods = models.Goods.objects.filter(store=good.store)
        request.session['goods'] = goods
        # return render(request, 'stores/index1.html', {'store': good.store})
        return redirect('/stores/index/0/')

# 商品的隐藏
@login_required
@transaction.atomic
def lower_good(request, good_id):
    """
    商品售空，商家删除商品---等于展示的隐藏
    :param request:
    :param good_id:
    :return:
    """
    good = models.Goods.objects.get(id=good_id)
    good.status = 0
    good.save()
    goods = models.Goods.objects.filter(store=good.store)
    request.session['goods'] = goods
    # return render(request, 'stores/index1.html', {'store': good.store})
    return redirect('/stores/index/0/')

# 商品的信息
def good_show(request, good_id):
    """
    展示商品信息
    :param request:
    :return:
    """
    try:
        good = models.Goods.objects.get(id=good_id)
    except:
        return redirect('/shopsite/index/')
    return render(request, 'goods/good_show.html', {'good': good})


# 添加购物车
@login_required
@transaction.atomic
def shop_good(request, count, good_id):
    """
    添加商品到购物车
    :param request:
    :return:
    """
    good = models.Goods.objects.get(id=good_id)
    print("good.good_stack---"+str(type(good.good_stack)))
    print("good.good_count---"+str(type(good.good_count)))
    good.good_stack -= int(count)
    good.good_count += int(count)
    good.save()
    print(2)
    print("good.good_stack---"+str(good.good_stack))
    print("good.good_count---"+str(good.good_count))
    subtotal = float(count) * good.good_price
    # print(len(ShopCart.objects.filter(user=request.user)))
    shopcarts = ShopCart.objects.filter(user=request.user)
    if shopcarts:
        for shopcart in shopcarts:
            if shopcart.good == good:
                shopcart.count += int(count)
                shopcart.subtotal = shopcart.count * good.good_price
                shopcart.save()
                # return render(request, "goods/good_show.html", {"good": good})
                return redirect('/goods/good_show/'+str(good.id)+'/')
    shopcart = ShopCart(subtotal=subtotal, good=good, user=request.user, count=count)
    shopcart.save()
    print('购物车添加成功')
    # return render(request, "goods/good_show.html", {"good": good})
    return redirect("/goods/good_show/"+str(good.id)+'/')


# 商品的删除
@login_required
@transaction.atomic
def del_good(request, good_id):
    """
    删除商品-彻底删除
    :param request:
    :return:
    """
    good = models.Goods.objects.get(id=good_id)
    try:
        good.delete()
        goods = models.Goods.objects.filter(store=good.store)
        request.session['goods'] = goods
    except Exception as e:
        print(e)
    # return render(request, 'stores/index.html', {'store': good.store})
    return redirect('/stores/index/0/')


# 所有商品展示
@require_GET
def all_goods(request):
    """
    展示所有售卖的商品
    :param request:
    :return:
    """
    goods = models.Goods.objects.all()
    goods = goods.exclude(store__id=0)
    goods = goods.exclude(status=0)
    page_now = request.GET.get('page_now', 1)
    page_size = request.GET.get('page_size', 10)
    return render(request, 'goods/all_goods.html', {'goods': goods})
