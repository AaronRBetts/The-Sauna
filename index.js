import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");


searchReddit("", 25, "hottest");

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    //Get the search term
    const searchTerm = searchInput.value;

    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    // if (searchTerm === "") {
    //     showMessage('Please add a search term', 'alert-danger');
    // }

    //Clear input
    searchReddit("", 25, "");
    searchInput.value = "";
});

function searchReddit(searchTerm, searchLimit, sortBy){

    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy).then(results => {
        let output = '<div class="card-columns">';
        results.forEach(post => {
            if (post.domain == "self.Finland") post.domain = `reddit.com/r/finland`
            //Check for image
            let image = ``;
            if (post.preview){
                image = `<a href="${post.url}" target="_blank"><img src="${post.preview.images[0].source.url}" class="card-img-top img-fluid" alt="article image"></a>`
            } 
            var a = new Date(post.created_utc * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

            //Produce card with info
            output += `
            <div class="card text-white bg-dark">
                <div class="card-body">
                    ${image}
                    <h5 class="card-header">${post.title}</h5>
                    <span class="badge badge-secondary">Posted: ${time}</span>
                    <hr>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
                    <span class="badge badge-secondary">Article origin: ${post.domain}</span>
                </div>
            </div>
            `;
        })
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });
}
    

function showMessage(message, className){
    //create message div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    //get parent (search container)
    const searchContainer = document.getElementById("search-container");
    const search = document.getElementById("search");

    //insert a message to the parent
    searchContainer.insertBefore(div, search);

    //Timeout alert
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Truncate text
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}