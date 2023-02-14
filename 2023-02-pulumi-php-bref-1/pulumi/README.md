### Useful commands

Add a Symfony env vars : 

```bash
pulumi config set --path 'symfony["APP_BASE_URL"]' https://localhost:5173
pulumi config set --path 'symfony["SEGMENT_KEY"]' somesecret --secret
```

