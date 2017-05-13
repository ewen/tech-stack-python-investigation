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
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render
from django.conf import settings
from django.contrib.staticfiles import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from urllib.request import urlopen
from django.http import HttpResponse
from url_filter.integrations.drf import DjangoFilterBackend



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
    # http://django-url-filter.readthedocs.io/en/latest/usage.html#django-rest-framework
    # Docs seem to indicate if the setting is made in the settings.py file then we shouldn't need this, but I couldn't
    # get that to work
    filter_backends = [DjangoFilterBackend]
    filter_fields=['name']


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
    url(r'^api/api-auth/', include('rest_framework.urls')),
    url(r'^api/api-auth-token', obtain_auth_token),
    url(r'^api/', include(router.urls)),
    url(r'^books/', include('books.urls')),
    url(r'^admin/', admin.site.urls),
]

def proxy_live_reload(request):
    url = "http://localhost:4200/ember-cli-live-reload.js"
    response = urlopen(url)
    return HttpResponse(response.read())

if settings.DEBUG:
    urlpatterns += [
        url(r'^assets/(?P<path>.*)$', views.serve),
        url(r'^ember-cli-live-reload.js$', proxy_live_reload),
    ]

def ember (request):
    return render(request, 'index.html', {})

# Serve up Ember
urlpatterns.append(url(r'^', ember))
