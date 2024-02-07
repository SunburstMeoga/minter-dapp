const coherents_list = [
  {
    name: 'N', //配套名字
    id: 1,
    levelImg: '../../src/assets/images/200_500m.gif',
    type: '205', //配套價格
    releasePMT: '120', //釋放的pmt數量
    limit: '400', //收益上限
    incentiveRate: 0.1, //配套等級收益率
    shareholdings: 2, //貢獻值
    isSale: true
  },
  {
    name: 'R',
    id: 2,
    levelImg: '../../src/assets/images/600_500m.gif',
    type: '605',
    releasePMT: '360',
    limit: '1200',
    incentiveRate: 0.2,
    shareholdings: 6,
    isSale: true
  },
  {
    name: 'SR',
    id: 3,
    levelImg: '../../src/assets/images/2000_500m.gif',
    type: '2005',
    releasePMT: '1200',
    limit: '4000',
    incentiveRate: 0.3,
    shareholdings: 20,
    isSale: true
  },
  {
    name: 'SSR',
    id: 4,
    levelImg: '../../src/assets/images/6000_500m.gif',
    type: '6005',
    releasePMT: '3600',
    limit: '12000',
    incentiveRate: 0.35,
    shareholdings: 60,
    isSale: false
  },
  {
    name: 'UR',
    id: 5,
    levelImg: '../../src/assets/images/20000_500m.gif',
    type: '20005',
    releasePMT: '12000',
    limit: '40000',
    incentiveRate: 0.4,
    shareholdings: 200,
    isSale: false
  }
]

export default coherents_list
