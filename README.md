# How to work with it?

1. Connect to your VPS server with connected domain name
1. Install docker and docker compose v2
1. Install nginx
1. Start nginx
1. Install certbot and get ssl certificate
1. Stop nginx
1. Copy this repo to _srv/www/your_project_name_
1. In your project directory type: `docker compose up --build -d`
1. In _ect/cron.d/certbot_ add this script (for autoupdate SSL sertificate):
```
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
0 */12 * * * root certbot -q renew --nginx
```
