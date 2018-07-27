# Collections

### New Collection

```typescript
import { Collection } from 'active-record-js';

const arrayCollection = Collection.initialize([1, 2, 3, 4, 5]);
const mapCollection = Collection.initialize({1: 'one', 2: 'two', 3: 'three'});
```

## ArrayCollection

#### length

```typescript
const length = arrayCollection.length;
```

#### concat

```typescript
const collection = arrayCollection.concat([6, 7, 8, 9]);
```

## MapCollection
