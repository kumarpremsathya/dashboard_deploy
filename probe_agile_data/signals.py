# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.apps import AppConfig

        
# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.apps import AppConfig
from django.db import models
from .models import rbi_log
from .tasks import update_database_task



class ProbeAgileDataConfig(AppConfig):
    name = 'probe_agile_data'

    def ready(self):
        import probe_agile_data.signals  # noqa
        
        
    

@receiver(post_save, sender=rbi_log)
def update_database(sender, instance, **kwargs):
    # Assuming that source_name is a field in rbi_log model
    source_name = instance.source_name
    status = instance.source_status
    update_database_task.delay(source_name, status)