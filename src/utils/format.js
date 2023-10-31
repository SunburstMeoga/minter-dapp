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
