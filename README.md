# tech-stack-python-investigation

## Installation

```
docker run -e POSTGRES_USER="books" -e POSTGRES_PASSWORD="books" -e POSTGRES_DB="books" -p 54321:5432 -d postgres
pip3 install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
