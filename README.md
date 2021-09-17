# OSBM
an option selector mechanism to select the best option against actual(unlabeled) dataset based on the previous training(Labeled) datasets.

.................................................................................................................................................................................

This is OSBM - Option Selector Based on the Best Matching. As the name suggests it is an option selector mechanism. In which one or more options have to be provided as training
dataset and later if we provide actual dataset in it, it will help to select the best option based on the previous training dataset. Its datasets(input) is mainly a numerical
array (2d or 1d).  If this dataset is to be a training dataset, then this dataset must have a label, and we will consider this label as an option or output of the dataset.Unlike
training datasets, actual datasets have no labels or outputs. To use OSBM, we must first provide one or more training dataset(s) and then the actual dataset. And from there it
is OSBM's job to provide best matching option(s) or label(s) to the actual dataset based on the training datasets and their labels(outputs). How does this mechanism works?

Here is a excel implemented version of OSBM:
![OSBM Excel implemented version](https://raw.githubusercontent.com/nirmalpaul383/OSBM/main/OSBM%20implemented%20in%20excel.jpg)

.................................................................................................................................................................................

After receiving the training dataset and the actual dataset, it returns an object which basically has two properties which are wrtActual and wrtOptions. wrtActual: means
matching percentage with respect to actual input. wrtOptions: means matching percentage with respect to others options. These two properties will help us to understand which available option(s)/label(s) is(are) likely to best match with the actual input dataset.

.................................................................................................................................................................................

How to use this library?
You must first link OSBM.js to your project, you can do that by using two ways:
(1) you can either download/clone it and then use 'OSBM.js' file
(2) or you can use it directly using `https://cdn.jsdelivr.net/gh/nirmalpaul383/OSBM/OSBM.js`
For using it in browser/webpage you can use ``` <script src="https://cdn.jsdelivr.net/gh/nirmalpaul383/OSBM/OSBM.js"></script> ```

Then you need to create a OSBM object usiing ` new OSBM ` keywords:
```JavaScript
let myApp = new OSBM;
```
After that store the traning dataset in this format:
```javascript
let sampleTraningDatasets = [
  {
    dataset: [[]], // First Option 's input/datasets (Numerical Array)
    output: "" // Label/Output(String) against the datasets
  }, // First Option Object

  {
    dataset: [[]], // Second Option 's input/datasets (Numerical Array)
    output: "" // Label/Output(String) against the datasets
  }, // Second Option Object

  // ...And so on ...

]; // Main traning Array

```
Similarly actual datasets are also need to be stored in this format:
```JavaScript
let sampleActualDataset = [[]]; // Actual input/datasets (Numerical Array)
```
To returns the result you can can use
```JavaScript
myApp.compare(sampleTraningDatasets , sampleActualDataset);
```
method of the created OSBM object.

.................................................................................................................................................................................

Here are some examples of how to use it:

Using it for pattern recognition:
```JavaScript
// Using it for pattern recognition:

// Creating a new OSBM object
let myPatternRecognizer = new OSBM;

// Storing traning dataset in specific format
let patternTraning = [

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
] ;

// Storing actual dataset
let patternActual = [
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 1, 1]
];

// Output the result in the console
console.log(myPatternRecognizer.compare(patternTraning, patternActual))
// Returns wrtOption: Option1=37.50%, Option2=27.50%, Option3=35% (Suggests that out of all the options, Option 1 matches the most, followed by Option 3 and finally Option 2.)
// Returns wrtActual: Option1=68.75%, Option2=43.75%, Option3=62.50% (Optionwise matching % with the actual input datasets)
```
