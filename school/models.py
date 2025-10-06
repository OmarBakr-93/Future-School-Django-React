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
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    image = models.ImageField(upload_to="teachers/")
    bio = models.TextField(blank=True, null=True)  
    experience = models.PositiveIntegerField(default=0)  
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
      

class Profile(models.Model):
    ROLE_CHOICES = (
        ("visitor", "Visitor"),
        ("student", "Student"),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role =models.CharField(max_length=20, choices=ROLE_CHOICES, default="visitor")

    def __str__(self):

        return f"{self.user.username} - {self.role}" 
      

class Student(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE,null=True, blank=True)
    name = models.CharField(max_length=150)
    subject = models.CharField(max_length=100)
    grade_level = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Subject(models.Model) :
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    subject = models.ForeignKey(Subject,  on_delete=models.CASCADE, related_name="grades", null=True, blank=True)
    marks = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.profile.user.username}  - {self.mark}"
      

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
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name}  - {self.program.title}"
      
class Testimonials(models.Model):
    user = models.ForeignKey(FeedbackUser, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.TextField(max_length=500)
    rating = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} ({self.rating})"
      
