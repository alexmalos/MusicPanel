export const queryParams = search => {
    const queries = search.split('&');
    const queryPairs = queries.map(query => {
        return query.split('=');
    });
    return Object.fromEntries(queryPairs);
};
