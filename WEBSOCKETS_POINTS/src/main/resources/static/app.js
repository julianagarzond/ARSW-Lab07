var app = (function () {

    var path='/topic/newpoint.';
    var num;

    class Point{
        constructor(x,y){
            this.x=x;
            this.y=y;
        }        
    }
    
    var stompClient = null;

    var addPointToCanvas = function (point) {        
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    };
    
    
    var getMousePosition = function (evt) {
        canvas = document.getElementById("canvas");
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };


    var connectAndSubscribe = function (id) {
        console.info('Connecting to WS...');
        num = id;
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        console.log(id);


        
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe(path.concat(id), function (eventbody) {
                var theObject=JSON.parse(eventbody.body);
                addPointToCanvas(new Point(theObject.x, theObject.y));
                //alert("mensaje enviado");

            });
        });

    };
    
    

    return {


        init: function () {
            var can = document.getElementById("canvas");
            num = null;
            //websocket connection
            connectAndSubscribe();
        },

        publishPoint: function(px,py){
            var pt = new Point(px,py);
            console.info("publishing point at "+pt);
            //addPointToCanvas(pt);
            //stompClient.send("/topic/newpoint", {}, JSON.stringify({x:10,y:10}));
            if (num != null) {
                stompClient.send(path.concat(num), {}, JSON.stringify(pt));
            }else{
                alert("No conection specified");
            }
            //publicar el evento pues podria ser
        },
        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        },
        connectAndSubscribe:connectAndSubscribe
    };

})();