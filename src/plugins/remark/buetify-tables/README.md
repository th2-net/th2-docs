# Buetify Tables Plugin

This plugin wraps all tables into special styled block.

## Transform

Before:

```html
<table>...</table>
```

After:

```html
<div class="v-sheet v-sheet--outlined elevation-2 my-5">
  <div class="v-data-table">
    <div class="v-data-table__wrapper">
      <table>...</table>
    </div>
  </div>
</div>
```