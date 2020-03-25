package edu.eci.arsw.collabpaint.controllers;

import edu.eci.arsw.collabpaint.model.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class STOMPMessagesHandler {
    @Autowired
    SimpMessagingTemplate msgt;
    Map<String, ArrayList<Point>> connect =new ConcurrentHashMap<String,ArrayList<Point>>();
    ArrayList<Point> polygon;

    @MessageMapping("/newpoint.{numdibujo}")
    public void handlePointEvent(Point pt, @DestinationVariable String numdibujo) throws Exception {
        if(connect.containsKey(numdibujo)){

            polygon=connect.get(numdibujo);
            polygon.add(pt);
            connect.replace(numdibujo,polygon);
            if(polygon.size()>3){
                msgt.convertAndSend("/topic/newpolygon."+numdibujo, polygon);
            } else {
                System.out.println("Nuevo punto recibido en el servidor!:"+pt);
                msgt.convertAndSend("/topic/newpoint."+numdibujo, pt);
            }
        } else {
            ArrayList<Point> var= new ArrayList<Point>();
            var.add(pt);
            connect.put(numdibujo,var);
            msgt.convertAndSend("/topic/newpoint."+numdibujo,pt);
        }

    }

}
