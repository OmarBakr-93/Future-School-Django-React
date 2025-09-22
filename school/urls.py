from django.urls import path, include
from .views import ProgramViewSet, EventViewSet, ReviewViewSet, TeacherViewSet, StudentViewSet, GradeViewSet, TestimonialsViewSet, FeedbackUserViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register('programs', ProgramViewSet, basename='program')
router.register('events', EventViewSet, basename='event')
router.register('teachers', TeacherViewSet, basename='teacher')
router.register('students', StudentViewSet, basename='student')
router.register('grades', GradeViewSet, basename='grade')
router.register('reviews', ReviewViewSet, basename='review')
router.register('testimonials', TestimonialsViewSet, basename='testimonials')
router.register('feedback-users', FeedbackUserViewSet, basename='feedbackuser')



urlpatterns = [
    path('', include(router.urls)),
]
