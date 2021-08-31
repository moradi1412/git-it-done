//Dom Element 
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");


var formSubmitHandler = function (event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        //replace the recived data to the function 
        getUserRepos(username);
        repoContainerEl.textContent = "";
        nameInputEl.value = "";
    }
    else {
        alert("please enter a github username")
    }
    console.log(event);
};

var buttonClickHandler = function(event) {
    // get the language attribute from the clicked element
    var language = event.target.getAttribute("data-language");
  
    if (language) {
      getFeaturedRepos(language);
  
      // clear old content
      repoContainerEl.textContent = "";
    }
  };



var getUserRepos = function (user) {

    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    displayRepos(data, user);
                });
            } else {
                alert('Error: GitHub User Not Found');
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");
        });
};


var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data.items, language)
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    });
  };


var displayRepos = function (repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (let index = 0; index < repos.length; index++) {
        //repo name 
        var repoName = repos[index].owner.login + "/" + repos[index].name;
        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName); 
        //create a span element to hold repo name 
        var titileEl = document.createElement("span");
        titileEl.textContent = repoName;
        repoEl.appendChild(titileEl);
        //Create a status element 
        var statusEl = document.createElement("span");
        statusEl.classList = "flew-row aling-center";
     
        //Check if current repor has issue or not 
        if (repos[index].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[index].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        };
        //append to container or display
    
        
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
    console.log(repos);
    console.log(searchTerm);
};





userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);

