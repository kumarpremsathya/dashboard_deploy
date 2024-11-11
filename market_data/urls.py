from django.urls import path
from .views import dashboard,table_details,table_details2,get_data_for_popup, debug_static

urlpatterns = [
    # path('table/', dashboard, name='dashboard'),
    path('<str:url_name>/', table_details, name='table_details'),

    path('', table_details2, name='table_details2'),
    path('get_data_for_popup/<str:table_name>/', get_data_for_popup, name='get_data_for_popup'),
    path('debug_static/', debug_static, name='debug_static'),
    ]