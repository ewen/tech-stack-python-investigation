import datetime

from django.db import models
from django.utils import timezone

class Author(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.title

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=100)
