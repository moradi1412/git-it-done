var getUserRepos = function (user) {

    var apiUrl = "https://api.github.com/users/" + user + "/repos";

 fetch(apiUrl).then (function(response) {
        // console.log ("inside", response);
    response.json().then(function(data) {
        console.log (data);
    });
    // console.log ("outside", response);
    // console.log ("function was called");
});
}; 

getUserRepos("facebook"); 