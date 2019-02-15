from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^index/$', views.index, name='index'),
    url(r'^user_login/$', views.user_login, name='user_login'),
    url(r'^user_logout/$', views.user_logout, name='user_logout'),
    url(r'^user_register/$', views.user_register, name='user_register'),
    url(r'^user_self', views.user_self, name='user_self'),
    url(r'^update_user_self', views.update_user_self, name='update_user_self'),
    url(r'^update_user_header', views.update_user_header, name='update_user_header'),
    url(r'^update_user_password', views.update_user_password, name='update_user_password'),
    url(r'^goods_car/$', views.goods_car, name='goods_car'),
    url(r'^cancel_buy/(\d+)/$', views.cancel_buy, name='cancel_buy'),
    url(r'^send_msg/(\d+)/$', views.send_msg, name='send_msg'),
    # url(r'^add_address/(\d+)/$', views.add_address, name='add_address'),
    # url(r'^address_list/(\d+)/$', views.address_list, name='address_list'),
    url(r'^phone_login/$', views.phone_login, name='phone_login'),




    url(r'^code/$', views.code, name='code'),
    url(r'^$', views.index)
]
