import {firstUpperCaseTrim} from "./words";

export const typeHow = {
    'По увлечениям': 'hobby',
    'По профессии': 'profession',
    'Родственнику': 'relation',
    'На событие': 'event',
}


export default class filterProducts {

    static indicators;

    static filter = (products, indicators) => {
        this.indicators = indicators;
        const filteredProducts = products.filter((product) => {
            const lastFilter = typeHow[this.indicators.how] === undefined ? true : this[`is${typeHow[this.indicators.how].charAt(0).toUpperCase()}${typeHow[this.indicators.how].slice(1)}`](product);
            console.log('product-- ', product.id, product);
            if (!product.img || !String(product.img ? product.img : "").trim() || !product.active) return false;
            return this.isHow(product) && this.isSex(product) && this.isAge(product) && lastFilter
        })

        const productsWithLink = filteredProducts.filter((product) => {
            return !!product.link
        }).sort(function () {
            return .5 - Math.random()
        }).slice(0, 10);

        const productsWithoutLink = filteredProducts.filter((product) => {
            return !product.link
        }).sort(function () {
            return .5 - Math.random()
        }).slice(0, 15-productsWithLink.length);

        const result = [...productsWithLink, ...productsWithoutLink];
        return result;
    }

    // static isActive = (product) => {
    //     if (product.active === undefined) return true;
    //     return
    // }

    static isHow = (product) => {
        if (product.how === undefined) return true;
        const how = product.how.split(',').filter((i) => this.indicators.how === firstUpperCaseTrim(i))
        // console.log('product.how-- ', product.how,how.length > 0);
        return how.length > 0;
    }

    static isSex = (product) => {
        if (product.sex === undefined) return true;
        const sex = product.sex.split(',').filter((i) => this.indicators.sex === firstUpperCaseTrim(i))
        // console.log('product.sex-- ', product.sex,sex.length > 0);
        return sex.length > 0;
    }

    static isAge = (product) => {
         console.log('product.age-- ', product);
        if (product.age === undefined) return true;
        const age = product.age.split(',').filter((i) => this.indicators.age === firstUpperCaseTrim(i))
        //console.log('product.age-- ', product.age);
        return age.length > 0;
    }

    static isEvent = (product) => {
        // console.log('product.event-- ', product.event);
        if (product.event === undefined) return true;
        const event = product.event.split(',').filter((i) => this.indicators.event === firstUpperCaseTrim(i))
        // console.log('product.event-- ', product.event,event.length > 0);
        return event.length > 0;
    }

    static isHobby = (product) => {
        // console.log('product.hobby-- ', product.hobby);
        if (product.hobby === undefined) return true;
        const hobby = product.hobby.split(',').filter((i) => this.indicators.hobby === firstUpperCaseTrim(i))
        return hobby.length > 0;
    }

    static isProfession = (product) => {
        // console.log('product.profession-- ', product.profession);
        if (product.profession === undefined) return true;
        const profession = product.profession.split(',').filter((i) => this.indicators.profession === firstUpperCaseTrim(i))
        return profession.length > 0;
    }

    static isRelation = (product) => {
        // console.log('product.relation-- ', product.relation);
        if (product.relation === undefined) return true;
        const relation = product.relation.split(',').filter((i) => this.indicators.relation === firstUpperCaseTrim(i))
        return relation.length > 0;
    }
}
// id,active,name,img,sex,how,relation,profession,hobby,event,age,link,description

// [0: {active: "1", name: "Скетчбук в авторской обложке", img: "457241933, 457241935, 457241932, 457241934 ", how: "1,3,4", relation: "3, 4, 6, 10, 11, 13", hobby: "7", …}]

// how: ""
// sex: null
// age: null
// event: null
// hobby: null
// profession: null
// relation: null
// active: '1'
