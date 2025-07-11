// a function to slice an array, i will use it to slice my data array so i can render each four cards(FAQ Items)
// in a seperated div, the "arrSize" is the desired size of the array's chunks and "arr" is the original array
// and it's REUSEABLE anywhere

function sliceArray(arr: any[], arrSize: number): any[][] {
  const result: any[][] = [];
  for (let i = 0; i < arr.length; i += arrSize) {
    result.push(arr.slice(i, i + arrSize));
  }
  return result;
}

export default sliceArray;
