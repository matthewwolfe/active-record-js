# Getting Started


#### Documentation

- [Collections](Collections.md)
- [Events](Events.md)
- [Migrations](Migrations.md)
- [Model](Model.md)
- [Query Builder](QueryBuilder.md)
- [Relationships](Relationships.md)


## Initializing a database

To add a database, import ```DB``` and use the ```create``` static method. This can be called multiple times with
different databases. The active database can be switched by specifying a database connection name as the 5th
parameter.

```typescript
import { DB } from 'active-record-js';

DB.create({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'DATABASE NAME',
    name: 'DATABASE CONNECTION NAME'
});
```


## Switching databases

```typescript
import { DB } from 'active-record-js';

DB.create({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'db1',
    name: 'db1'
});

// This will set the active database to be this database by default
DB.create({
    host: '127.0.0.10',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'db2',
    name: 'db2'
});

// Set the active database back to the first database
DB.setActiveDatabase('db1');
```
