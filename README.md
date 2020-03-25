# ARSW-Lab07
- Eduardo Ocampo
- Juliana Garzón

## Parte I
Para las partes I y II, usted va a implementar una herramienta de dibujo colaborativo Web, basada en el siguiente diagrama de actividades:
Para esto, realice lo siguiente:
1. Haga que la aplicación HTML5/JS al ingresarle en los campos de X y Y, además de graficarlos, los publique en el tópico: /topic/newpoint . Para esto tenga en cuenta (1) usar el cliente STOMP creado en el módulo de JavaScript y (2) enviar la representación textual del objeto JSON (usar JSON.stringify).
![lab1](https://user-images.githubusercontent.com/43153078/77556039-f6e30400-6e85-11ea-9f5a-13cfbfb29236.PNG)

2. Dentro del módulo JavaScript modifique la función de conexión/suscripción al WebSocket, para que la aplicación se suscriba al tópico "/topic/newpoint" (en lugar del tópico /TOPICOXX). Asocie como 'callback' de este suscriptor una función que muestre en un mensaje de alerta (alert()) el evento recibido. Como se sabe que en el tópico indicado se publicarán sólo puntos, extraiga el contenido enviado con el evento (objeto JavaScript en versión de texto), conviértalo en objeto JSON, y extraiga de éste sus propiedades (coordenadas X y Y). Para extraer el contenido del evento use la propiedad 'body' del mismo, y para convertirlo en objeto, use JSON.parse. Por ejemplo:

![lab2](https://user-images.githubusercontent.com/43153078/77556341-648f3000-6e86-11ea-9769-f1ac1c05bcd0.PNG)
3. Compile y ejecute su aplicación. Abra la aplicación en varias pestañas diferentes (para evitar problemas con el caché del navegador, use el modo 'incógnito' en cada prueba).
4. Ingrese los datos, ejecute la acción del botón, y verifique que en todas la pestañas se haya lanzado la alerta con los datos ingresados.
5. Haga commit de lo realizado, para demarcar el avance de la parte 2.


## Parte II

Para hacer mas útil la aplicación, en lugar de capturar las coordenadas con campos de formulario, las va a capturar a través de eventos sobre un elemento de tipo <canvas>. De la misma manera, en lugar de simplemente mostrar las coordenadas enviadas en los eventos a través de 'alertas', va a dibujar dichos puntos en el mismo canvas. Haga uso del mecanismo de captura de eventos de mouse/táctil usado en ejercicios anteriores con este fin.

1. Haga que el 'callback' asociado al tópico /topic/newpoint en lugar de mostrar una alerta, dibuje un punto en el canvas en las coordenadas enviadas con los eventos recibidos. Para esto puede dibujar un círculo de radio 1.

![lab3](https://user-images.githubusercontent.com/43153078/77557327-a2408880-6e87-11ea-8415-aeef5bb8f837.PNG) 

2. Ejecute su aplicación en varios navegadores (y si puede en varios computadores, accediendo a la aplicación mendiante la IP donde corre el servidor). Compruebe que a medida que se dibuja un punto, el mismo es replicado en todas las instancias abiertas de la aplicación.

![lab4](https://user-images.githubusercontent.com/43153078/77557883-4296ad00-6e88-11ea-9179-499985f384fd.PNG) .


![lab5](https://user-images.githubusercontent.com/43153078/77557886-43c7da00-6e88-11ea-917a-4da78f802cfb.PNG)

3. Haga commit de lo realizado, para marcar el avance de la parte 2.


## Parte III


1. Agregue un campo en la vista, en el cual el usuario pueda ingresar un número. El número corresponderá al identificador del dibujo que se creará.

![lab6](https://user-images.githubusercontent.com/43153078/77558554-129bd980-6e89-11ea-9c98-807665e04485.PNG)

2. Modifique la aplicación para que, en lugar de conectarse y suscribirse automáticamente (en la función init()), lo haga a través de botón 'conectarse'. Éste, al oprimirse debe realizar la conexión y suscribir al cliente a un tópico que tenga un nombre dinámico, asociado el identificador ingresado, por ejemplo: /topic/newpoint.25, topic/newpoint.80, para los dibujos 25 y 80 respectivamente.

![lab7](https://user-images.githubusercontent.com/43153078/77558910-850cb980-6e89-11ea-9ab3-7a20b7f91f50.PNG).

![lab8](https://user-images.githubusercontent.com/43153078/77558919-876f1380-6e89-11ea-9bed-cfdbb0fb331e.PNG).

3. De la misma manera, haga que las publicaciones se realicen al tópico asociado al identificador ingresado por el usuario.
4. Rectifique que se puedan realizar dos dibujos de forma independiente, cada uno de éstos entre dos o más clientes.
