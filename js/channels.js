var Yummy = {
    name:'Yummy',
    createdOn: new Date(2016, 04, 01),
    createdBy: 'minus.plus.yummy',
    starred: false,
    expiresIn: 6000000,
    messageCount:999
}
var SevenContinents = {
    name:'SevenContinents',
    createdOn: new Date(2016, 04, 01),
    createdBy: 'minus.plus.seven',
    starred: true,
    expiresIn: 6000000,
    messageCount:999
}
var KillerApp = {
    name:'KillerApp',
    createdOn: new Date(2016, 04, 01),
    createdBy: 'minus.plus.killer',
    starred: false,
    expiresIn: 6000000,
    messageCount:999
}
var FirstPersonOnMars = {
    name:'FirstPersonOnMars',
    createdOn: new Date(2016, 04, 01),
    createdBy: 'minus.plus.first',
    starred: true,
    expiresIn: 6000000,
    messageCount:999
}
var Octoberfest = {
    name:'Octoberfest',
    createdOn: new Date(2016, 04, 01),
    createdBy: 'minus.plus.fest',
    starred: false,
    expiresIn: 6000000,
    messageCount:999
}

/*FUNCTIONS  CHANNEL LIST*/
function listChannels(){
    $('#channels-list').append(createChannelElement(Yummy));
    $('#channels-list').append(createChannelElement(SevenContinents));
    $('#channels-list').append(createChannelElement(KillerApp));
    $('#channels-list').append(createChannelElement(FirstPersonOnMars));
    $('#channels-list').append(createChannelElement(Octoberfest));
    switchChannel(SevenContinents);
}

function createChannelElement(channelObject){
    channel_starred = (channelObject.starred)?'fas':'far';
    var newChannel = "<li onclick='switchChannel("+channelObject.name+")'>#"+channelObject.name+"<span class='channel-meta'><i class='"+channel_starred+" fa-star'></i><i class='fas fa-chevron-right'></i></span></li>"; 

    return newChannel;   
}

