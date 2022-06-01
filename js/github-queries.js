
// Script to get information about the latest preCICE release from GitHub,
// using its API

// When the page is loaded, call to the github API is generated, upon succesful
// completition of which we get JSON with the list of releases. We get info from
// the latest release, processes its data and modify the HTML element
// with id "latest-release".

// Get the updated field of an entry of the feed and format it like "Jan 1, 1970"
function formatDate(updated) {
  // Extract the date and create a Date object
  date = new Date(updated);

  // Names for the months (we do not need an external library just for this)
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Returns e.g. "Jan 1, 1970"
  return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// Wait until the complete page has loaded (so that the latest-release exists)
document.addEventListener("DOMContentLoaded", function() {

var github_api_endpoint = 'https://api.github.com/repos/precice/precice/releases'

    fetch(github_api_endpoint).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          tag = data[0].name;
          published_at = data[0].published_at;
          url = data[0].html_url
            // Format the text, which contains the link, the title, and the date.
            var text = '<a href="' + url + '" class="btn btn-secondary no-icon action-button" role="button">Latest ' + tag + ' (' + formatDate(published_at) + ') &nbsp;<i class="fas fa-download"></i></a>';
            document.getElementById('latest-release').innerHTML = text;
        });
    }
    else throw new Error("Problem with fetching releases");
}).catch(function(err) {
          // if github is unreachable ( or API gets changed in the future ) hide info about release
          // document.getElementById('latest-release').innerHTML = '';
      });

}, false );


// Number of Github Stars

// Exact copy of the script to get latest release, but this time we get the number of stars, or 'stargazers_count' in Github lingo
document.addEventListener("DOMContentLoaded", function() {

    var github_api_endpoint = 'https://api.github.com/repos/precice/precice'

    fetch(github_api_endpoint).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          count = data.stargazers_count
          var text = '<a href="https://github.com/precice/precice/" class="btn btn-default no-icon action-button" role="button">Star on Github &nbsp;<i class="fas fa-star"></i><span id="stargazers"> ' + count + '</span></a>';
          document.getElementById('github-button').innerHTML = text;
      });
    }
    else throw new Error("Problem with fetching stargazers");
}).catch(function(err) {
          // if github is unreachable ( or API gets changed in the future ) hide info about release
          // document.getElementById('github-button').innerHTML = '';
      });

}, false );
