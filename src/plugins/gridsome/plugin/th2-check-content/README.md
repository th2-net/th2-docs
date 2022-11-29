# Check content plugin

Plugin checks content for forbidden words or collocations and drop build process if some exists.

## Requirements

Environment variables with words or collocations listed through ",".

```
FORBIDDEN=badword1, badword2
FORBIDDEN_SECRET=badword1, badword2
FORBIDDEN_DOMAINS=bad.domain1.com, bad.domain2.com
```