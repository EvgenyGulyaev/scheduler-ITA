const
  cheerio = require('cheerio'),
  url = 'http://ictis.sfedu.ru/rasp/',
  html = 'HTML',
  htmlAuds = 'HTML_AUDS',
  htmlPreps = 'HTML_PREPS',
  _get = require('lodash.get'),
  axios = require('axios'),
  _chunk = require('lodash.chunk'),
  iconv = require('iconv-lite');


const getContent = (p) => {
  const schedule = p.map(el => {
    const data = _get(el, 'children[0]', {});
    let value = _get(data, 'children[0].data', '');
    if (!value) {
      value = _get(data, 'data', '')
    }
    if (!value) {
      value = _get(data, 'children[0].children[0].children[0].data', '')
    }
    return value
  });
  return _chunk(schedule, 65)
}

const getNameId = ($, body) => {
  const startWeekAndName = $("p", body).first().text().split(':');
  const firstWeek = startWeekAndName[2].split('-')[0];
  const name = startWeekAndName[1].split(' ')[1];
  return { name, firstWeek }
}

const getDataForType = async (number, type = html) => {
  try {
    let { data } = await axios.get(`${url}${type}/${number}.htm`, {
      headers: {
        "Content-Type": "text/html; charset=windows-1251"
      },
      responseType: 'arraybuffer'
    });
    data =  iconv.decode(data, 'windows-1251');

    const status = 'Ok';
    const $ = cheerio.load(data);
    const nameData = getNameId($, data);
    const p = $("p", data).toArray();
    const schedule = getContent(p);
    return { ...nameData, status, schedule }
  }
  catch (e) {
    console.log('error', e);
    return { status: 'Bad' }
  }
};

const getData = (number, type = html) => getDataForType(number, type);

const getDataForRoom = (number, type = htmlAuds) => getDataForType(number, type);

const getDataForTeacher = (number, type = htmlPreps) => getDataForType(number, type);

const getName = async (number, type = html) => {
  try {
    const { data } = await axios.get(`${url}${type}/${number}.htm`);
    const status = 'Ok';
    const $ = cheerio.load(data);
    const { name } = getNameId($, data);
    return { name, status }
  }
  catch (error) {
    console.log('error', error);
    return { name: '', status: 'Bad' }
  }
};

module.exports = {
  getName,
  getDataForTeacher,
  getData,
  getDataForRoom,
}
