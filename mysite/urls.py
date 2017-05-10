"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from books.models import Book, Author, Genre

from rest_framework import routers, viewsets
from rest_framework_json_api import serializers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class AuthorsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ('name', 'books')
        read_only_fields = ('books',)

    included_serializers = {
        'books': 'mysite.urls.BooksSerializer'
    }

class BooksSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('author', 'genre', 'title', 'pub_date')

    included_serializers = {
        'author': 'mysite.urls.AuthorsSerializer',
        'genre': 'mysite.urls.GenresSerializer'
    }


class GenresSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genre
        fields = ('name', 'books')

    included_serializers = {
        'books': 'mysite.urls.BooksSerializer'
    }

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorsSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BooksSerializer


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenresSerializer

router = routers.DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'genres', GenreViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth-token', obtain_auth_token),
    url(r'^books/', include('books.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
]
