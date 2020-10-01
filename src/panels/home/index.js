import React, {useContext} from 'react'
import {Context} from './../../context'
import PropTypes from 'prop-types';
import {Div} from '@vkontakte/vkui';
import BtnOutline from "../../core/BtnOutline";
//import arrow from './../../img/arrow.svg'
import '../../../node_modules/animate.css/animate.css';

const Home = (props) => {

    const {dispatch} = useContext(Context);

    const go = e => {

        dispatch({
            type: 'setActivePanel',
            payload: {
                // activePanel: e.currentTarget.dataset.to,
                activePanel: 'idea',
            }
        })
    };

    return <div id={props.id} className='wrapper '>
        <div className={'home'}>
            <Div className='title'>
                Не знаешь,<br/>что подарить?
            </Div>
            <Div className='text'>
                Воспользуйся нашим сервисом<br/>и получи идеи для подарка!
            </Div>
            <Div className='homeBtn'>
                <BtnOutline data_to="how" handleClick={go}>
                    Найти подарок!
                </BtnOutline>
            </Div>
        </div>
    </div>
}

Home.propTypes = {
    id: PropTypes.string.isRequired,
    // go: PropTypes.func.isRequired,
    // fetchedUser: PropTypes.shape({
    //     photo_200: PropTypes.string,
    //     first_name: PropTypes.string,
    //     last_name: PropTypes.string,
    //     city: PropTypes.shape({
    //         title: PropTypes.string,
    //     }),
    // }),
};

export default Home;
