---
title: Event
---

Event is a base entity of the th2. Information, related to the work of every component, the executed tests, and the problems that happened are presented as an events hierarchy. Every event consists of important parts:

- id - unique identifier (in UUID format) within the th2;

- parentId - optional link to a parent event;

- description - set of fields for short descriptions;

- body - useful data in JSON format;

- attachedMessageIDs - the list of message IDs that are linked to the event.