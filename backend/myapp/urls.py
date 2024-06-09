from django.urls import path, include
from .views import ExpenseViewSet, expense_form_view, expense_form_submit, total_expense, top_three_dates_last_30_days
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('expense-form/', expense_form_view, name='expense_form'),
    path('expense-form-submit/', expense_form_submit, name='expense_form_submit'),
    path('total-expense/', total_expense, name='total_expense'),
    path('top-three-dates/', top_three_dates_last_30_days, name="top-three-dates")

]
