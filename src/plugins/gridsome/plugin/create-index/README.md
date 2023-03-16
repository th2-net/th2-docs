# Create index plugin

This plugin converts the text from Markdown to JSON to subsequently use this content in ElasticSearch.

All files are stored in folder by link `<host>/__es-index`.

Folder includes `meta.json` file with following stricture:

```json
{
  "count": 64, // pages stored count
  "updated_at": "2023-01-24T12:58:54.874Z", // index last uodate ISO date
  "files": [
    "index-0.json",
    "index-1.json",
    "index-2.json",
    "index-3.json",
    "index-4.json",
    "index-5.json",
    "index-6.json",
    "index-7.json",
    "index-8.json",
    "index-9.json",
    "index-10.json",
    "index-11.json",
    "index-12.json"
  ] // list of created index files
}
```

Every index file stores up to 5 pages with the following structure:

```json
[
  {
    "path": "/path/to/page/",
    "title": "Title of the page",
    "content": "Text of the page"
  }
]
```