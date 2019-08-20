
const redis = require('redis'),            						// node_redis to manage the redis connection
	client = redis.createClient();

var uniqid = require('uniqid'); 								// module which generates a unique id

let perSec = 0;

// This code block is for adding fake tweets to redis every 5 seconds
setInterval(function () {
	console.log(" ***** tweet added **** ");
	client.xadd('tweets',                       				// add to the stream `tweets`
		'*',                                    				// at the latest sequence
		'id', uniqid(),                         				// stream field `id` with the tweet id (in string format because JS is bad with big numbers!)
		'screen_name', "test name " + perSec,        			// stream field `screen_name` with the twitter screen name
			'text', "this is a dummy text please ignore " + perSec,
		'mentions', " there are no mentions " + perSec,			// stream field `mentions` with the mentions comma delimited list
		'urls', "www.google.com,www.facebook.com",				// stream field `urls` with urls comma delimited list
		function (err) {
			if (err) { throw err; }								// handle any errors - a production service would need better error handling.
		}
	);
	perSec++;
}, 100);

