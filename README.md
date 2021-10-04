# jingisukan_cli
Cli that manage chat plugin docker container

## How to install

```
npm run inst
```

### How to run

```bash
stories2@gimhyeon-uui-MacBookPro jingisukan_cli % jingisukan --help
Usage: jingisukan <command> [options]

명령:
  jingisukan env         Create .env file
  jingisukan ecosystem   Create ecosystem.config file
  jingisukan dockerfile  Create dockerfile file
  jingisukan new         Create docker-compose.yaml with param
  jingisukan service     Control docker container status using docker-compose
  jingisukan status      Get status of container
  jingisukan rmi         Remove docker image
  jingisukan prune       Docker prune

옵션:
  --help     도움말을 보여줍니다                                          [여부]
  --version  버전 넘버를 보여줍니다                                       [여부]
stories2@gimhyeon-uui-MacBookPro jingisukan_cli % 
```

- Generate docker-compose.yaml

```
jingisukan new --cpu=0.1 --ram=128M --name=asdfasdf --port=10000 --path='.'

new {
  _: [ 'new' ],
  cpu: '0.1',
  ram: '128M',
  name: 'asdfasdf',
  port: '10000',
  path: '.',
  env: false,
  '$0': 'jingisukan'
}
[docker] [exportDockerComposeYAML] done
```

- Generate dockerfile

```
jingisukan dockerfile --url=https://github.com/KangnamUnivShuttle/plugin_hello_world.git --name=asdfasdf --path=.

dockerfile {
  _: [ 'dockerfile' ],
  url: 'https://github.com/KangnamUnivShuttle/plugin_hello_world.git',
  name: 'asdfasdf',
  path: '.',
  '$0': 'jingisukan'
}
[docker] [exportDockerFile] done
```

- Start container

```
jingisukan service --name=asdfasdf --path=. --status=start

service {
  _: [ 'service' ],
  name: 'asdfasdf',
  path: '.',
  status: 'start',
  '$0': 'jingisukan'
}
Container asdfasdf  Creating
Container asdfasdf  Created
Container asdfasdf  Starting
Container asdfasdf  Started
```

- Remove container

```
jingisukan service --name=asdfasdf --path=. --status=remove

service {
  _: [ 'service' ],
  name: 'asdfasdf',
  path: '.',
  status: 'remove',
  '$0': 'jingisukan'
}
Container asdfasdf  Removing
Container asdfasdf  Removed
```

- Stop container

```
jingisukan service --name=asdfasdf --path=. --status=stop 

service {
  _: [ 'service' ],
  name: 'asdfasdf',
  path: '.',
  status: 'stop',
  '$0': 'jingisukan'
}
Container asdfasdf  Stopping
Container asdfasdf  Stopped
```

- Generate ecosystem config file

```
jingisukan ecosystem --name=asdfasdf --path=.

ecosystem { _: [ 'ecosystem' ], name: 'asdfasdf', path: '.', '$0': 'jingisukan' }
[pm2] [exportEcosystemConfig] done
```

- Get status name of container

```
jingisukan status --name=asdfasdf

service { _: [ 'status' ], name: 'asdfasdf', '$0': 'jingisukan' }
CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS          PORTS                     NAMES
a12fb12df1d5   asdfasdf   "docker-entrypoint.s…"   22 seconds ago   Up 21 seconds   0.0.0.0:10000->3000/tcp   asdfasdf
```

- Prune system

```
jingisukan prune

prune { _: [ 'prune' ], '$0': 'jingisukan' }
Deleted Containers:
8335eb27f8eb7941730dc55b7370a43406c73c6f3e85c175896da573d2cbd668

Deleted Networks:
tensor_study_default

Deleted Images:
deleted: sha256:561fb67a438f5b596fb57c533ab0355ec10bf0956a974a9a2f604bf32894bd43
...
deleted: sha256:9868de7068433a89f8113067229772bde764cb13660f87cd361f8c14c40f7699

Deleted build cache objects:
l9eq2zo4dnxzei648412q1z5m
...
7i0t5liz2v7hkc3u8jst2tcil

Total reclaimed space: 558.8MB
```

- Remove image

```
jingisukan rmi --name=asdfasdf          

rmi { _: [ 'rmi' ], name: 'asdfasdf', '$0': 'jingisukan' }
Untagged: asdfasdf:latest
Deleted: sha256:c98e80742775c0bf9dd9bd0290093b061ab3be860774e2bc5b575f72e6842bb4
```

### TIP

https://stackoverflow.com/questions/39468841/is-it-possible-to-start-a-stopped-container-from-another-container