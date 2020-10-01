import React, {useEffect, useReducer} from 'react'
import {View, Spinner}  from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import reducer from './reducer'
//import connect from '@vkontakte/vk-connect';
import bridge from '@vkontakte/vk-bridge';

import Home from './panels/home';

import {Context} from './context'
import {getXLS} from "./services/xlsx";
import PanelItem from "./panels/panel";
import PresentIdea from "./panels/present/index";
import ListProducts from "./panels/list_products";
import {typeHow} from "./services/filter_products";
import {getTypes} from "./services/types";
import { checkPropTypes } from 'prop-types';
//import {bounce} from '../../../node_modules/animate.css/animate.css';

const initialState = {
    activePanel: 'home',
    isOverflow:false,
    panelOverflow:'',
    MessagesFromGroupResult: false,
    fetchedUser: {
        bdate: "",
        city: {id: null, title: ""},
        country: {id: 1, title: "Россия"},
        first_name: "",
        id: null,
        last_name: "",
        photo_100: "",
        photo_200: "",
        photo_max_orig: "",
        sex: null,
        timezone: null
    },
    popout: false,
    error: '',
    log:'',
    types: {
        how: [],
        sex: [],
        relation: [],
        age: [],
        profession: [],
        hobby: [],
        event: []
    },
    products: [],
    filteredProducts: [],
    indicators: {
        sex: null,
        relation: null,
        age: null,
        how: null,
        profession: null,
        hobby: null,
        event: null,
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //get user info
    useEffect(() => {
        dispatch({
            type: 'setPopout',
            payload: {
                popout: true,
            }
        })
        bridge.subscribe(({detail: {type, data}}) => {
                if (type === 'VKWebAppUpdateConfig') {
                    const schemeAttribute = document.createAttribute('scheme');
                    // console.log('schemeAttribute-- ', schemeAttribute);
                }
            }
        );



     async function fetchUser() {
         const user = await bridge.send('VKWebAppGetUserInfo');
            dispatch({
                type: 'setUser',
                payload: {
                    fetchedUser: user,
                    popout: false,
                }
            })
        }
        fetchUser();
    }, []);

    //get characteristics of the products from xslx
    useEffect(() => {
        dispatch({
            type: 'setPopout',
            payload: {
                popout: true,
            }
        })

        async function fetchData() {
            const data = await getXLS();
            // const keys = Object.keys(data.types[0]);
            // let types = {};
            // keys.forEach((key) => {
            //     types[key] = {}
            // })
            // data.types.forEach((type) => {
            //     keys.forEach((key) => {
            //         if (type[key] !== undefined)
            //             types[key][type.id] = firstUpperCaseTrim(type[key])
            //     })
            // })
            const types = getTypes(data.products, data.types)
            dispatch({
                type: 'setTypes',
                payload: {
                    types: types,
                    popout: false,
                }
            })
            dispatch({
                type: 'getAllProducts',
                payload: {
                    products: data.products,
                    popout: false,
                }
            })
        }

        fetchData();
    }, []);

    const getRelationsAtSex = () => {
        let result = [], key;
        for (key in state.types.relation) {
            if (state.types.relation.hasOwnProperty(key) && (state.indicators.sex === 'Мужчине' ? +key <= 6 : +key > 6)) {
                result.push(state.types.relation[key]);
            }
        }
        return result;
    }

    return (
        <Context.Provider value={{
            state, dispatch
        }}>
            <div className={state.isOverflow?"container-height-auto":"container"}>
                <View activePanel={state.activePanel} popout={state.popout ? <Spinner size='large' style={{color: '#279fd8'}}/> : null}>
                    <Home id='home' fetchedUser={state.fetchedUser}/>
                    <PanelItem id={'how'} to_id={'sex'}  back_id={'home'} title={'Как подобрать подарок?'}
                               types={state.types.how}/>
                    <PanelItem withHeader id={'sex'} back_id={'how'} to_id={'age'} title={'Кому ищем подарок?'}
                               types={state.types.sex}/>
                    <PanelItem withHeader id={'age'} back_id={'sex'}
                               to_id={typeHow[state.indicators.how] || 'list_products'} title={'Сколько лет?'}
                               types={state.types.age}/>
                    <PanelItem withHeader id={'profession'} back_id={'age'} to_id={'list_products'} title={'Профессия?'}
                               types={state.types.profession}/>
                    <PanelItem withHeader id={'relation'} back_id={'age'} to_id={'list_products'} title={'Кем приходится?'}
                               types={getRelationsAtSex()}/>
                    <PanelItem withHeader id={'hobby'} back_id={'age'} to_id={'list_products'} title={'Увлечение?'}
                               types={state.types.hobby}/>
                    <PanelItem withHeader id={'event'} back_id={'age'} to_id={'list_products'} title={'Событие?'}
                               types={state.types.event}/>
                    <ListProducts id='list_products' back_id={typeHow[state.indicators.how] || 'age'}/>
                    <PresentIdea id={'idea'} back_id={'list_products'}  title={'Идея'}/>
                </View>
                <span className={'error'}>{state.error}</span>
            </div>

        </Context.Provider>
    );
}

export default App;
// panel_id: PropTypes.string.isRequired,
// 	withHeader:PropTypes.bool,
// 	back_id:PropTypes.string,
// 	to_id:PropTypes.string.isRequired,
// 	title:PropTypes.string.isRequired,
// 	action:PropTypes.string.isRequired,
// 	name:PropTypes.string.isRequired,
// 	types:PropTypes.objectOf(PropTypes.string)


// {id: {…}, how: {…}, sex: {…}, age: {…}, relation: {…}, …}
// age: {1: "от 0 до 10 лет", 2: "от 11 до 16 лет", 3: "от 17 до 20 лет", 4: "от 21 до 30 лет", 5: "от 30 и старше"}
// event: {1: "На выписку", 2: "На рождение ребенка", 3: "Юбилей", 4: "День рождения", 5: "Корпоратив", 6: "Новоселье", 7: "Годовщина", 8: "Выпускной", 9: "Мальчишник"}
// hobby: {1: "Книголюбу", 2: "Музыканту", 3: "Охотнику", 4: "Спортсмену", 5: "Автомобилисту", 6: "Кулинару", 7: "Рукодельнику", 8: "Путешественнику", 9: "Садоводу", 10: "Любителю загородного отдыха", 11: "Туристу", 12: "Айтишнику", 13: "Футбольному болельщику", 14: "Рыбаку", 15: "Энтомологу"}
// how: {1: "По увлечениям", 2: "По профессии", 3: "Родственнику", 4: "Другу \ подруге", 5: "На событие"}
// id: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15}
// profession: {1: "Доктору", 2: "Юристу", 3: "Учителю", 4: "Шефу", 5: "Бизнесмену", 6: "Коллеге", 7: "Айтишнику", 8: "Строителю", 9: "Военному", 10: "Моряку"}
// relation: {1: "Отец", 2: "Дедушка", 3: "Брат", 4: "Племянник", 5: "Дядя", 6: "Сын", 7: "Муж", 8: "Мать", 9: "Бабушка", 10: "Сестра", 11: "Племянница", 12: "Тётя", 13: "Дочь", 14: "Жена"}
// sex: {1: "Мужчине", 2: "Женщине"}
// __proto__: Object
