from django.conf.urls import url


from . import views
urlpatterns = [
    url(r'index/(\d+)/$', views.index, name='index'),
    url(r'add_store/$', views.add_store, name='add_store'),
    url(r'del_store/(\d+)/$', views.del_store, name='del_store'),
    url(r'update_store/(\d+)/$', views.update_store, name='update_store'),
    url(r'open_store/(\d+)/$', views.open_store, name='open_store'),
    url(r'close_store/(\d+)/$', views.close_store, name='close_store'),
    url(r'update_cover/(\d+)/$', views.update_cover, name='update_cover'),
]