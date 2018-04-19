function getPageFromServer(pageIndex) {
  console.log(`calls ${pageIndex}`);
  return new Promise(function(resolve) {
    let pageData = [];
    for (let i = pageIndex * 25; i < ((pageIndex + 1) * 25); i++) {
      pageData.push(i);
    }
    resolve(pageData)
  })
}

function getDataRangeFromServer(startIndex, endIndex) {
  // return empty array if startIndex is larger than end index
  if (startIndex > endIndex) {
      return []
    }

  return new Promise(function(resolve) {

    let firstPageIndex = Math.floor(startIndex / 25)
    let lastPageIndex = Math.floor(endIndex / 25)

    let promises = []
    let i = firstPageIndex;
    while(i <= lastPageIndex) {
      promises.push(getPageFromServer(i))
      i += 1
    }

    let pageData = Promise.all(promises).then(res => {
      res = [].concat.apply([], res)
      res = res.slice(res.indexOf(startIndex), res.indexOf(endIndex) + 1)
      return res
    })

    resolve(pageData)
  })
}

getDataRangeFromServer(0, 1).then(pageData => console.log(pageData))
// returns [0, 1], calls getPageFromServer 1 time with pageIndex 0

// getDataRangeFromServer(0, 49).then(pageData => console.log(pageData))
// returns [0..49], calls getPageFromServer 2 times  with pageIndex 0, 1

// getDataRangeFromServer(5, 51).then(pageData => console.log(pageData))
// returns [5..51], calls getPageFromServer 3 times  with pageIndex 0, 1, 2

// getDataRangeFromServer(50, 99).then(pageData => console.log(pageData))
// returns [50..99], calls getPageFromServer 2 times with pageIndex 2, 3

getDataRangeFromServer(55, 99).then(pageData => console.log(pageData))
// returns [55..99], calls getPageFromServer 2 times with pageIndex 2, 3



// Without promises and recusively
//
// function getPageFromServer1(pageIndex) {
//   let pageData = [];
//   for (let i = pageIndex * 25; i < ((pageIndex + 1) * 25); i++) {
//     pageData.push(i);
//   }
//   return pageData
// }
//
// function getDataRangeFromServer1(startIndex, endIndex) {
//   console.log("gets called");
//   if (startIndex >= endIndex) {
//     return []
//   }
//
//   let pageIndex = Math.floor(startIndex / 25);
//   let pageData = getPageFromServer1(pageIndex);
//
//   pageData = pageData.concat(getDataRangeFromServer1(startIndex + 25, endIndex))
//
//   return pageData.slice(pageData.indexOf(startIndex), pageData.indexOf(endIndex) + 1)
//
// }

// console.log(getDataRangeFromServer1(0,49))
