# scheduler-ITA
Данная библиотека предназначена для работы с `http://ictis.sfedu.ru/rasp/`

## Установка 
Используя npm:    
`npm install scheduler-ITA --save`


Используя yarn:     
`yarn add scheduler-ITA`

## Об типах страниц на данном сайт

`http://ictis.sfedu.ru/rasp/HTML_AUDS/a4.htm` - HTML_AUDS означает, что расписание для аудитории  
`http://ictis.sfedu.ru/rasp/HTML/18.htm`  - HTML означает, что расписание для групп 
`http://ictis.sfedu.ru/rasp/HTML_PREPS/m18.htm` - HTML_PREPS означает, что расписание для преподавателей 


## Методы 

`getData(number, type = HTML)`    
Получение данных по заданному номеру с типом HTML по умолчанию, но можно использовать и другие типы как например 
HTML_PREPS и HTML_AUDS, под номером подразумевается число, например 18 в данном url `http://ictis.sfedu.ru/rasp/HTML/18.htm` 


`getName(number, type = HTML)`
Получение имени группы или объекта по заданному номеру с типом HTML по умолчанию, но можно использовать и другие типы как например 
HTML_PREPS и HTML_AUDS, под номером подразумевается число, например 18 в данном url `http://ictis.sfedu.ru/rasp/HTML/18.htm` 


`getDataForRoom(number, type = HTML_AUDS)`
Аналог метода getData, но по умолчанию тип запроса HTML_AUDS


`getDataForRoom(number, type = HTML_PREPS)`
Аналог метода getData, но по умолчанию тип запроса HTML_PREPS

## Примеры

```
const { getData } = require('scheduler-ita');

(async () => {
  const data = await getData(18);
  console.log('data',  data );
})();


```

