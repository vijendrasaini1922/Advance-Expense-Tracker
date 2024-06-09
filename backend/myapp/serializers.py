from .models import Expense
from rest_framework import serializers
from django.forms import forms


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'name', 'cost', 'category', 'date']
        
        