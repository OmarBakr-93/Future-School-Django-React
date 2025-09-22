from rest_framework import serializers

from .models import Program, Review, Teacher, Student, Event, Grade, Testimonials, FeedbackUser


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
        
        
class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'user', 'grade_level', 'marks']
        
class StudentSerializer(serializers.ModelSerializer):
    grades = GradeSerializer(many=True, read_only=True)
    class Meta:
        model = Student
        fields = '__all__'
        
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        

class ProgramSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all(), source='teacher', write_only=True)
    class Meta:
        model = Program
        fields = '__all__'
        
        
class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
        
        
class TestimonialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonials
        field = '__all__'
        
        
class FeedbackUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackUser
        fields = '__all__'