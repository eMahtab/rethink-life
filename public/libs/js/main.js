var app=angular.module('mean',['toaster','ngAnimate','angularSpinner']);

app.directive('onLastElement', function() {
      return function(scope,element,attrs) {
                 if (scope.$last){
                 console.log("Emittting Last event")                 
                 scope.$emit('executeBootstrapNews',element,attrs);
                                 }
                    };
        });


app.controller('MainCtrl',function($scope,$http,toaster){
    
      $scope.formModel={};
      $scope.formModel.messageEmpty=false;
      $scope.formModel.messageTooLong=false;
      $scope.formModel.usernameEmpty=false;
      $scope.formModel.usernameTooLong=false; 
      $scope.formModel.loadingData=true;
    
    var updateView=function(){
         $http.get('/messages').success(function(response) {
         $scope.records = "";     
         $scope.records = response;
         
        });
     };
    
     $http.get('/messages').success(function(data) {
        // toaster.pop('success','Loading Data ...')
         console.log("Messages are "+data);
         $scope.records=data;
         
     });
    
    
     $scope.$on('executeBootstrapNews', function(scope,element,attrs){
         $scope.formModel.loadingData=false;
         console.log('good to go ');
         
          $(".demo1").bootstrapNews({
            newsPerPage: 4, 
            autoplay: true,
			pauseOnHover:true,
            direction: 'up',
            newsTickerInterval: 2500
        });
          
        }); 
  
    
    $scope.initialize=function(){
        return Math.floor((Math.random()*9)+1);
    }
    
    
    $scope.onSubmit=function(){
        var input=$scope.formModel.message;  
        console.log("Got input :"+input);
        
        
            $scope.formModel.messageEmpty=false;
            $scope.formModel.messageTooLong=false;
            $scope.formModel.usernameEmpty=false;
            $scope.formModel.usernameTooLong=false;
         
        
        if(input != null && input.split("@")[0].length !=0  ){
                       
            $scope.formModel.messageEmpty=false;
            $scope.formModel.messageTooLong=false;
            $scope.formModel.usernameEmpty=false;
            $scope.formModel.usernameTooLong=false;            
           
            //Resetting Message Field        
            //$scope.formModel.message="";
            
           // var userMessage=input.split("@")[0];
            var lastOccurrence=input.lastIndexOf('@');
            console.log("Last Occurance :"+lastOccurrence);
            if(lastOccurrence ==-1){
               $scope.formModel.usernameEmpty=true;
               console.log("Error : Username is empty!!"); 
               return;
            }
            
            var userMessage=input.substring(0,lastOccurrence);
          //var username=input.split("@")[1];
            var username=input.substring(lastOccurrence+1);
            
            console.log("Message is :"+userMessage);
            console.log("Username is :"+username+"check"+username.length);
            if(userMessage.length > 150){
                //message is too long
                $scope.formModel.messageTooLong=true;
                console.log("Error : Message Length is "+userMessage.length)
                return;
            }
            if(username == null || username==''){
                //username is empty
               $scope.formModel.usernameEmpty=true;
               console.log("Error : Username is empty!!") 
               return;
            }
            if(username.length > 20){
                //username is too long
                $scope.formModel.usernameTooLong=true;
                console.log("Error : Username is too large to digest !!") 
                return;
            }
            
            console.log("All good ready to make a POSt request");
            
            var newPost={}; newPost.username=username;
            newPost.message=userMessage;
            console.log("Going to POST :"+JSON.stringify(newPost));
           
            $http.post('/message', JSON.stringify(newPost)).success(function(response) {
             console.log(response);
               // $scope.formModel.loadingData=true;
               // updateView();
              toaster.pop('success',"Cheers, we got your message") 
              $scope.formModel.message="";
             });
            
        }
        else{
            //Message is empty
            $scope.formModel.messageEmpty=true;
            console.log("Error : Message is empty!!")
            return;
        }            
    }
});