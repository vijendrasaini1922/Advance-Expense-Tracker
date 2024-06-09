from django.forms import forms, ModelForm
from .models import Expense

class ExpenseForm(ModelForm):
    class Meta:
        model = Expense
        fields = ('name', 'cost', 'category')