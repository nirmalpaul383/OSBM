# OSBM.js
an option selector mechanism to select the best option against actual(unlabeled) dataset based on the previous training(Labeled) datasets ,written in pure/vanilla JavaScript.

.................................................................................................................................................................................

This is **OSBM** - **O**ption **S**elector based on the **B**est **M**atching. As the name suggests it is an option selector mechanism. **In which one or more options have to be provided as training
dataset** and later **if we provide actual dataset** in it, **it will** help to **select the best option based on the previous training dataset**. Its datasets(input) is mainly a numerical
array (2d or 1d).  If this dataset is to be a training dataset, then this dataset must have a label, and we will consider this label as an option or output of the dataset.Unlike
training datasets, actual datasets have no labels or outputs. To use OSBM, we must first provide one or more training dataset(s) and then the actual dataset. And from there it
is OSBM's job to provide best matching option(s) or label(s) to the actual dataset based on the training datasets and their labels(outputs).

## **How does this mechanism works?** ##
### **Here is a excel implemented version of OSBM:** ###
![OSBM Excel implemented version](OSBM%20implemented%20in%20excel.jpg)

.................................................................................................................................................................................

After receiving the training dataset and the actual dataset, it returns an object which basically has two properties which are wrtActual and wrtOptions. wrtActual: means
matching percentage with respect to actual input. wrtOptions: means matching percentage with respect to others options. These two properties will help us to understand which available option(s)/label(s) is(are) likely to best match with the actual input dataset.

.................................................................................................................................................................................

## How to use this library? ##
You must first link OSBM.js to your project, you can do that by using two ways:
* (1) you can either download/clone it and then use 'OSBM.js' file
* (2) or you can use it directly using **`https://cdn.jsdelivr.net/gh/nirmalpaul383/OSBM/OSBM.js`**
  For using it in browser/webpage you can use **``` <script src="https://cdn.jsdelivr.net/gh/nirmalpaul383/OSBM/OSBM.js"></script> ```**

Then you need to create a OSBM object usiing ` new OSBM ` keywords:
```JavaScript
let myApp = new OSBM();
```
After that store the traning dataSet(in this specific format) to the created OSBM object using ".train()" method:
```javascript
myApp.train(
  [
    {
      dataSet: [[]], // First Option 's input/dataSets (Numerical Array)
      output: "" // Label/Output(String) against the dataSets
    }, // First Option Object

    {
      dataSet: [[]], // Second Option 's input/dataSets (Numerical Array)
      output: "" // Label/Output(String) against the dataSets
    }, // Second Option Object

    // ...And so on ...

  ] // Main traning Array
);

```
Similarly actual datasets are also need to be stored in this format:
```JavaScript
let sampleActualDataset = [[]]; // Actual input/datasets (Numerical Array)
```
To returns the result you can can use
```JavaScript
myApp.run(sampleActualDataset);
```
method of the created OSBM object.

.................................................................................................................................................................................

## Here are some examples of how to use it: ##

### **Using it for pattern recognition:** ###
```JavaScript
// Using it for pattern recognition:

// Creating a new OSBM object
let myPatternRecognizer = new OSBM();

// Storing traning dataset in specific format with the ".train()" method
myPatternRecognizer.train([

  //Option 1
  {
    dataSet: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ],
    output: "Option1"
  },
  //Option 2
  {
    dataSet: [
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 0, 0]
    ],
    output: "Option2"
  },
  //Option 3
  {
    dataSet: [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [1, 1, 1, 1]
    ],
    output: "Option3"
  },
]) ;

// Storing actual dataset
let patternActual = [
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 1, 1]
];

// Output the result in the console
console.log(myPatternRecognizer.run(patternActual))
// Returns wrtOption: Option1=37.50%, Option2=27.50%, Option3=35%
//(Suggests that out of all the options, Option 1 matches the most, followed by Option 3 and finally Option 2.)

// Returns wrtActual: Option1=68.75%, Option2=43.75%, Option3=62.50% (Optionwise matching % with the actual input datasets)
```
.......................................................................

### **Using it for creating a OR_Gate:** ###
```JavaScript
// Using it for creating a OR_Gate:

// Creating a new OSBM object
let myORGate = new OSBM;

// Storing traning dataset in specific format with the ".train()" method
myORGate.train([
  {
    dataSet: [[0, 0]],
    output: "Zero"
  },
  {
    dataSet: [[0, 1]],
    output: "One"
  },
  {
    dataSet: [[1, 1]],
    output: "One"
  },
  {
    dataSet: [[1, 0]],
    output: "One"
  }
]);

// Storing actual dataset
let OR_gate_actualSet = [[1,0]]

// Output the result in the console
console.log(myORGate.run(OR_gate_actualSet))
// Returns wrtOption: Zero: 25% , One: 75% (Suggests that out of all the options(Zero & One), One matches the most.)
// Returns wrtActual: Zero: 50% , One: 100% (Optionwise matching % with the actual input datasets)
```
.......................................................................

### **Using it for predicting the darkness of a color:** ###
```JavaScript
// Using it for predicting the darkness of a color

// Creating a new OSBM object
let colorDarkness = new OSBM;

// Storing traning dataset in specific format with the ".train()" method
colorDarkness.train([
  {
    dataSet: [[255/255, 255/255, 255/255]],
    output: "Light"
  },
  {
    dataSet: [[192/255, 192/255, 192/255]],
    output: "Light"
  },
  {
    dataSet: [[65/255, 65/255, 65/255]],
    output: "Dark"
  },
  {
    dataSet: [[0, 0, 0]],
    output: "Dark"
  }
]) ;

// Storing actual dataset
let RGB_Actual = [[0, 0, 128/255]]

// Output the result in the console
console.log(colorDarkness.run(RGB_Actual))
// Returns wrtOption: Light: 41% , Dark: 59% (Suggests that out of all the options(Light & Dark), Dark matches the most.)
// Returns wrtActual: Light: 41% , Dark: 83% (Optionwise matching % with the actual input datasets)
```
.................................................................................................................................................................................

**In addition to these examples, it can be used in many other ways**

If you like this project please give a star to these projects. https://github.com/nirmalpaul383/OSBM

This project is originally made by me(N Paul). My **github profile:** https://github.com/nirmalpaul383/ 

My **youtube page:** https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/
This is an open source program. You are welcomed to modify it...

If you want to support me please give a like to our **facebook page:** https://facebook.com/a.new.way.Technical/

.................................................................................................................................................................................
