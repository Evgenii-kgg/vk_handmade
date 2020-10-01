import React, {useState} from 'react'
import {Button, Input, PanelHeader, Textarea} from "@vkontakte/vkui"
import PropTypes from "prop-types";
import LastItem from "../list_products/components/last_item";
import './../../style.css';


// import search from './../../../img/search.svg'

class PresentIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            idea: '',
            url: '',
        };
    }

    sendIdea = ()=> {
        console.log('метод для отправки сообщения ')
    }

    // {again, redirectSiberiaHandmade} = props
    render() {
        return (
            <div className="product" id={this.props.id}>
                {/*<PanelHeader>*/}
                {/*    Предложи идею*/}
                {/*</PanelHeader>*/}
                <div>
                    <Input
                        value={this.userInfo}
                        onChange={(event) => this.setState({userInfo: 'event.currentTarget.value'})}
                        top="Пол, возраст, кем приходится?"
                        name=""
                        type="text"
                    />
                    <Textarea top="Любимая музыка"
                              placeholder="Расскажи, что за подарок"
                              value={this.idea}
                              onChange={(event) => this.setState({idea: 'event.currentTarget.value'})}
                    />
                    <Input
                        value={this.url}
                        onChange={(event) => this.setState({url: 'event.currentTarget.value'})}
                        top="Есть страница или фото с подарком?"
                        name=""
                        type="text"
                    />
                    <Button size='l' level="outline" className="btn-white" onClick={this.sendIdea}>
                        Отправить идею
                    </Button>
                </div>

            </div>
        )
    }
}

LastItem.propTypes = {
    again: PropTypes.func.isRequired,
    redirectSiberiaHandmade: PropTypes.func.isRequired
};

export default PresentIdea;
