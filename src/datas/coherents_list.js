const coherents_list = [
  {
    name: 'N', //配套名字
    levelImg: '../../src/assets/images/coherent-n.png',
    type: '200', //配套價格
    releasePMT: '120', //釋放的pmt數量
    limit: '400', //收益上限
    incentiveRate: 0.1, //配套等級收益率
    shareholdings: 2, //貢獻值
    isSale: true
  },
  {
    name: 'R',
    levelImg: '../../src/assets/images/coherent-r.png',
    type: '600',
    releasePMT: '360',
    limit: '1200',
    incentiveRate: 0.2,
    shareholdings: 6,
    isSale: true
  },
  {
    name: 'SR',
    levelImg: '../../src/assets/images/coherent-sr.png',
    type: '2000',
    releasePMT: '1200',
    limit: '4000',
    incentiveRate: 0.3,
    shareholdings: 20,
    isSale: true
  },
  {
    name: 'SSR',
    levelImg: '../../src/assets/images/coherent-ssr.png',
    type: '6000',
    releasePMT: '3600',
    limit: '12000',
    incentiveRate: 0.35,
    shareholdings: 60,
    isSale: false
  },
  {
    name: 'UR',
    levelImg: '../../src/assets/images/coherent-ur.png',
    type: '20000',
    releasePMT: '1200',
    limit: '40000',
    incentiveRate: 0.4,
    shareholdings: 200,
    isSale: false
  }
]

export default coherents_list
