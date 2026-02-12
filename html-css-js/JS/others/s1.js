// infinite prompt until desired value is input.


let get = "";

function isValidEmail(email) {

  console.log(email.includes("@")? true:false);

  return email.includes("@")? true:false;

}

while (get === "" || get === null) {
  get = window.prompt("What's your email? ");

  if (get !== null) {
    if (isValidEmail(get)) {
      console.log(`isValid ${isValidEmail(get)}`);
      window.alert('Thk you for the email');
      break;
      } else {
      get = "";
      window.alert('Pls enter a valid email');}
  } else window.alert('At least give one before you go');
}