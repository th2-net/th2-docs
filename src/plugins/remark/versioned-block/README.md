# Versioned block

This plugin replaces the HTML `div` tags with the `version` attribute with the `versioned-block` (`VersionedBlock.vue`) Vue component.

## Transform

Before:

```md
<div version="1.7">

Content for version 1.7

</div>

<div version="2.0">

Content for version 2.0

</div>
```

After:

```md
<versioned-block version="1.7">

Content for version 1.7

</versioned-block>

<versioned-block version="2.0">

Content for version 2.0

</versioned-block>
```