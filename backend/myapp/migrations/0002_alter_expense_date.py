# Generated by Django 5.0.6 on 2024-06-09 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
