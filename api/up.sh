#!/bin/bash
docker-compose stop
docker-compose rm -vf
docker-compose up -d --build
