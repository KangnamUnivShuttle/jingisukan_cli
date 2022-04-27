import yaml from "write-yaml";
import { exec } from "child_process";
import { generateDockerFileFromArray } from "dockerfile-generator/lib/dockerGenerator.js";
import isGitUrl from "is-git-url";
import { writeFile, createWriteStream, existsSync, unlinkSync } from "fs";

export function exportEnvFile(options) {
  const { name = "TEST", path = ".", data = ["NODE_ENV=production"] } = options;

  // const envWithLineBreak = data.join('\n')

  // console.log('[docker] [exportEnvFile]: ', envWithLineBreak)
  // https://stackoverflow.com/a/33419220/7270469

  const envPath = `${path}/${name}/.env`;
  if (existsSync(envPath)) {
    unlinkSync(envPath);
  }

  const logger = createWriteStream(envPath, {
    flags: "a",
  });
  data.forEach((val) => {
    console.log(`[docker] [exportEnvFile] write: ${val}`);
    logger.write(`${val}\n`);
  });
  logger.end();

  console.log("[docker] [exportEnvFile] done");
}

export function exportDockerFile(options) {
  const { url = "", name = "TEST", path = "." } = options;

  if (!isGitUrl(url) && url.includes("/KangnamUnivShuttle/")) {
    throw new Error("Url must be github url");
  }
  const commands = [
    // {
    //     "from": "node:14.18"
    // },
    {
      ENV: ["TZ", "Asia/Seoul"],
    },
    {
      RUN: [
        "ln",
        "-snf",
        "/usr/share/zoneinfo/$TZ",
        "/etc/localtime",
        "&&",
        "echo",
        "$TZ",
        ">",
        "/etc/timezone",
      ],
    },
    {
      RUN: ["date"],
    },
    {
      run: ["npm", "install", "pm2@5.1.2", "-g"],
    },
    {
      run: ["adduser", "--disabled-password", "-gecos", "", "testuser"],
    },
    {
      user: "testuser",
    },
    {
      working_dir: "/home/testuser/",
    },
    {
      run: ["git", "clone", `${url}`, "./app"],
    },
    {
      working_dir: "/home/testuser/app",
    },
    {
      run: ["npm", "i"],
    },
    {
      copy: {
        "ecosystem.config.js": "/home/testuser/app/ecosystem.config.js",
      },
    },
    // {
    //   "env": {
    //     "env1": "value1",
    //     "env2": "value2"
    //   }
    // },
    {
      expose: [`15000/tcp`],
    },
    {
      cmd: [
        "pm2-runtime",
        "start",
        "ecosystem.config.js",
        "--env",
        "production",
      ],
    },
  ];

  // Because of dockerGenerator opensource error
  const result = `FROM node:14.18
${generateDockerFileFromArray(commands)}`;
  writeFile(`${path}/${name}/Dockerfile`, result, (err) => {
    if (err) {
      console.error(`[docker] [exportDockerFile] error: ${err.message}`);
      return;
    }
    console.log("[docker] [exportDockerFile] done");
  });
}

export function exportDockerComposeYAML(options) {
  const {
    cpu = "0.5",
    ram = "128M",
    name = "TEST",
    // port = '10000',
    path = ".",
    env = true,
  } = options;

  if (!name.match(/^[a-zA-Z]{1}[a-zA-Z0-9_.-]{7,15}$/g)) {
    throw new Error("Unavailable letter inside of name");
  }

  const node_info = {
    image: `${name}`,
    build: `./`,
    container_name: `plugin_node_${name}`,
    restart: "always",
    networks: ["infra_chatbot"],
    // ports: [`${port}:15000`],
    deploy: {
      resources: {
        limits: {
          cpus: cpu,
          memory: ram,
        },
      },
    },
    logging: {
      driver: "json-file",
      options: {
        "max-file": "5",
        "max-size": "10m",
      },
    },
    env_file: env ? [".env"] : [],
  };

  const data = {
    version: "3",
    networks: {
      infra_chatbot: {
        external: true,
      },
    },
    services: {},
  };

  data.services[`plugin_node_${name}`] = node_info;
  yaml(`${path}/${name}/docker-compose.yaml`, data, (err) => {
    if (err) {
      console.error(`[docker] [exportDockerComposeYAML] error: ${err.message}`);
      return;
    }
    console.log("[docker] [exportDockerComposeYAML] done");
  });
}

export function runDockerCompose(options) {
  const { status = "undefined", name = "TEST", path = "." } = options;
  let command = "";
  switch (status) {
    case "start":
      command = `docker-compose --file ${path}/${name}/docker-compose.yaml up -d`;
      break;
    case "stop":
      command = `docker-compose --file ${path}/${name}/docker-compose.yaml stop`;
      break;
    case "remove":
      command = `docker-compose --file ${path}/${name}/docker-compose.yaml rm -f`;
      break;
    case "build":
      command = `docker-compose --file ${path}/${name}/docker-compose.yaml build --no-cache`;
      break;
    default:
      throw new Error(
        `Unexpected status detected, ${status}!=[start|stop|remove]`
      );
  }
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
}

export function checkDockerContainerStatus(name) {
  const command = `docker ps --filter "name=${name}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
}

export function runPrune() {
  const command = `docker system prune -f`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
}

export function removeImage(name) {
  if (!name.match(/^[a-zA-Z]{1}[a-zA-Z0-9_.-]{7,15}$/g)) {
    throw new Error("Unavailable letter inside of name");
  }
  const command = `docker rmi ${name}:latest -f`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
}
