import React, {useContext} from 'react'
import {Button} from "@vkontakte/vkui";
import PropTypes from 'prop-types';
import search from './../../../img/search.svg'

import {Context} from "../../../context";
// import bridge from "@vkontakte/vk-bridge";

const LastItem = (props) => {

    const {dispatch} = useContext(Context)

    const go = () => {

        dispatch({
            type: 'setActivePanel',
            payload: {
                activePanel: 'idea',
            }
        })
    };

    const {again, redirectSiberiaHandmade} = props
    return (
        <div className="product">
            <div className="lastProduct">
                <img src={search} className={'img-search'} alt={''}/* width={150} height={200} *//>
                <div>
                    <Button size='l' level="outline" className="btn-white" onClick={again}>Попробовать еще раз!</Button>< br/>
                    <Button size='l' level="outline" className="btn-white" onClick={redirectSiberiaHandmade}>
                        Подберите мне подарок!
                    </Button>
                    <Button size='l' mode="secondary"  onClick={go} data_to={'idea_page'}>
                        Предложить свою идею
                    </Button>
                </div>
            </div>
        </div>
    )
}

LastItem.propTypes = {
    again: PropTypes.func.isRequired,
    redirectSiberiaHandmade: PropTypes.func.isRequired
};

export default LastItem


