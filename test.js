function getPageFromServer(pageIndex) {
  return new Promise(function(resolve) {
    let pageData = [];
    for (let i = pageIndex * 25; i < ((pageIndex + 1) * 25); i++) {
      pageData.push(i);
    }
    resolve(pageData)
  })
}


function getDateRangeFromServer(startIndex, endIndex) {
  console.log("gets called");
  return new Promise(function(resolve) {
    let pages = [];
    let begin = Math.floor(startIndex / 25)
    let promise = getPageFromServer(begin).then(pageData => {

      resolve(pageData.then(res => {
        console.log(res);
      }))
    })
  })
}

// function getPageFromServer1(pageIndex) {
//   let pageData = [];
//   for (let i = pageIndex * 25; i < ((pageIndex + 1) * 25); i++) {
//     pageData.push(i);
//   }
//   return pageData
// }
//
// function getDateRangeFromServer1(startIndex, endIndex) {
//   console.log("gets called");
//   if (startIndex >= endIndex) {
//     return []
//   }
//
//   let pageIndex = Math.floor(startIndex / 25);
//   let pageData = getPageFromServer1(pageIndex);
//
//   pageData = pageData.concat(getDateRangeFromServer1(startIndex + 25, endIndex))
//
//   return pageData.slice(pageData.indexOf(startIndex), pageData.indexOf(endIndex) + 1)
//
// }

// console.log(getDateRangeFromServer1(0,49))
