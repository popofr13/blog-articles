### Deploy

```bash
bin/console cache:clear --env=prod
bin/console cache:warmup --env=prod
serverless deploy --stage prod
```