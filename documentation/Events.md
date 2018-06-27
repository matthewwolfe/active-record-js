# Events

## Emitter

The Emitter can be used to register event listeners to listen for specific events.

```js
import { Emitter } from 'active-record-js';

Emitter.addListener('model-saved', (model) => {
    // do something with the saved model
});
```

The current list of events that can be registered with the listener:
- ```model-created```
- ```model-creating```
- ```model-deleted```
- ```model-deleting```
- ```model-saved```
- ```model-saving```
- ```model-updated```
- ```model-updating```
