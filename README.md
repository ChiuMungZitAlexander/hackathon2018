# Prerequisites

node: ^10.13
yarn: ^1.12

# Installation

install the app on your phone: expo client

```bash
yarn global add expo-cli react-devtools
```

```bash
~ hackathon-api > yarn
~ hackathon-app > yarn
```

# Environment variables

hackathon-api

```bash
DEBUG=hackathon-api:*
```

hackathon-app

```bash
# .env
# API_HOST=<LAN-IP>:3000
echo API_HOST=$(ipconfig getifaddr en0):3000 > .env
```

# Dev Run

hackathon-api

```bash
yarn dev
```

hackathon-app

```bash
yarn start
```

use expo client to scan QR code to get the hackathon-app on your phone

## Debug

start the standalone react-devtools

```bash
react-devtools
```

turn on debug in expo client on your phone
