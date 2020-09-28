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
            const lastFilter = typeHow[this.indicators.how] === undefined ? true :
                this[`is${typeHow[this.indicators.how].charAt(0).toUpperCase()}${typeHow[this.indicators.how].slice(1)}`](product);
            // console.log('product-- ', product.id, product);
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

        return [...productsWithLink, ...productsWithoutLink];
    }

    static isHow = (product) => !!product.how ? product.how.includes(this.indicators.how) : true

    static isSex = (product) => !!product.sex ? product.sex.includes(this.indicators.sex) : true

    static isAge = (product) => !!product.age ? product.age.includes(this.indicators.age) : true

    static isEvent = (product) => !!product.event ? product.event.includes(this.indicators.event) : true

    static isHobby = (product) =>  !!product.hobby ? product.hobby.includes(this.indicators.hobby) : true

    static isProfession = (product) => !!product.profession ? product.profession.includes(this.indicators.profession) : true

    static isRelation = (product) => !!product.relation ? product.relation.includes(this.indicators.relation) : true

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
