export default (certificates, playerName, type, urls) => {


      //add images to Lightbox
      for (var index = 0; index < urls.length; index++) {
        const imgWrapper = document.createElement('div');
        imgWrapper.setAttribute('class', "imageWrapper");
        //const img = document.createElement('img');
        const img = new Image();
        img.src = urls[index];
        img.onload = function() { 
          var loading = document.getElementById('loading'); 
          loading.setAttribute('class', "hide");
          var close = document.getElementById('closeLightbox'); 
          close.classList.add("show");
        }
        const id = "myimage" + index;
        img.setAttribute('id', id);
        const imagesWrapper = document.getElementById('lightBoxImageWrapper');
        imagesWrapper.appendChild(imgWrapper);
        imgWrapper.appendChild(img);
        
        //img.setAttribute("src", urls[index]);
      
        
      }

      //open LightBox
      const lightbox = document.getElementById('certLightbox');
      lightbox.classList.add('lightboxOn');

      //if you click 
      //while the lightbox is open
      lightbox.addEventListener("click",function(event){
        //console.dir(event.target.tagName);
        //on an image
        if(event.target.tagName === "IMG"){
        //then the magnifying glass will toggle on for the image id that you are hovering on
          //console.log(event.target.id);
          magnify(event.target.id, 2, event);
          //if you click again, the magnifying glass will disappear
        }
      });
      function magnify(imgID, zoom, event) {
        var img, glass, w, h, bw;
        var closeCert = document.getElementById("closeCert");
        img = document.getElementById(imgID);
        //console.log(img);
        /*create magnifier glass:*/
        if(!document.getElementById("img-magnifier-glass")){
          var pos, x, y;
          glass = document.createElement("DIV");
          /*get the cursor's x and y positions:*/
          pos = getCursorPos(event);
          x = pos.x;
          y = pos.y;
          //console.log(x,y)
          /*set the position of the magnifier glass:*/
          glass.style.left = x + "px";
          glass.style.top = y + "px";
         
          glass.setAttribute("class", "img-magnifier-glass");
          glass.setAttribute("id", "img-magnifier-glass");
          /*insert magnifier glass:*/
          img.parentElement.insertBefore(glass, img);
        } else {

          // glass = document.getElementById("img-magnifier-glass");
           //console.log(document.getElementById("img-magnifier-glass"));
        //   get the cursor's x and y positions:
        //   pos = getCursorPos(event);
        //   x = pos.x;
        //   y = pos.y;
        //   console.log(x,y)
       }
        /*set background properties for the magnifier glass:*/
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;
        
        /*execute a function when someone moves the magnifier glass over the image:*/
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);
        /*and also for touch screens:*/
        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);

        closeCert.addEventListener("mouseenter", demagnify);

        function moveMagnifier(e) {
          //console.log(e)
          var pos, x, y;
          /*prevent any other actions that may occur when moving over the image*/
          e.preventDefault();
          /*get the cursor's x and y positions:*/
          pos = getCursorPos(e);
          x = pos.x;
          y = pos.y;
         
          /*prevent the magnifier glass from being positioned outside the image:*/
          //if (x > img.width - (w / zoom) - 50) {x = img.width - (w / zoom) - 50;}
          if (x > img.width - (w / zoom) + 50) {demagnify();}
          if (x < (w / zoom) - 100) {demagnify()}
          if (y > img.height - (h / zoom) + 50) {demagnify()}
          if (y < (h / zoom) - 50) {demagnify()}
          /*set the position of the magnifier glass:*/
          glass.style.left = (x - w) + "px";
          glass.style.top = (y - h) + "px";
          /*display what the magnifier glass "sees":*/
          glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
          glass.addEventListener("click", demagnify);
        }
        function getCursorPos(e) {
          var a, x = 0, y = 0;
          e = e || window.event;
          /*get the x and y positions of the image:*/
          a = img.getBoundingClientRect();
          /*calculate the cursor's x and y coordinates, relative to the image:*/
          x = e.pageX - a.left;
          y = e.pageY - a.top;
          /*consider any page scrolling:*/
          x = x - window.pageXOffset;
          y = y - window.pageYOffset;
          return {x : x, y : y};
        }
        function demagnify(){
          //console.log('no magnifications here');
          if(glass){
            glass.removeEventListener("mousemove", moveMagnifier);
            glass.removeEventListener("touchmove", moveMagnifier);
            glass.remove();
          }
          if(img){
            img.removeEventListener("mousemove", moveMagnifier);
            img.removeEventListener("touchmove", moveMagnifier);
            img = '';
          }
        }
      }
}