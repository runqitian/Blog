FROM ubuntu

RUN apt-get update -y
RUN apt-get install -y python3.7 && apt-get install -y python3-pip
RUN apt-get install -y netcat

COPY . /opt/blog-server/

WORKDIR /opt/blog-server

RUN pip3 install -r requirements.txt

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

ENV FLASK_APP=/opt/blog-server/app.py

ENTRYPOINT ["./ready_check.sh"]

