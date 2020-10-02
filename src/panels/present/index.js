import React from 'react'
import {Button, Div, Input, Textarea} from "@vkontakte/vkui"
import PropTypes from "prop-types";
import LastItem from "../list_products/components/last_item";
import './../../style.css';
// import {Context} from "../../context";


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

// const go = e => {
//         dispatch({
//             type: 'setActivePanel',
//             payload: {
//                 activePanel: props.back_id,
//             }
//         })
//     };

    sendIdea = () => {
        console.log(this.state)
        const templateParams = {
            name: 'Anton',
            notes1: this.state.userInfo,
            notes2: this.state.idea,
            notes3: this.state.url,
            notes4: `https://vk.com/id${this.props.fetchedUser.id}`,
            from_name: 'vk_handmade',
            // id: userId
        };
        //console.log(templateParams)
        window.emailjs.send(
            'zzbaalzz_gmail_com', "template_HH3hOYEI",
            templateParams
        ).then(res => {
            console.log('Email successfully sent!', res)
        }).catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    render() {
        console.log(this.props.fetchedUser)
        return (
            <div className="wrapper" id={this.props.id}>
                <div style={{height: '100%'}}>
                <Div className={'header'}>
                    <Div className={'header-title'}>
                        <h1>Предложить идею</h1>
                    </Div>
                </Div>
                <div style={{textAlign: 'center'}}>
                    <Div>
                        <p className={'text'}>Кому подарок?</p>
                    <Input
                        top='Кому подарок?'
                        value={this.state.userInfo}
                        onChange={(event) => this.setState({userInfo: event.target.value})}
                        placeholder="Пол, возраст, кем приходится?"
                        name=""
                        type="text"
                    />
                    </Div>
                    <Div>
                        <p className={'text'}>Что за подарок?</p>
                        <Textarea
                            top="Что за подарок?"
                            placeholder="Расскажи, что за подарок"
                            value={this.state.idea}
                            onChange={(event) => this.setState({idea: event.target.value})}
                        />
                    </Div>
                    <Div>
                        <p className={'text'}>Есть страница или фото с подарком?</p>
                        <Input
                            value={this.state.url}
                            onChange={(event) => this.setState({url: event.target.value})}
                            top="Есть страница или фото с подарком?"
                            placeholder="вставь ссылку, если есть"
                            name=""
                            type="text"
                        />
                    </Div>
                    <Div>
                    <Button size='l' level="outline" className="btn-white" onClick={this.sendIdea}>
                        Отправить идею
                    </Button>
                    </Div>
                </div>
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
