from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Program(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='program_images/', null=True, blank=True)
    seats = models.IntegerField(default=30)
    lessons = models.IntegerField(default=40)
    hours = models.IntegerField(default=60)
    teacher = models.ForeignKey('Teacher', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
      
      
class Event(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(max_length=1000)
    date = models.DateField()
    time_from = models.TimeField()
    time_to = models.TimeField()
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to='event_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
      

class Teacher(models.Model):
    name = models.CharField(max_length=150)
    subject = models.CharField(max_length=100)
    image = models.ImageField(upload_to='teacher_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
      
class Student(models.Model):
    name = models.CharField(max_length=150)
    subject = models.CharField(max_length=100)
    grade_level = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
      
      
class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    marks = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} - {self.marks}"
      

class FeedbackUser(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
      
class Review(models.Model):
    user = models.ForeignKey(FeedbackUser, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='reviews')
    comment = models.TextField(max_length=500)
    rated_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.program.title}"
      
      
class Testimonials(models.Model):
    user = models.ForeignKey(FeedbackUser, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.TextField(max_length=500)
    rating = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return F"{self.client_name} - {self.rating} stars"
      
      