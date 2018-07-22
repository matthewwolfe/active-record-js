# Migrations

## Schema

#### createTable

| Parameter | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| table     | string   | Name of table to create              |
| fn        | Function | Function containing blueprint object |

```typescript
await Schema.createTable('users', (blueprint) =>
{
    blueprint.integer('id', {allowNull: false, length: 15, signed: false});
    blueprint.varchar('firstName', {length: 255});
});
```

#### drop

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| table     | string   | Name of table to drop |

```typescript
await Schema.drop('users');
```

#### dropIfExists

| Parameter | Type     | Description                        |
| --------- | -------- | ---------------------------------- |
| table     | string   | Name of table to drop if it exists |

```typescript
await Schema.dropIfExists('users');
```

#### hasColumn

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| table     | string   | Name of table  |
| column    | string   | Name of column |

```typescript
await Schema.hasColumn('users', 'id');
```

#### hasTable

| Parameter | Type     | Description   |
| --------- | -------- | ------------- |
| table     | string   | Name of table |

```typescript
await Schema.hasTable('users');
```

## Blueprint

#### bigInteger

| Parameter | Type                 | Description    |
| --------- | -------------------- | -------------- |
| name      | string               | Column name    |
| options   | IntegerColumnOptions | Column options |

```typescript
blueprint.bigInteger('id', {allowNull: false, length: 15, signed: false});
```

#### blob

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.blob('binaryData');
```

#### char

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.char('char');
```

#### date

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.date('startDate');
```

#### dateTime

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.dateTime('startDateTime');
```

#### decimal

| Parameter | Type          | Description    |
| --------- | ------------- | -------------- |
| name      | string        | Column name    |
| options   | ColumnOptions | Column options |

```typescript
blueprint.decimal('decimalColumn', {allowNull: false});
```

#### double

| Parameter | Type          | Description    |
| --------- | ------------- | -------------- |
| name      | string        | Column name    |
| options   | ColumnOptions | Column options |

```typescript
blueprint.double('numberColumn', {length: 15});
```

#### enum

| Parameter | Type              | Description    |
| --------- | ----------------- | -------------- |
| name      | string            | Column name    |
| options   | EnumColumnOptions | Column options |

```typescript
blueprint.enum('status', {
    values: ['pending', 'succeeded', 'failed'],
    defaultValue: null
});
```

#### float

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.float('floatColumn');
```

#### integer

```typescript
blueprint.integer('id', {length: 15});
```

#### longText

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.longText('description');
```

#### mediumInteger

| Parameter | Type                 | Description    |
| --------- | -------------------- | -------------- |
| name      | string               | Column name    |
| options   | IntegerColumnOptions | Column options |

```typescript
blueprint.mediumInteger('id');
```

#### mediumText

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.mediumText('shortDescription');
```

#### smallInteger

| Parameter | Type                 | Description    |
| --------- | -------------------- | -------------- |
| name      | string               | Column name    |
| options   | IntegerColumnOptions | Column options |

```typescript
blueprint.smallInteger('quantity');
```

#### text

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.text('description');
```

#### time

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.time('startTime');
```

#### timestamp

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.timestamp('createdAt');
```

#### tinyInteger

| Parameter | Type                 | Description    |
| --------- | -------------------- | -------------- |
| name      | string               | Column name    |
| options   | IntegerColumnOptions | Column options |

```typescript
blueprint.tinyInteger('active');
```

#### varchar

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.varchar('username');
```

#### year

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```typescript
blueprint.year('startYear');
```
