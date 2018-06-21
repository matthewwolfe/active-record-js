# Getting Started


#### Documentation

- [Model](Model.md)
- [Query Builder](QueryBuilder.md)
- [Relationships](Relationships.md)


## Initializing a database

To add a database, import ```DB``` and use the ```create``` static method. This can be called multiple times with
different databases. The active database can be switched by specifying a database connection name as the 5th
parameter.

```typescript
import { DB } from 'active-record';

DB.create('127.0.0.1', 'root', 'password', 'DATABASE NAME', 'DATABASE CONNECTION NAME');
```


## Switching databases

```typescript
import { DB } from 'active-record';

DB.create('127.0.0.1', 'root', 'password', 'db1', 'db1');

// This will set the active database to be this database by default
DB.create('127.0.0.1', 'root', 'password', 'db2', 'db2');

// Set the active database back to the first database
DB.setActiveDatabase('db1');
```
