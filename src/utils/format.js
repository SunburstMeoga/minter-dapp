export function formatAmount(value) {
  //   let value = '234234.9867879'
  if (!value) {
    value = '0'
  }
  let fixedNumber = Number(value).toFixed(4)
  let fixedStr = fixedNumber.toString()
  let pointOffside = fixedStr.slice(-4)
  let pointPreStr = fixedStr.slice(0, -5)
  let pointPre = String(pointPreStr)
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ',') + prev
    })
  return { pointPre: pointPre, pointOffside: pointOffside }
}

export function filterAddress(value, startIndex = 6, endIndex = 7) {
  // console.log("value", value);
  if (value === undefined || value === null) return
  let arr = value.split('')
  let targetStr
  let targetArr = []
  arr.map((item, index) => {
    if (index <= startIndex || index >= arr.length - endIndex) {
      targetArr.push(item)
    }
  })
  targetArr.splice(endIndex, 0, '...')
  targetStr = targetArr.join('')
  return targetStr
}
