var mongoose = require( 'mongoose' );
var Message = mongoose.model( 'Message' );

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

exports.addMessage=function(req,res){
   var username=req.body.username;
   var message=req.body.message;
   
   console.log("Author is :"+username);
   console.log("Message is :"+message);

   var newMessage=new Message();
   newMessage.username=username;
   newMessage.message=message;    

   newMessage.save(function(err,savedMessage){
       if(err){
         console.log("Error : While saving the Message");
         return res.status(500).send();
       }else{
         res.status(201).send(savedMessage);
       }
   });
}

exports.getMessages=function(req,res){
                              Message.find({}, function(err, records){

                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occurred while fetching data");
                                        return;
                                      }else{
                                        var data=records;
                                        var shuffledData=shuffle(data); 
                                        res.status(200).send(shuffledData);
                                      }

                              });

                            }