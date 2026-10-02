/*
Nakshatra Gupta
ISU Netid: ng1308
Sep 17th, 2026
Activity06 - Variables
*/

console.log("---- I am in V A R I A B L E S ----")

// Q1 : Is it permitted the next ?
console.log("Q1 ---------------")
var var1 = "Iowa";
console.log(var1);

var var1 = 124;
console.log(var1);

// Is it permitted ?
console.log("Yes");


// Q2 : Is it valid ?
console.log("Q2 ----------------");
let var2 = "Ames";
console.log(var2);

// let var2 = 124;

// Is it valid ?
console.log("No, SyntaxError: Identifier 'var2' has already been declared");


// Q3 : Is it valid ?
console.log("Q3 ----------------");
let var3 = "ISU";
console.log(var3);
var3 = 2023;
console.log(var3);
console.log("Valid ? Yes")


// Q4 : Explain the Error.
console.log("Q4 ----------------");
let var4;
// const var5;
console.log("What's the error : SyntaxError: Missing initializer in const declaration")


// Q5 : Explain the Error.
console.log("Q5 ----------------");
const var6 = 3.1415;
try {
  var6 = 2.8;
} catch (error) {
  console.log("What's the error :", error.message);
}


// Q6 : Explain the Error.
// let first name = "Sarfaraz";
console.log("Variable names cannot contain spaces");

// let 2numbers = [1,2];
console.log("Variable names cannot start with a number");

// let city-state = "Ames Iowa";
console.log("Variable names cannot contain a hyphen");


// Q7 : What !! ??
let mainCity = "DesMoines";
try {
  console.log("This is the Capital :", MainCity)
} catch (error) {
  console.log("....What's going on ? ....", error.message)
}


// Q8 : "let" and "const" scope vs "var" scope
if (5 === 5) {
  var var7 = 100;
}
console.log(var7);

if (5 === 5) {
  let var8 = 100;
}
try {
  console.log(var8);
} catch (error) {
  console.log(error.message);
}
console.log("... explain ... var is not block scoped, let is block scoped")
