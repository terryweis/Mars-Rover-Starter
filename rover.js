class Rover {
      constructor(position, mode = 'NORMAL', generatorWatts = 110){
        this.position = position
        this.mode = mode
        this.generatorWatts = generatorWatts
      };
      receiveMessage(message){
         let received = {
            message : message.name,
            results :  []
         };

 //cycle through the commands and if statements
 //STATUS
         for (let i = 0; i < message.commands.length; i++){
            if (message.commands[i].commandType === 'STATUS_CHECK'){
               received.results.push({
                  completed: true,
                  roverStatus: {mode:this.mode, generatorWatts: 110, position: this.position}
               });
            };  
         };
//MODE
         for (let i= 0; i < message.commands.length; i++){
            if (message.commands[i].commandType === 'MODE_CHANGE'){
               received.results[0].roverStatus.mode = message.commands[i].value 
               received.results.unshift({completed: true})
            };
          };
//MOVE
          for (let i =0; i < message.commands.length; i++ ){
            if (message.commands[i].commandType === 'MOVE'){
               if (received.results[0].roverStatus.mode === 'LOW_POWER'){
                  received.results.unshift({completed: false})
               }else{
                  received.results[0].roverStatus.position = message.commands[i].value
                  received.results.unshift({completed: true})
               }
            }
          }  
          return received 
         };
      };     


module.exports = Rover;