var app = (function () {


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
            stompClient.subscribe('/topic/newpoint.'+num, function (eventbody) {
                var theObject=JSON.parse(eventbody.body);
                addPointToCanvas(new Point(theObject.x, theObject.y));
                //alert("mensaje enviado");

            });

            stompClient.subscribe('/topic/newpolygon.'+num, function (eventbody) {
                var puntico = null;
                var theObject=JSON.parse(eventbody.body);
                var c2 = canvas.getContext('2d');
                c2.fillStyle = '#F7D910';
                c2.clearRect(0, 0, 800, 600);
                c2.beginPath();
                theObject.map(function (puntoFinal ){
                    if (puntico == null ){
                        puntico = puntoFinal;
                        c2.moveTo(puntico.x, puntico.y);
                    }else {
                        c2.lineTo(puntoFinal.x,puntoFinal.y);
                    }
                });
                c2.closePath();
                c2.fill();

            })
        });

    };
    
    

    return {


        init: function () {
            var can = document.getElementById("canvas");
            can.addEventListener("pointerdown",function (evento) {
                var mouse = getMousePosition(evento);
                app.publishPoint(mouse.x, mouse.y);
            })
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
                stompClient.send('/app/newpoint.'+num, {}, JSON.stringify(pt));
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
        connectAndSubscribe:connectAndSubscribe,

    };

})();