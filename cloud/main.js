
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
  
});


Parse.Cloud.define("iosPush", function(request, response) {
 
  var user = request.user;
  var params = request.params;
  var someKey = params.someKey
  var data = params.data
 
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only
  pushQuery.equalTo("someKey", someKey)
 
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: data
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});
 
  response.success('success');
});

Parse.Cloud.define("newFollowerPush", function(request, response) {

 var user = request.user;
  var params = request.params;
  var objectId = params.objectId
  var data = params.data
	
var userQuery = new Parse.Query(Parse.User);
userQuery.equalTo("objectId", objectId)

var pushQuery = new Parse.Query(Parse.Installation);
pushQuery.matchesQuery('user', userQuery);

	Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: data
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});
 
  response.success('success');
	
	
	});
	
	
	
	// iOS push testing
Parse.Cloud.define("iosPushTest", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  var user = request.user;

  // Our "Message" class has a "text" key with the body of the message itself                                                                                                                                    
  var messageText = params.text;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only                                                                                                                                          

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "Message: " + messageText
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
