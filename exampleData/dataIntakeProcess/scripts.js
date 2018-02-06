const DataIntakeApp = {};

$(document).ready(function(){
   console.log('oh hi there');
   DataIntakeApp.data = (function() {
        $.ajax({
            'url': "./players0112.json",
            'dataType': "json",
            'success': function(data) {
               console.log(data)
                var json = data;
                DataIntakeApp.acceptibleFormatKeys(data);
            }
        });
        
    })();

});

DataIntakeApp.acceptibleFormatKeys = function(players){
   var keys = Object.keys(players);
   var headings = Object.keys(players[keys[0]]);
   var acceptibleHeadings = [];

   headings.map((heading) => {
      //remove spaces and special characters
      const noSpaces = heading.replace(/[^\w]/gi, '').split('');
      //remove first capital and make it lowercase
      const firstLetter = noSpaces.shift().toLowerCase();
      //add lowercase back onto letter array
      noSpaces.unshift(firstLetter);
      const camelCase = noSpaces.join('');
      //push heading into new heading array
      acceptibleHeadings.push(camelCase)
   });
   console.log(acceptibleHeadings);

   const acceptiblePlayers = {};
   keys.map((key) => {
      let i = 0;
      const newPlayer = {};
      headings.map((heading) => {
         const value = players[key][heading];
         const newheadingkey = acceptibleHeadings[i];
         newPlayer[newheadingkey] = value;
         i++
      }) 

      acceptiblePlayers[key] = newPlayer;
   });
   var jsonStr = JSON.stringify(acceptiblePlayers);
   document.body.innerHTML = jsonStr;
   return acceptiblePlayers;
}