from rest_framework import serializers
from .models import Task



class DateTimeFieldTZ(serializers.ReadOnlyField):
    def to_representation(self, value):
        return value.strftime('%d-%m-%Y')

class TaskSerializer(serializers.ModelSerializer):
    created_at = DateTimeFieldTZ()

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('created_at',)