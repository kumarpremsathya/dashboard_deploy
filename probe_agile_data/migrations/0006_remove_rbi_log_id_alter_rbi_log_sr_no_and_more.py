# Generated by Django 4.2.7 on 2024-01-06 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('probe_agile_data', '0005_rbi_log'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rbi_log',
            name='id',
        ),
        migrations.AlterField(
            model_name='rbi_log',
            name='Sr_no',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rbi_log',
            name='date_of_scraping',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]