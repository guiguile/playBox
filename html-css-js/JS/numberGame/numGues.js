// Number guessing game that shows response to your guess, as well as calculates your attempt. 

//set the min and max value, produce the answer.
const min = 1;
const max = 100;
const answer = Math.round(Math.random() * 10);

let attempts = 0;

while () {
  let guess = window.prompt(`Take a guess between ${min} and ${max}: `);
  guess = Number(guess);
  console.log(typeof guess, guess)



}



