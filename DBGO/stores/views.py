import os

from django.db import transaction
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.
# 开店
from goods.models import Goods
from . import models


# 首页
def index(request, store_id):
    """
    店铺首页展示
    :param request:
    :return:
    """
    if store_id == '0':
        stores = models.Store.objects.filter(user=request.user).order_by('-add_time')
        if stores:
            store = stores.first()
        else:
            return redirect('/stores/add_store/')
    else:
        store = models.Store.objects.get(id=store_id)
    goods = Goods.objects.filter(store=store)
    goods = goods.exclude(status=0)
    request.session['goods'] = goods
    request.session['store'] = store
    return render(request, 'stores/index1.html', {'store': store})


# 首页
@login_required
@transaction.atomic
def add_store(request):
    """
    创建店铺
    :param request:
    :return:
    """
    stores = models.Store.objects.filter(user=request.user).order_by('-add_time')
    if stores:
        if stores.first().status != 0:
            return redirect('/stores/index/0/')
    if request.method == "GET":
        return render(request, 'stores/add_store.html', {'msg': '请填写以下数据'})
    if request.method == "POST":
        name = request.POST['name']
        intro = request.POST['intro']
        user = request.user
        store = models.Store(name=name, intro=intro, user=user)
        cover = request.FILES.get('cover', False)
        if cover:
            store.cover = cover
        store.save()
        # return render(request, 'stores/index1.html', {'store': store})
        return redirect('/stores/index/0/')


# 删除店铺
@login_required
@transaction.atomic
def del_store(request, store_id):
    """
    删除店铺
    :param request:
    :return:
    """
    store = models.Store.objects.get(id=store_id)
    store.status = 0
    store.save()
    return redirect('/shopsite/index/')


# 修改店铺
@login_required
@transaction.atomic
def update_store(request, store_id):
    """
    修改店铺的信息
    :param request:
    :param store_id:
    :return:
    """
    if request.method == 'GET':
        store = models.Store.objects.get(id=store_id)
        return render(request, 'stores/update_store1.html', {'store': store})
    if request.method == "POST":
        name = request.POST['name']
        intro = request.POST['intro']
        user = request.user
        store = models.Store.objects.get(id=store_id)
        store.name = name
        store.intro = intro
        store.user = user
        # cover = request.FILES.get('cover', False)
        # print("cover --"+str(cover))
        # if cover:
        #     old_cover = store.cover
        #     store.cover = cover
        #     os.remove(old_cover)
        store.save()
        # return render(request, 'stores/index1.html', {'msg': "店铺信息修改成功", 'store': store})
        return redirect('/stores/index/0/')

# 店铺营业
@login_required
@transaction.atomic
def open_store(request, store_id):
    """
    店铺开始营业
    :param request:
    :return:
    """
    store = models.Store.objects.get(id=store_id)
    store.status = 1
    store.save()
    # return render(request, 'stores/index1.html', {'msg': '店铺开始营业了', 'store': store})
    return redirect('/stores/index/0/')

# 店铺歇业
@login_required
@transaction.atomic
def close_store(request, store_id):
    """
    店铺展示歇业
    :param request:
    :param store_id:
    :return:
    """
    store = models.Store.objects.get(id=store_id)
    store.status = 2
    store.save()
    # return render(request, 'stores/index1.html', {'msg': '店铺暂时歇业了', 'store': store})
    return redirect('/stores/index/0/')


# 更换店铺封面
@login_required
@transaction.atomic
def update_cover(request, store_id):
    """
    更换店铺封面
    :param request:
    :param store_id:
    :return:
    """
    store = models.Store.objects.get(id=store_id)
    old_cover = str(store.cover)
    cover = request.FILES.get("cover", False)

    if cover:
        store.cover = cover
    store.save()
    if old_cover[-11:] != 'default.jpg':
        try:
            os.remove(old_cover)
        except Exception as e:
            print(e)
    # return render(request, 'stores/index1.html', {'store': store})
    return redirect('/stores/index/0/')
