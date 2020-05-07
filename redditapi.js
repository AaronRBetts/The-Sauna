export default {
    search: function(searchTerm, searchLimit, sortBy) {
        if (searchTerm) {
            searchTerm = `search.json?q=${searchTerm}`;   
        } else {
            searchTerm = `hot.json?`;
        }
        if (sortBy) {
            sortBy = `&sort=${sortBy}`;
        } else {
            sortBy = ``;
        }
        if (searchLimit) {
            searchLimit = `&limit=${searchLimit}`;      
        }
        return fetch(
            `http://www.reddit.com/r/finland/${searchTerm}${sortBy}${searchLimit}&restrict_sr=on`
        )
        .then(res => res.json())
        .then(data => data.data.children.map(data => data.data))
        .catch(err => console.log(err));
    }
};