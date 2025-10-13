var lastfmJsonURL = {
    baseURL: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
    // Your Last.fm Username
    user: "bluecreeper512",
    // Your API key
    api_key: "1193c2c8bc34a20a2ad1b6741d503e4e",
    additional: "&format=json&limit=1"
};

// Function to shorten long track titles
function shortenString(str, length) {
  if (str.length > length) {
    let shortenedStr = str.substring(0, length - 3);
    shortenedStr = shortenedStr.substr(0, Math.min(shortenedStr.length, shortenedStr.lastIndexOf(" ")));
    return shortenedStr + '...';
  } else {
    return str;
  }
}

// Construct JSON URL
var lastfmData = function () {
    $.ajax({
		  type: "GET",
		  url:
			lastfmJsonURL.baseURL +
			lastfmJsonURL.user +
			"&api_key=" +
			lastfmJsonURL.api_key +
			lastfmJsonURL.additional,
		  dataType: "json",

	success: function (data) {
	// Reset info (prevents old info from persisting when current entries are blank)
	$("#tracktitle").html("");
	$("#trackartist").html("");
	$("div#playstatus").html("");

    // Check if 'nowplaying' exists in Last.fm JSON
    if (data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying === "true") {

	} else {
        // Pull timestamp from Last.fm JSON
        var dateString = data.recenttracks.track[0].date['#text'];
        // Format timestamp to be human readable
        var date = new Date(dateString);
        date.setHours(date.getHours() + 9); // adjust Last.FM time to Eastern
        var currentDate = new Date();
        var timeDiff = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
        var formattedTime = date.toLocaleTimeString('en-SE', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(/ /g, '').toLowerCase();
        let formattedDate;
        if (timeDiff < 1 && currentDate.getDate() === date.getDate()) {
        	formattedDate = 'Today';
        } else if (timeDiff < 2 && currentDate.getDate() !== date.getDate()) {
        	formattedDate = 'Yesterday';
        } else if (timeDiff <= 7) {
        	formattedDate = date.toLocaleDateString('en-SE', { weekday: 'long' });
        } else if (timeDiff <= 14) {
        	formattedDate = 'Last ' + date.toLocaleDateString('en-SE', { weekday: 'long' });
        } else {
        	formattedDate = date.toLocaleDateString('en-SE', {
        		month: 'long',
        		day: 'numeric',
        		...(date.getDate() > 3 && date.getDate() < 21 && { day: 'numeric' + 'th' }),
        		...(date.getDate() % 10 === 1 && { day: 'numeric' + 'st' }),
        		...(date.getDate() % 10 === 2 && { day: 'numeric' + 'nd' }),
        		...(date.getDate() % 10 === 3 && { day: 'numeric' + 'rd' }),
        	});
        }
		// Create timestamp string for widget
		var playStatusHtml = 'Played ' + formattedDate + ' @ ' + formattedTime;
	}
	
	// Pull remaining track info from Last.fm JSON 
	var trackLink = data.recenttracks.track[0].url;
	var coverArt = data.recenttracks.track[0].image[2]["#text"];
	var trackFormatted = shortenString(data.recenttracks.track[0].name,70);
	var artistFormatted = data.recenttracks.track[0].artist["#text"];
	var albumFormatted = data.recenttracks.track[0].album["#text"];
		
	// Update html with most recent info from Last.fm
	$("img#trackart").attr("src", coverArt);
	$("a#trackart").attr("href", trackLink);
	$("div#tracktitle").html(trackFormatted);
	$("div#trackartist").html(artistFormatted);	
	$("div#playstatus").html(playStatusHtml);
	
	}, // End of AJAX success function
	  
	error: function () {  // Show error message if Last.fm is down or wrong Last.fm username/API entered 
		console.log("Error fetching Last.fm data.");
		const ErrorCoverartURL="https://4.bp.blogspot.com/-AXYpAfwRnKY/XDejdGyWmnI/AAAAAAAAdmI/Cfi-2VRGvYsrq_8z8qVR8KEA0JkqfbMVwCK4BGAYYCw/s90/rhinokick.jpg";
		$("img#trackart").attr("src", ErrorCoverartURL);
		$("a#trackart").attr("href", "#");
		$("div#tracktitle").html("Silence?");
		$("div#trackartist").html("(something is broken...)");	
		$("div#playstatus").html("");
	}
	   
    });
	
  }

// Call the function to fetch & populate initial Last.fm dataset
lastfmData();

// Refresh every 30 seconds
setInterval(lastfmData, 30 * 1000);