import {firstUpperCaseTrim} from "./words";

export const getTypes = (products, typesXlsx) => {
    let types = {
        age: [],
        event: [],
        hobby: [],
        how: [],
        relation: [],
        sex: [],
        profession: [],
        active: [],
    };

    // console.log('products', products)
    products.map((product)=> ({...product, img: String(product.img)})).forEach((product) => {
        Object.keys(product).forEach(key => {
            if (types[key] !== undefined) {
                if(key === 'id' || key === 'active') return key
                if (key === 'img') String(key)
              return  product[key].split(',').map(i => {
                    const str = firstUpperCaseTrim(i)
                    if(!!str) types[key].push(str)
                });
        }})

        // types.age.push(product.age.split(',').map(age=>firstUpperCaseTrim(age)));
        //  types.event.push(product.event.split(',').map(event=>firstUpperCaseTrim(event)));
        //  types.hobby.push(product.hobby.split(',').map(hobby=>firstUpperCaseTrim(hobby)));
        //  types.how.push(product.how.split(',').map(how=>firstUpperCaseTrim(how)));
        //  types.relation.push(product.relation.split(',').map(relation=>firstUpperCaseTrim(relation)));
        //  types.sex.push(product.sex.split(',').map(sex=>firstUpperCaseTrim(sex)));
        //  types.profession.push(product.profession.split(',').map(profession=>firstUpperCaseTrim(profession)));

    })

    const filterType = (item) => {
        return typesXlsx.flatMap((type)=>type[item]).filter((type)=>type)
    }

    types.age = filterType('age')
    types.event = filterType('event')
    types.active = filterType('active')
    types.hobby = filterType('hobby')
    types.how = filterType('how')
    // types.relation = [...new Set(types.relation.sort())]
    types.sex = filterType('sex')
    types.profession = filterType('profession')
    //данные "отношения" берем из первого листа чтобы поделить на М и Ж

    types.relation = typesXlsx.map((type) => {
        if (type.relation !== undefined)
           return  firstUpperCaseTrim(type.relation)
    }).filter((type)=>!!type)

    // console.log(types);
    return types;
}


//types{}
// age: {1: "От 0 до 5 лет", 2: "От 6 до 10 лет", 3: "От 11 до 16 лет", 4: "От 17 до 20 лет", 5: "От 21 до 30 лет", 6: "От 30 и старше"}
// event: {1: "На выписку", 2: "На рождение ребенка", 3: "Юбилей", 4: "День рождения", 5: "Корпоратив", 6: "Новоселье", 7: "Годовщина", 8: "Выпускной", 9: "Мальчишник", 10: "Свадьба"}
// hobby: {1: "Книголюбу", 2: "Музыканту", 3: "Охотнику", 4: "Спортсмену", 5: "Автомобилисту", 6: "Кулинару", 7: "Рукодельнику", 8: "Путешественнику", 9: "Садоводу", 10: "Любителю загородного отдыха", 11: "Туристу", 12: "Айтишнику", 13: "Футбольному болельщику", 14: "Рыбаку", 15: "Энтомологу", undefined: "Огороднику"}
// how: {1: "По увлечениям", 2: "По профессии", 3: "Родственнику", 4: "Другу", 5: "На событие"}
// id: {1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", 14: "14", 15: "15"}
// profession: {1: "Доктору", 2: "Юристу", 3: "Учителю", 4: "Шефу", 5: "Бизнесмену", 6: "Коллеге", 7: "Айтишнику", 8: "Строителю", 9: "Военному", 10: "Моряку", 11: "Фитнес-тренеру", 12: "Швее", 13: "Повару"}
// relation: {1: "Отец", 2: "Дедушка", 3: "Брат", 4: "Племянник", 5: "Дядя", 6: "Сын", 7: "Муж", 8: "Мать", 9: "Бабушка", 10: "Сестра", 11: "Племянница", 12: "Тётя", 13: "Дочь", 14: "Жена"}
// sex: {1: "Мужчине", 2: "Женщине"}
//eventObj -- тестовый

//products[]
// age: "от 11 до 16 лет, от 17 до 20 лет"
// event: "День рождения, Выпускной"
// hobby: "Рукодельнику"
// how: "По увлечениям, Родственнику, Другу"
// id: "2"
// img: "457241941, 457241945, 457241937"
// name: "Наборы для плетения из бисера"
// relation: "Сестра, Племянница, Дочь"
// sex: "Женщине"
