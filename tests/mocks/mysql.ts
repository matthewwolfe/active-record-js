

let mockResults = [];

function setMockResults(results) {
    mockResults = results;
}

function createPool() {
    return {
        getConnection
    };
}

function getConnection(fn) {
    fn(undefined, {
        query,
        release: jest.fn()
    });
}

function query(_, callback) {
    callback(undefined, mockResults);
}

export {
    createPool,
    setMockResults
};
