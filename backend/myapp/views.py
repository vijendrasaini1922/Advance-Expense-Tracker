from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .forms import ExpenseForm
from .models import Expense
from .serializers import ExpenseSerializer
from rest_framework import viewsets
from .utils import serialize_form
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
import datetime
# Create your views here.

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    
    @action(detail=True, methods=['put'])
    def update_expense(self, request, pk=None):
        expense = self.get_object()
        serializer = self.get_serializer(expense, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

    

def expense_form_view():
    form = ExpenseForm()
    form_data = serialize_form(form)
    return JsonResponse(form_data)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Expense
import json

@csrf_exempt
def expense_form_submit(request):
    if request.method == 'POST':
        form_data = json.loads(request.body)
        name = form_data.get('name')
        cost = form_data.get('cost')
        category = form_data.get('category')

        if not name or not cost or not category:
            return JsonResponse({'message': 'Invalid form data'}, status=400)

        # Save the expense data to the Expense model
        expense = Expense.objects.create(name=name, cost=cost, category=category)
        
        # Return a success message
        return JsonResponse({'message': 'Expense saved successfully', 'id': expense.id})
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)



from django.utils import timezone
from datetime import timedelta
from django.db.models.functions import TruncDate
@csrf_exempt
def total_expense(request):
    if request.method == 'GET':
        # Total expense
        total = Expense.objects.aggregate(Sum('cost'))['cost__sum']

        # Expenses for the last 7 days
        last_week = datetime.date.today() - datetime.timedelta(days=7)
        last_7_days = Expense.objects.filter(date__gt=last_week).aggregate(Sum('cost'))['cost__sum']

        # Expenses for the last 30 days
        last_month = datetime.date.today() - datetime.timedelta(days=30)
        last_30_days = Expense.objects.filter(date__gt=last_month).aggregate(Sum('cost'))['cost__sum']

        # Expenses for the last 365 days
        last_year = datetime.date.today() - datetime.timedelta(days=365)
        last_365_days = Expense.objects.filter(date__gt=last_year).aggregate(Sum('cost'))['cost__sum']

        daily_sums = Expense.objects.values('date').order_by('date').annotate(total_expense=Sum('cost'))
        last_30_dates = Expense.objects.order_by('-date').values('date').distinct()[:30]
        last_30_dates_expenses = [
            {
                'date': date['date'].strftime('%Y-%m-%d'),
                'total_expense': Expense.objects.filter(date=date['date']).aggregate(Sum('cost'))['cost__sum']
            }
            for date in last_30_dates
        ]
        categorical_sums = Expense.objects.values('category').order_by('category').annotate(sum=Sum('cost'))

        return JsonResponse({
            'total': total,
            'last_7_days': last_7_days,
            'last_30_days': last_30_days,
            'last_365_days': last_365_days,
            'categorical_sums': list(categorical_sums),
            'last_30_dates_expenses': last_30_dates_expenses
        })  
    else: 
        return JsonResponse({'message': 'Method not allowed'}, status=405)



@csrf_exempt
def top_three_dates_last_30_days(request):
    thirty_days_ago = timezone.now() - timedelta(days=30)
    top_dates = Expense.objects.filter(date__gte=thirty_days_ago).values('date').annotate(total_expense=Sum('cost')).order_by('-total_expense')[:3]
   
    top_dates_with_expenses = []
    for date_data in top_dates:
        expenses = Expense.objects.filter(date=date_data['date'])
        total_expense_for_date = sum(expense.cost for expense in expenses)
        top_dates_with_expenses.append({
            'date': date_data['date'].strftime('%Y-%m-%d'),
            'total_expense': total_expense_for_date
        })
    
    top_dates_with_expenses.sort(key=lambda x: x['total_expense'], reverse=True)
    
    return JsonResponse({'top_dates': top_dates_with_expenses})