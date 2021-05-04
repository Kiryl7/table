const users = [{
    name: 'name1',
    surname: 'surname1',
    patronymic: 'patronymic1',
    age: 26
},
{
    name: 'name2',

    patronymic: 'patronymic2',
    age: 34
},
{
    name: 'name3',
    surname: 'surname3',
    patronymic: 'patronymic3',
    age: 52
},
{
    name: 'name4',
    surname: 'surname4',
    patronymic: 'patronymic4',
    age: 18
},
{
    name: 'name5',
    surname: 'surname5',
    patronymic: 'patronymic5',
    age: 10,
    sex: 'male'
},
]

const byField = (field) => {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

class Table{
    constructor(table, count, cnt, cnt_page, tempUsers) {
        this.table = table;
        this.count = count;
        this.cnt = cnt;
        this.cnt_page = cnt_page;
        this.tempUsers = tempUsers;
    }

    renderAll() {
        this.renderTH()
        this.renderTD()
        this.renderPage()
    }

    setListeners() {
        const AllTh = document.querySelectorAll('.d-th')

        for (let i = 0; i < AllTh.length; i++) { //вешаем на все th по обработчику
            AllTh[i].onclick = (field) => this.sortByField(field)
        }
    }

    renderTH() { //заполнение шапки
        let uniqueField = Object.keys(users.reduce(function(result, obj) {
            return Object.assign(result, obj);
          }, {}))
        for (let data in uniqueField) {
            let th = document.createElement('div')
            th.classList.add('d-th')
            th.innerHTML = uniqueField[data]
            th.id = uniqueField[data]
            this.table.appendChild(th)
        }
    }

    sortByField(field) { // сортировка по полям
        let th = document.querySelectorAll('.d-th')
        for (let i = 0; i < th.length; i++) {
            th[i].style.color = 'black'
        }
        document.getElementById(field.target.innerHTML).style.color = 'red'
        users.sort(byField(field.target.innerHTML))
        this.renderTD()
    }


    renderTD() { // создание и заполнение ячеек таблицы
        this.tableDisplay()
        let k = 0
        let th = document.querySelectorAll('.d-th')
        if(document.querySelector('.d-tr')) {
            let trLenght = document.querySelectorAll('.d-tr').length
            for(let x = 0; x < trLenght; x++) {
                let tr = document.getElementById('tr' + x)
                this.table.removeChild(tr)
            }
        }
        this.tempUsers.forEach((obj, i) => {
            let tr = document.createElement('div');
            tr.classList.add('d-tr')
            tr.id = 'tr' + i
            let p = 0
            for (let y = 0; y < th.length; y++) {
                let thId = th[y].id
                let obj_key = Object.keys(obj)
                let td = document.createElement('div')
                td.classList.add('d-td')
                td.id = 'td' + k
                if(thId == obj_key[p]) {
                    td.innerHTML = obj[thId]
                    tr.appendChild(td)
                    p++
                }
                    else {
                        td.innerHTML = ''
                        tr.appendChild(td)
                    }
                k++
            }
            this.table.appendChild(tr)
        })
    }

    renderPage() {
        const paginator = document.querySelector(".paginator"); //выводим список страниц
        let page = ""
        for (let i = 0; i < this.cnt_page; i++) {
            page += "<span data-page=" + i * this.cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>"
        }
        paginator.innerHTML = page
    }

    more() { //добавление отображаемых строк на одной странице
        if (this.cnt >= users.length) return
        this.cnt += 1
        this.cnt_page = Math.ceil(this.count / this.cnt)
        this.renderTD()
        this.renderPage()
    }

    less() { //уменьшение отображаемых строк на одной странице
        if (this.cnt <= 1) return
        this.cnt -= 1
        this.cnt_page = Math.ceil(this.count / this.cnt)
        this.renderPage()
        this.renderTD()
    }

    tableDisplay() { //копируем часть массива для рендера
        let activePage = 1
        let numActivePage = null
        if(document.querySelector('.paginator_active')) activePage = document.querySelector('.paginator_active')
        if(activePage == 1) numActivePage = 1
            else numActivePage = activePage.textContent 
        let startPos = (this.cnt * numActivePage) - this.cnt 
        this.tempUsers = users.slice(startPos, startPos + this.cnt)
        return tempUsers
    }

    pagination(event) { //листаем
        const e = event || window.event
        const target = e.target
        const id = target.id
        //const div_dTR = document.querySelectorAll(".d-tr")

        if (target.tagName.toLowerCase() !== "span") return

        //let data_page = +target.dataset.page
        main_page.classList.remove("paginator_active")
        main_page = document.getElementById(id)
        main_page.classList.add("paginator_active")

        this.renderTD()
    }
}

let tempUsers = []
let table = document.getElementById('table');
let count = users.length; //всего записей
let cnt = 2 //сколько отображаем сначала
let cnt_page = Math.ceil(count / cnt); //кол-во страниц

const tableObj = new Table(table, count, 2, Math.ceil(count / cnt))


tableObj.renderAll()
tableObj.setListeners()

let main_page = document.getElementById("page1");
main_page.classList.add("paginator_active");
