var userInfo = myip + ",";	//User Info.:ip
userInfo = userInfo + ( document.cookie.replace(/(?:(?:^|.*;\s*)ASP.NET_SessionId\s*\=\s*([^;]*).*$)|^.*$/, "$1") ) + ",";	
    //User Info.:session 
    	
var test = false;
var isDetect = false;
var count = -1;
var eventInfo = "";
var playbackInfo = "";
var lastTime;

document.addEventListener('DOMContentLoaded', init, false);
function init(){
    var r = new XMLHttpRequest();
    r.open('HEAD', document.location, false);
    var before;
    r.onreadystatechange = function(){
        if (r.readyState != 4){
            canSent=false; //for ga
            return; //risk..
        }
        canSent=true; //for ga  
        var after=Date.now();  
        var serverResponse=new Date(r.getResponseHeader("DATE"));
        if(test){console.log("serverResponseBeforeSetMs:" + serverResponse);}
        var serverNow=serverResponse.setMilliseconds( 
                serverResponse.getMilliseconds() + 
                ( Date.now() - before) / 2 				);
        if(test){console.log("serverResponseAfterSetMs:" + serverResponse);}
        if(test){console.log("serverNow:" + serverNow);}
        var timeDiffer = serverNow - after;
        userInfo = userInfo+(timeDiffer + ",");
	};
	before = Date.now();
    r.send(null);

    video=document.getElementById("vp");
    video.addEventListener("loadstart" , videoLoadStart,false);
    video.addEventListener("playing" , videoPlaying,false);
    video.addEventListener("progress" , videoProgress,false);
    video.addEventListener("seeking" , userSeeking,false);
    //video.addEventListener("pause", videoPause,false);n

    window.addEventListener("unload" , windowUnload,false);
}

function videoLoadStart(){
    eventInfo = eventInfo + ( "ls:" + Date.now() + "," ) ;
    video.removeEventListener("loadstart",videoLoadStart);
    if(test){
    	console.log("ls" + " : " + new Date() + " : " + video.currentTime + " : " + lastTime);
    }
}

function videoPlaying(){
    eventInfo = eventInfo + ( "pg:" + Date.now() + "," ) ;
    lastTime=video.currentTime;
    isDetect=true;
    if(test){
    	console.log("pg" + " : " + new Date() + " : " + video.currentTime + " : " + lastTime);
    }
    //***
    video.removeEventListener("playing",videoPlaying);
}

function videoProgress(){
    //*****
    //console.log("hi im progress");
    if(isDetect){
    	if(test){console.log(lastTime + " : " + video.currentTime);}
    	if( //unpaused,rebuffered,firstTimeRebuffered
            !video.paused && 
            (video.currentTime === lastTime) &&
            (count === -1)) 
    	{
    		eventInfo = eventInfo + ( "rb:" + Date.now() + "," ) ;
            if(test){console.log("hi im buffered : " + Date.now());}
            count=1;
            //lastTime = video.currentTime;
            if(test){
    			console.log("rb" + " : " + new Date() + " : " + video.currentTime + " : " + lastTime);
    		}
        }else if ( //unpaused,resumed,firestTimeResume
            !video.paused && 
            (video.currentTime !== lastTime) &&
            (count === 1)) 
        {
            eventInfo = eventInfo + ( "rm:" + Date.now() + "," ) ;
            if(test){console.log("hi im resumed : " + Date.now());}
            count=-1;
            //lastTime = video.currentTime;
            if(test){
    			console.log("rm" + " : " + new Date() + " : " + video.currentTime + " : " + lastTime);
    		}
        }else if(video.paused)
        {//user paused,userInteraction
            isDetect=false;
            eventInfo = eventInfo + ( "pd:" + Date.now() + "," ) ;
            playbackInfo=(video.currentTime+ "," + video.buffered.end(0) +"," + video.duration );
            video.removeEventListener("progress",videoProgress);
            //sent ga
            ga('set', 'dimension1',userInfo);
            ga('set', 'dimension2', eventInfo);
            ga('set', 'dimension3',playbackInfo + "," +new Date() );
            ga('send', 'pageview');
            if(test){
    			console.log("pd" + " : " + new Date() + " : " + video.currentTime + " : " + lastTime);
    			console.log(userInfo+" : "+eventInfo+" : " +playbackInfo);
    		}
            clear();
		}else if(video.buffered.end(0)===video.duration)
        {//canPlayThrough
            isDetect=false;
            eventInfo = eventInfo + ( "ph:" + Date.now() + "," ) ;
            playbackInfo=(video.currentTime+ "," + video.buffered.end(0) +"," + video.duration );
            video.removeEventListener("progress",videoProgress);
            //sent ga
            ga('set', 'dimension1',userInfo);
            ga('set', 'dimension2', eventInfo);
            ga('set', 'dimension3',playbackInfo + "," +new Date() );
            ga('send', 'pageview');
            if(test){
    			console.log("ph" + " : " + new Date() + " : " + video.currentTime + " : " + lastTime);
    			console.log(userInfo+" : "+eventInfo+" : " +playbackInfo);
    		}
            clear();
        }
    }
    lastTime = video.currentTime;
}
    	
function userSeeking(){
    //maybe data will useless
    isDetect=false;
    eventInfo = eventInfo + ( "se:" + Date.now() + "," ) ;
    playbackInfo=(video.currentTime+ "," + video.buffered.end(0) +"," + video.duration );
    video.removeEventListener("seeking",userSeeking);
    video.removeEventListener("progress",videoProgress);
    //sent ga
    ga('set', 'dimension1',userInfo);
    ga('set', 'dimension2', eventInfo);
    ga('set', 'dimension3',playbackInfo + "," +new Date() );
    ga('send', 'pageview');
    if(test){
    	console.log("se" + " : " + new Date() + " : " + video.currentTime + " : " + lastTime);
    	console.log(userInfo+" : "+eventInfo+" : " +playbackInfo);
    }
    clear();
}

function windowUnload(){
    //maybe data will useless
    isDetect=false;
    eventInfo = eventInfo + ( "un:" + Date.now() + "," ) ;
    playbackInfo=(video.currentTime+ "," + video.buffered.end(0) +"," + video.duration );
    //sent ga
    ga('set', 'dimension1',userInfo);
    ga('set', 'dimension2', eventInfo);
    ga('set', 'dimension3',playbackInfo + "," +new Date() );
    ga('send', 'pageview');
    if(test){
    	console.log("un" + " : " + new Date() + " : " + video.currentTime + " : " + lastTime);
    	console.log(userInfo+" : "+eventInfo+" : " +playbackInfo);
    }
    clear();
}

function clear(){
    video.removeEventListener("progress",videoProgress);
    video.removeEventListener("seeking",userSeeking);
    window.removeEventListener("unload",windowUnload);
    isDetect=false;
    test=false;
}
