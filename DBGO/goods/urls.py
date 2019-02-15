from django.conf.urls import url
# from django.conf import settings


from . import views
urlpatterns = [
    url(r'add_good/(\d+)/$', views.add_good, name='add_good'),
    url(r'del_good/(\d+)/$', views.del_good, name='del_good'),
    url(r'update_good/(\d+)/$', views.update_good, name='update_good'),
    url(r'lower_good/(\d+)/$', views.lower_good, name='lower_good'),
    url(r'good_show/(\d+)/$', views.good_show, name='good_show'),
    url(r'shop_good/(\d+)/(\d+)/$', views.shop_good, name='shop_good'),
    url(r'all_goods/$', views.all_goods, name='all_goods'),
]