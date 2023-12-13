export function FormatAmount(value) {
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

export function FilterAddress(value, startIndex = 6, endIndex = 7) {
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

export function FilterTime(value) {
  var timestamp = new Date(value).getTime()
  let date = new Date(parseInt(timestamp))
  let Year = date.getFullYear()
  let Moth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let Hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let Minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let Sechond = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let GMT = Year + '-' + Moth + '-' + Day + '   ' + Hour + ':' + Minute + ':' + Sechond

  return GMT
}
