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
 
 for (let i = 0; i < message.commands.length; i++){
   if (message.commands[i].commandType === 'STATUS_CHECK'){
      received.results.push({
         completed: true,
         roverStatus: {mode:this.mode, generatorWatts: this.generatorWatts, position: this.position}
      });
   };  
   if (message.commands[i].commandType === 'MODE_CHANGE'){
          this.mode = message.commands[i].value 
          received.results.push({completed: true})
       };
   if (message.commands[i].commandType === 'MOVE'){
           if (this.mode === 'LOW_POWER'){
              received.results.push({completed: false})
           }else{
              this.position = message.commands[i].value
              received.results.push({completed: true})
           }
        }
};
return received;      
};

      };     


module.exports = Rover;