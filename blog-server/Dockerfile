FROM ubuntu

RUN apt-get update -y
RUN apt-get install -y python3.7 && apt-get install -y python3-pip

COPY ./* /usr/blog-server

WORKDIR /usr/blog-server

RUN pip3 install -r requirements.txt

ENTRYPOINT ["python"]

CMD ["app.py"]
