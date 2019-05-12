const request = require('request'),
      cheerio = require('cheerio'),
      url = 'http://ictis.sfedu.ru/rasp/HTML/18.htm';

const quantityPinDay = 5;
const quantityPinCell = 3;

const getElement = (element) => {
  if (Array.isArray(element)){
    if(element.length === quantityPinDay || element.length === quantityPinCell){
      let flag = true;
      let childrenData = element[element.length-1];
      while( flag ){
        let { children } = childrenData;
        if (!children || !children.length) {
          let { data } = childrenData;
          flag = false;
          return data;
        } else {
          childrenData = children[0];
        }
      }

    }
  } else {
    return {};
  }
}


request(url, function (error, response, body) {
  const status = 'Ok';
  if (!error) {
    const  $ = cheerio.load(body);
    const startWeekAndName = $("p", body).first().text().split(':');
    const firstWeek = startWeekAndName[2].split('-')[0];
    const name = startWeekAndName[1].split(' ')[0];
    const tables = $("table", body).toArray();
    const schedule = tables.map( table => {
      let prettiedTable = table.children[1].children;
      const elData = prettiedTable.map( tr => {
        const { type } = tr;
        if(type === 'tag'){
          const trData = tr.children.map( td => {
            const { children: tdInfo = {}, type: curType = 'tag' } = td;
            if(curType === 'tag'){
              const data =   getElement(tdInfo);
              console.log("Abra", data);
            }
          });
        }
      });
      console.log("Abra",  table);
    });


    return {name, firstWeek, status}
  } else {
    return {status: 'Bad'}
  }
});


exports.getData = function(number) {

};


exports.getName = function(number) {
  request(`${url}${number}.htm`, function (error, response, body) {
    const status = 'Ok';
    if (!error) {
      const  $ = cheerio.load(body);
      const startWeekAndName = $("p", body).first().text().split(':');
      const name = startWeekAndName[1].split(' ')[0];
      return {name, status}
    } else {
      return {name: '', status: 'Bad'}
    }
  });
};