# RS School REST service

to run - npm i => docker-compose up  :)

tests : 

express 

Summary report @ 08:04:06(+0300) 2021-07-12
  Scenarios launched:  182
  Scenarios completed: 182
  Requests completed:  1092
  Mean response/sec: 33.63
  Response time (msec):
    min: 17
    max: 2386
    median: 1017
    p95: 1754.8
    p99: 2020
  Scenario counts:
    Users test: 182 (100%)
  Codes:
    200: 728
    201: 364

Log file: test.express.json

fastify:

All virtual users finished
Summary report @ 08:06:36(+0300) 2021-07-12
  Scenarios launched:  190
  Scenarios completed: 190
  Requests completed:  1140
  Mean response/sec: 34.59
  Response time (msec):
    min: 14
    max: 2471
    median: 949.5
    p95: 1768.5
    p99: 2073.4
  Scenario counts:
    Users test: 190 (100%)
  Codes:
    200: 760
    201: 380

Log file: test.fastify.json