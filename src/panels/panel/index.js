import React, {useContext} from 'react';
import PropTypes, {object} from 'prop-types';
import {Div, IOS, platform, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './../../style.css';
import BtnOutline from "../../core/BtnOutline";
import {Context} from "../../context";
import '../../../node_modules/animate.css/animate.css';


const osName = platform();

const PanelItem = props => {
    const {state, dispatch} = useContext(Context)

    const setIndicators = (e, data) => {
        console.log(data)
        dispatch({
            type: 'setIndicators',
            payload: {
                data: data,
                activePanel: e.currentTarget.dataset.to,
            }
        })
    };

    const go = e => {

        dispatch({
            type: 'setActivePanel',
            payload: {
                data: {[props.id]: null},
                activePanel: e.currentTarget.dataset.to,
            }
        })
    };
    //'profession' От 0 до 5 лет  = Айтишнику Банкиру Бармену Бизнес-тренеру Визажисту Военному Воспитателю Доктору Методисту
    // Моряку Парикмахеру Продавцу Стилисту Стоматологу Строителю Таксисту Тренеру Фитнес-тренеру Фотографу Художнику Швее Шоферу Юристу

    //'profession' 'От 11 до 16 лет' = Банкиру Бармену Бизнес-тренеру Визажисту Воспитателю Методисту Парикмахеру Стилисту Стоматологу Тренеру Швее Юристу
    //(props.id == 'event') && props.types.filter((val) => val !== 'Kорпоратив')

    // список исключений 'event'
    const eventDisableYoung = ['На Свадьбу', 'Девишник', 'Свадьба', 'Рождение ребенка', 'На рождение ребенка', 'На мальчишник', 'На корпоратив', 'На Свадьба', 'Мальчишник', 'Корпоратив', 'Автоледи'];
    const eventDisableOld = ['Выпускной детский сад'];

    const professionDisableOld = ['Банкиру', 'Бармену', 'Бизнес-тренеру', 'Визажисту', 'Воспитателю', 'Методисту', 'Парикмахеру', 'Стилисту', 'Стоматологу', 'Тренеру', 'Швее', 'Юристу'];
    const professionDisableYoung = ['Айтишнику', 'Банкиру', 'Бармену', 'Бизнес-тренеру', 'Визажисту', 'Военному', 'Воспитателю', 'Доктору', 'Методисту', 'Моряку', 'Парикмахеру',
        'Продавцу', 'Стилисту', 'Стоматологу', 'Строителю', 'Таксисту', 'Тренеру', 'Фитнес-тренеру', 'Фотографу', 'Художнику', 'Швее', 'Шоферу', 'Юристу'];

    //исключение возраста
    const ageDisable = !!['От 0 до 5 лет', 'От 6 до 10 лет'].find(age => age === state.indicators.age);
    //const ageDisableOld = !!['От 11 до 16 лет','От 17 до 20 лет','От 21 до 30 лет','От 31 и старше'].find(age => age === state.indicators.age);

    const sexDisable = !!['Мужчине'].find(sex => sex === state.indicators.sex);


    //проверка в списках на рабочие кнопки
    const types = props.types.filter((val) => {
        switch (props.id) {
            case 'event' :
                return ageDisable ? !eventDisableYoung.find((event) => event === val) : !eventDisableOld.find((event) => event === val)
            case 'hobby' :
                return sexDisable ? !eventDisableYoung.find((event) => event === val) : val
            case 'profession' :
                return ageDisable ? !professionDisableYoung.find((event) => event === val) : !professionDisableOld.find((event) => event === val)
            default:
                return true
        }

    })


    const buttons = types.map((val) =>
        <BtnOutline
            key={val}
            handleClick={(e) => setIndicators(e, {[props.id]: val})}
            data_to={props.to_id}
            active={state.indicators[props.id] === val}>
            {val}
        </BtnOutline>)

    const refCallback = element => {
        if (element) {
            const root = document.getElementById('root')
            const isOverflow = element.getBoundingClientRect().bottom + 20 > root.scrollHeight
            if (state.isOverflow !== isOverflow && state.panelOverflow !== state.activePanel) {
                dispatch({
                    type: 'setOverflow',
                    payload: {
                        isOverflow: isOverflow,
                        panelOverflow: state.activePanel
                    }
                })
            }
        }
    };

    return <div className={'wrapper'} id={props.id}>
        <div className={'panel'}>
            <Div className={'header'}>
                <button className={'btn-back'} onClick={go} data-to={props.back_id}>
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </button>
                <Div className={'header-title'}>{props.title}</Div>
            </Div>

            <Div className='content'>
                <div className={'btn-wrap'}>
                    <div className={'styleButtons'}>{buttons}</div>
                </div>
            </Div>
        </div>
    </div>
}

PanelItem.propTypes = {
    id: PropTypes.string.isRequired,
    withHeader: PropTypes.bool,
    back_id: PropTypes.string,
    to_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired
};

export default PanelItem;
