# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-25 07:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='status',
            field=models.IntegerField(default=2, verbose_name='店铺状态'),
        ),
    ]
