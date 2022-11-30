# Check content plugin

The plugin checks the content for forbidden words or collocations and terminates the build process, if any are found.

## Requirements

Environment variables with forbidden words or collocations should be provided as a comma-separated list:

```
FORBIDDEN=badword1, badword2
FORBIDDEN_SECRET=badword1, badword2
FORBIDDEN_DOMAINS=bad.domain1.com, bad.domain2.com
```
