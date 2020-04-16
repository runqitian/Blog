#!/bin/bash
while ! nc -z blog_db 3306; do sleep 3; done
python3 /opt/blog-server/app.py
