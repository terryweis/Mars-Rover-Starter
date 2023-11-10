const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
it("constructor sets position and default values for mode and generator Watts", function(){
let rover = new Rover(98382);
expect(rover.position).toBe(98382)
expect(rover.mode).toBe('NORMAL')
expect(rover.generatorWatts).toBe(110);
});

it("response returned by recieveMessage contains the name of the message",function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let received = rover.receiveMessage(message);
  expect(received.message).toBe('Test message with two commands');  
});

it("response returned by recieveMessage includes two results if two commands are sent in the mssage", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let received = rover.receiveMessage(message);
  expect(received.results.length).toEqual(2);
});

it("resonds correctly to status check command", function(){
  let commands = [ new Command ('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let received = rover.receiveMessage(message);
  expect(received.results[0].roverStatus).toEqual({mode:'NORMAL', generatorWatts: 110, position: 98382});
});

it("responds correctly to the mode change command", function(){
  let commands = [ new Command('MODE_CHANGE', 'LOW_POWER'), new Command ('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let received = rover.receiveMessage(message);
  expect(received.results[0].completed).toBe(true);
  expect(received.results[1].roverStatus).toEqual({mode: 'LOW_POWER', generatorWatts: 110, position: 98382});
});

it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
  let commands = [ new Command('MOVE', 98500 ), new Command ('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382, 'LOW_POWER');
  let received = rover.receiveMessage(message);
  expect(received.results[0].completed).toBe(false);
});

it("responds with the position for the move command", function(){
  let commands = [ new Command('MOVE', 98500), new Command ('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let received = rover.receiveMessage(message);
  expect(received.results[0].completed).toBe(true);
  expect(received.results[1].roverStatus.position).toEqual(98500)
})


});
