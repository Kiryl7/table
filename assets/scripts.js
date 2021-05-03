/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const users = [{\r\n        name: 'name1',\r\n        surname: 'surname1',\r\n        patronymic: 'patronymic1',\r\n        age: 26\r\n    },\r\n    {\r\n        name: 'name2',\r\n        surname: 'surname2',\r\n        patronymic: 'patronymic2',\r\n        age: 34\r\n    },\r\n    {\r\n        name: 'name3',\r\n        surname: 'surname3',\r\n        patronymic: 'patronymic3',\r\n        age: 52\r\n    },\r\n    {\r\n        name: 'name4',\r\n        surname: 'surname4',\r\n        patronymic: 'patronymic4',\r\n        age: 18\r\n    },\r\n    {\r\n        name: 'name5',\r\n        surname: 'surname5',\r\n        patronymic: 'patronymic5',\r\n        age: 10,\r\n        sex: 'male'\r\n    },\r\n]\r\n\r\nlet table = document.getElementById('table');\r\nlet count = users.length; //всего записей\r\nlet cnt = 2 //сколько отображаем сначала\r\nlet cnt_page = Math.ceil(count / cnt); //кол-во страниц\r\n\r\nfunction byField(field) {\r\n    return (a, b) => a[field] > b[field] ? 1 : -1;\r\n}\r\n\r\nfunction renderTH() {\r\n    let noUniqueField = [] // добавление всех полей в массив для заполнения шапки\r\n    for (let i = 0; i < users.length; i++) {\r\n        let temp = Object.getOwnPropertyNames(users[i])\r\n        noUniqueField.push(temp)\r\n    }\r\n    let flatNoUniqueField = noUniqueField.flat(Infinity)\r\n    let uniqueField = [] // сортировка по уникальности\r\n    for (let str of flatNoUniqueField) {\r\n        if (!uniqueField.includes(str)) {\r\n            uniqueField.push(str)\r\n        }\r\n    }\r\n    for (data in uniqueField) { //заполнение шапки\r\n        let th = document.createElement('div')\r\n        th.classList.add('d-th')\r\n        th.innerHTML = uniqueField[data] + ':'\r\n        table.appendChild(th)\r\n    }\r\n}\r\n\r\nfunction renderTD() {\r\n    users.forEach(obj => { // создание и заполнение ячеек таблицы \r\n        let tr = document.createElement('div');\r\n        tr.classList.add('d-tr')\r\n        for (data in obj) {\r\n            let td = document.createElement('div')\r\n            td.classList.add('d-td')\r\n            td.innerHTML = obj[data]\r\n            tr.appendChild(td)\r\n        }\r\n        table.appendChild(tr);\r\n    })\r\n}\r\n\r\nfunction renderPage() {\r\n    const paginator = document.querySelector(\".paginator\"); //выводим список страниц\r\n    let page = \"\";\r\n    for (let i = 0; i < cnt_page; i++) {\r\n        page += \"<span data-page=\" + i * cnt + \"  id=\\\"page\" + (i + 1) + \"\\\">\" + (i + 1) + \"</span>\";\r\n    }\r\n    paginator.innerHTML = page;\r\n}\r\n\r\nfunction renderTR() { //выводим первые записи {cnt}\r\n    const div_dTR = document.querySelectorAll(\".d-tr\");\r\n    for (let i = 0; i < div_dTR.length; i++) {\r\n        if (i < cnt) {\r\n            div_dTR[i].style.display = \"table-row\";\r\n        }\r\n    }\r\n}\r\n\r\nfunction pagination(event) { //листаем\r\n    const e = event || window.event;\r\n    const target = e.target;\r\n    const id = target.id;\r\n    const div_dTR = document.querySelectorAll(\".d-tr\");\r\n\r\n    if (target.tagName.toLowerCase() != \"span\") return;\r\n\r\n    let data_page = +target.dataset.page;\r\n    main_page.classList.remove(\"paginator_active\");\r\n    main_page = document.getElementById(id);\r\n    main_page.classList.add(\"paginator_active\");\r\n\r\n    let j = 0;\r\n    for (let i = 0; i < div_dTR.length; i++) {\r\n        if (i != data_page)\r\n            div_dTR[i].style.display = \"none\";\r\n\r\n    }\r\n    for (let i = data_page; i < div_dTR.length; i++) {\r\n        if (j >= cnt) break;\r\n        div_dTR[i].style.display = \"table-row\";\r\n        j++;\r\n    }\r\n}\r\n\r\nfunction more() {\r\n    const paginator = document.getElementById(\"pg1\")\r\n    let newPage = \"\"\r\n    cnt += 1\r\n    cnt_page = Math.ceil(count / cnt)\r\n    for (let i = 0; i < cnt_page; i++) {\r\n        newPage += \"<span data-page=\" + i * cnt + \"  id=\\\"page\" + (i + 1) + \"\\\">\" + (i + 1) + \"</span>\"\r\n    }\r\n    paginator.innerHTML = newPage\r\n}\r\n\r\nusers.sort(byField('age')) // сортировка по полям: name, surname, patronymic, age.\r\nrenderTH() //шапка таблицы \r\nrenderTD() //ячейки\r\nrenderTR() //строки\r\nrenderPage() //страницы\r\n\r\nlet main_page = document.getElementById(\"page1\");\r\nmain_page.classList.add(\"paginator_active\");\n\n//# sourceURL=webpack://tab/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;