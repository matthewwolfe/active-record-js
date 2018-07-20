import * as Sqlstring from 'sqlstring';

let mockResults = [];

function setMockResults(results) {
    mockResults = results;
}

function createPool() {
    return {
        getConnection
    };
}

function escape(string) {
    return Sqlstring.escape(string);
}

function escapeId(string) {
    return Sqlstring.escapeId(string);
}

function getConnection(fn) {
    fn(undefined, {
        query,
        destroy: jest.fn(),
        release: jest.fn()
    });
}

function query(query, callback) {
    callback(undefined, mockResults);
}

export {
    createPool,
    escape,
    escapeId,
    setMockResults
};
