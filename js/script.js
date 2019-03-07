/* #6 start the #external #action and say hello */
console.log("App is alive");

/* Current Channel */
var currentChannel;

/* Current Location */
var currentLocation = {
    longitude: 40.967609,
    latitude: -5.661392,
    what3words: 'walks.tragedy.sectors'
}
/* Number of messages & total time to expire*/
var messages_count = 0;
var total_time_expiresIn = 0;

/*CONSTRUCTOR FUNCTION MESSAGES*/
function Message(text){
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = Date.now();
    this.expiresOn = this.createdOn+(60000*15);
    this.text = text;
    this.own = true;
}

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    currentChannel = channelName;

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelName.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/'+channelName.createdBy+'" target="_blank"><strong>'+channelName.createdBy+'</strong></a>';

    /* #7 STAR*/
    $('#channel-star').removeClass("fas , far");
    $('#channel-star').addClass(channelName.starred ? "fas":"far");

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains('+channelName.name+')').addClass('selected');
}

/* #6 #liking a channel on #click */
function star() {
    $('#channel-star').toggleClass("fas far");
    currentChannel.starred = !currentChannel.starred;
    $('#channels li:contains('+currentChannel.name+') .channel-meta .fa-star').toggleClass("fas far");
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}


/*SEND MESSAGES*/

function sendMessage(){
    /*written message*/
    var mes_box = $('#message_box').val();
    var mes1 = new Message(mes_box);
    var mes2 = createMessageElement(mes1);
    
    $('#messages').append(mes2); 
    $('#messages').scrollTop(1000000000);

    /*clear message box*/
    $('#message_box').val('');
}

/*CREATE MESSAGE*/

function createMessageElement(messageObject){

       /*add class .own*/
   var messageOwner = (messageObject.own)? 'own':'';
   
    /*Date to show in the message day, month, date, time */
   var date_created = new Date(messageObject.createdOn); 
   var weekday = new Array(7);
        weekday[0] = "Sun";weekday[1] = "Mon";weekday[2] = "Tues";weekday[3] = "Wed";weekday[4] = "Thur";weekday[5] = "Fri";weekday[6] = "Sat";
   var date_created_Day = weekday[date_created.getDay()];
   var month = new Array();
        month[0] = "January";month[1] = "February";month[2] = "March";month[3] = "April";month[4] = "May";month[5] = "June";month[6] = "July";month[7] = "August";month[8] = "September";month[9] = "October";month[10] = "November";month[11] = "December";
   var date_created_Month = month[date_created.getMonth()];
   var date_created_Date = date_created.getDate();
   var date_created_Hours = date_created.getHours();
   var date_created_Minutes = date_created.getMinutes();

    /*Final date to show */
   var date_createdOn = date_created_Day+', '+date_created_Month+' '+date_created_Date+', '+date_created_Hours+':'+date_created_Minutes;
    /* Time to expire calculation */
   var timetoexpire = Math.round((messageObject.expiresOn-messageObject.createdOn)/60000);
    /* DIV message implementation */
   var newMes = "<div class= 'message "+messageOwner+"'><h3><a href= https://map.what3words.com/"+messageObject.createdBy+" target='_blank'><strong>"+messageObject.createdBy+"</strong></a>"+date_createdOn+"<em>"+timetoexpire+" min. left</em></h3><p>"+messageObject.text+"</p><button>+5 min.</button></div>"; 
    
   /*Message count and time to expire*/
   total_time_expiresIn = total_time_expiresIn+timetoexpire;
   messages_count++;

   $('#channels li:contains('+currentChannel.name+') .channel-meta div').remove();
   $('<div>'+total_time_expiresIn+' min</div><div>'+messages_count+' new</div>').appendTo('#channels li:contains('+currentChannel.name+') .channel-meta .fa-star');
   
   return newMes;   
}