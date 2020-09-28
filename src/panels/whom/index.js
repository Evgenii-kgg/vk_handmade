import React, {useContext} from 'react'
import PropTypes from 'prop-types';
// import {platform} from '@vkontakte/vkui';
import {Context} from '../../context'
import './../../style.css';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import BtnOutline from "../../core/BtnOutline";

// const osName = platform();


const Whom = props => {
    const {state, dispatch} = useContext(Context)
    const setSex = (e, sex) => {
        dispatch({
            type: 'setSex',
            payload: {
                sex: sex,
                activePanel: e.currentTarget.dataset.to,
            }
        })
    };
    return <div id={props.id} className='wrapper bg-gray'>
        <Div>Кому ищем подарок?</Div>
        <Div>
            <BtnOutline handleClick={(e) => setSex(e, 'man')} data_to={'who_have'}
                        active={state.indicators.sex === 'man'}>
                Мужчине
            </BtnOutline>
            <BtnOutline handleClick={(e) => setSex(e, 'woman')} data_to={'who_have'}
                        active={state.indicators.sex === 'woman'}>
                Женщине
            </BtnOutline>
        </Div>
    </div>
}

Whom.propTypes = {
    id: PropTypes.string.isRequired,
    // dispatch: PropTypes.func.isRequired,
};

export default Whom;
