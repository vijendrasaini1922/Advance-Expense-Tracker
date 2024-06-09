# utils.py

from django.forms import model_to_dict

def serialize_form(form):
    form_data = {}
    for field_name, field in form.fields.items():
        form_data[field_name] = {
            'type': field.widget.__class__.__name__,
            'label': field.label,
            'required': field.required,
            'initial': form.initial.get(field_name),
            'choices': getattr(field.widget, 'choices', None)
        }
    return form_data
