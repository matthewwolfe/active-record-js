export enum JoinType {
    Inner = 'JOIN',
    Left = 'LEFT JOIN',
    Right = 'RIGHT JOIN'
}

export const OPERATORS = [
    '=', '<', '>', '<=', '>=', '<>', '!=', '<=>',
    'like', 'like binary', 'not like', 'ilike', 'in',
    '&', '|', '^', '<<', '>>',
    'rlike', 'regexp', 'not regexp',
    '~', '~*', '!~', '!~*', 'similar to',
    'not similar to', 'not ilike', '~~*', '!~~*',
];

export const SORT_DIRECTIONS = [
    'asc', 'desc', 'ASC', 'DESC'
];
