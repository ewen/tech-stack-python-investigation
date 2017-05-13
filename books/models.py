import datetime

from django.db import models
from django.utils import timezone

class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Genre(BaseModel):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Author(BaseModel):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Book(BaseModel):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.title

    @property
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=100)
