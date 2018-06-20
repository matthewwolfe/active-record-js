export enum ColumnType {
    // Integers
    BIG_INTEGER = 'BIGINT',
    INTEGER = 'INT',
    SMALL_INTEGER = 'SMALLINT',
    MEDIUM_INTEGER = 'MEDIUMINT',
    TINY_INTEGER = 'TINYINT',

    // Fixed-Point
    DECIMAL = 'DECIMAL',
    NUMERIC = 'NUMERIC',

    // Floating-Point
    DOUBLE = 'DOUBLE',
    FLOAT = 'FLOAT',

    // Bit
    BIT = 'BIT',

    // Text
    BLOB = 'BLOB',
    CHAR = 'CHAR',
    LONG_BLOB = 'LONGBLOB',
    LONG_TEXT = 'LONGTEXT',
    MEDIUM_BLOB = 'MEDIUMBLOB',
    MEDIUM_TEXT = 'MEDIUMTEXT',
    TEXT = 'TEXT',
    TINY_TEXT = 'TINYTEXT',
    VARCHAR = 'VARCHAR',

    // Choice
    ENUM = 'ENUM',
    SET = 'SET',

    // Date
    DATE = 'DATE',
    DATETIME = 'DATETIME',
    TIME = 'TIME',
    TIMESTAMP = 'TIMESTAMP',
    YEAR = 'YEAR'
}
