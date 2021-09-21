/**
This project is originally made by me(N Paul).My github profile https: //github.com/nirmalpaul383/ My youtube page https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/
This is an open source program. You are welcomed to modify it...If you want to support me please give a like to our facebook page https://facebook.com/a.new.way.Technical/
OSBM(Option Selector based on the Best Matching) by N Paul. This project is originally made by me (N Paul) (https://github.com/nirmalpaul383).
You can download source files from my github profile https://github.com/nirmalpaul383/OSBM/ .

If you like these project please give a star to these projects. https://github.com/nirmalpaul383/OSBM/
My YouTube Page: https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/
   FaceBook Page: https://www.facebook.com/a.New.Way.Technical/
   GitHub Page: https://github.com/nirmalpaul383
**/

// Class definition for OSBM(Option Selector based on the Best Matching)
class OSBM {

  // Function(Method) definition for storing training dataset to the memory property of the OSBM object
  train(trainingDataSet) {

    // Here "this" means OSBM class 's object
    this.memory = trainingDataSet;

  }

  // Function(Method) definition for testing whether two arrays are comparable or not
  isCompararableOrNot(traning, actual) {

    // For storing the test result in True or False
    let YesOrNo = true;

    // This loop will be applied to each element of the traning array(1 level deep).
    traning.forEach((upperValue, upperIndex) => {

      // This will compare the length of the dataset array of each element of the training array with the length of the actual array (1 level deep).
      if (upperValue.dataSet.length != actual.length) {

        // Result will be set to false if any mis match occures.
        YesOrNo = false;

      }
      else {

        // This loop will be applied to each element of the each element of the traning array(2 level deep).
        upperValue.dataSet.forEach((lowerValue, lowerIndex) => {

          // This will compare the length of each element of the dataset array of each element of the training array with the length of each element of the actual array (2 Level deep).
          if (lowerValue.length != actual[lowerIndex].length) {

            // Result will be set to false if any mis match occures.
            YesOrNo = false;


          }
        })
      };
    })

    // Returns the result
    return YesOrNo;
  };

  //Function(Method) for calculating the mis matched value between the two 2d arrays and returns difference value
  misMatchedCal(input1, input2) {

    // For temporay storing difference(misMatch value) betwwen same positioned element in two 2D arrays
    let temp = 0;

    //This loop will be applied to each element of the input array(1 level deep).
    input1.forEach((upperValue, upperIndex) => {

      //This loop will be applied to each element of the each element of the input array(2 level deep).
      input1[upperIndex].forEach((lowerValue, lowerIndex) => {

        // We need the sum of the absolute differences between the values of the same positioned elements of the two 2D arrays
        temp += Math.abs(input1[upperIndex][lowerIndex] - input2[upperIndex][lowerIndex])
      })
    })

    return temp; //Returns the mismatch value of input1 array and input2 array
  };

  // Function(Method) for comparing actual data set with all available training dataset
  run(actual) {

    // For storing OSBM 's memory to the "traning" variable
    let traning = this.memory;

    // If the value of traning variable is a falsy(e.g undefined) value then the function will not be executed any further and the user will be shown the related message.
    if(!(traning)) {
      return `To use OSBM, you must first provide a training dataset`
    }

    // If the size of the training data set and the actual data set are different, the function will not be executed any further and the user will be shown the related message.
    // Here "this" means OSBM Class
    if (!((this.isCompararableOrNot(traning, actual)))) {

      return `Training and actual DataSet size should be the same length`;

    };

    // After comparing each training data sets with the actual data set, this array will be used to store the results(mis Matched values) in that order respectively
    let misMatchValue = [];

    // For storing complement value of the misMatchValue
    let complementryValue = [];

    // For storing result: Matching option(in %) with restpect to other avilible option(s)
    let result_wrtOption = {};

    // For storing result: Option wise matching (in %) with restpect to actual input
    let result_wrtActual = {};

    // For storing all results: result_wrtOption , result_wrtActual
    let result = {};


    // For comparing each training data sets with the actual data set and storing the results(misMatchedValues) in misMatchValue array(in the comparing order respectivly)
    traning.forEach((value, index) => {
      misMatchValue[index] = this.misMatchedCal(traning[index].dataSet, actual);
    });


    // For storing sum value of all mis match value
    let sumMisMatch = 0;
    misMatchValue.forEach((value, index) => {
      sumMisMatch += value;
    });


    // For calculating and storing complementery value of the misMatchValue
    misMatchValue.forEach((value, index) => {
      complementryValue[index] = sumMisMatch - value
    });


    // For storing sum value of all complementery value
    let sumComplementery = 0;
    complementryValue.forEach((value, index) => {
      sumComplementery += value;
    });


    // For calculating option wise matching % with respect to actual input
    // For calculating avialible 2D Array length
    let avilibleLength2D = traning[0].dataSet.length * traning[0].dataSet[0].length;

    traning.forEach((value, index) => {

      // For temporay storing output label
      let temp = traning[index].output;

      // For temporary storing the calulation result
      let temp1 = ((avilibleLength2D - misMatchValue[index]) / avilibleLength2D) * 100;

      // For storing option wise matching % with respect to actual input
      // If there is any previous matching % in the head of the same label(Output/Option), then the max value(Maximum of old matching % & new matching %) will be recorded in that label(Output/Option).
      // If result[temp] is truthy value only then this if condition will be satisfied(Note: undefined is a falsy value)
      if (result_wrtActual[temp]) {
        result_wrtActual[temp] = Math.max(result_wrtActual[temp], temp1);
      }
      // Otherwise a new label(Output/Option) head will be created and the result will be kept in it
      else {
        result_wrtActual[temp] = temp1;
      };
    })



    // For calculating appropiate option in compare with all options and storing the result according to the output label
    traning.forEach((value, index) => {

      // For temporay storing output label
      let temp = traning[index].output;

      // For temporary storing the calulation result
      let temp1 = 0;

      // If the value of the sumComplementary is zero, then 100(%) will be divided equally in all the options.
      // For preventing divide by 0 situation
      if (sumComplementery == 0) {
        temp1 = 100 / traning.length;
      }
      else {
        temp1 = (complementryValue[index] / sumComplementery) * 100;
      }

      // If there is any previous result in the head of the same label(Output/Option), then this new result will be added(+) to the old result.
      // If result[temp] is truthy value only then this if condition will be satisfied(Note: undefined is a falsy value)
      if (result_wrtOption[temp]) {
        result_wrtOption[temp] = result_wrtOption[temp] + temp1
      }
      // Otherwise a new label(Output/Option) head will be created and the result will be kept in it
      else {
        result_wrtOption[temp] = temp1;
      }
    });


    // For storing all results: result_wrtOption , result_wrtActual into result object
    result['wrtOption'] = result_wrtOption;
    result['wrtActual'] = result_wrtActual;

    // Returns the result object
    return result;

  };

} ;

