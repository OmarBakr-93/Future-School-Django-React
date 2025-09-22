from django.shortcuts import render
from .models import Program, Event, Teacher, Student, Grade, Testimonials, FeedbackUser
from .serializers import ProgramSerializer, EventSerializer, TeacherSerializer, StudentSerializer, GradeSerializer, TestimonialsSerializer, FeedbackUserSerializer
from rest_framework import viewsets, permissions


# Create your views here.

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    
    
class TestimonialsViewSet(viewsets.ModelViewSet):
    queryset = Testimonials.objects.all().order_by('-created_at')
    serializer_class = TestimonialsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
            serializer.save(user=self.request.user)
    
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [permissions.IsAuthenticated]
    

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Testimonials.objects.all()
    serializer_class = TestimonialsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        
class FeedbackUserViewSet(viewsets.ModelViewSet):
    queryset = FeedbackUser.objects.all()
    serializer_class = FeedbackUserSerializer