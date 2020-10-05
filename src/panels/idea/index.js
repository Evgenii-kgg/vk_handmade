import React from 'react'
import {Alert, Button, Div, Input, Textarea} from "@vkontakte/vkui"
import PropTypes from "prop-types";
import LastItem from "../list_products/components/last_item";
import './../../style.css';
import {Context} from "../../context";

// import {Context} from "../../context";

class PresentIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            idea: '',
            url: '',
            send: false,
        };
    }

    static contextType = Context

    go = dispatch => {
        dispatch({
            type: 'setActivePanel',
            payload: {
                activePanel: 'home',
            }
        })
    };

    sendIdea = () => {
        console.log(this.state)
        const templateParams = {
            name: 'Anton',
            notes1: this.state.userInfo,
            notes2: this.state.idea,
            notes3: this.state.url,
            notes4: `https://vk.com/id${this.props.fetchedUser.id}`,
            from_name: 'vk_handmade',
        };
        //console.log(templateParams)
        window.emailjs.send(
            'zzbaalzz_gmail_com', "template_HH3hOYEI",
            templateParams
        ).then(res => {
            console.log('Email successfully sent!', res)
            this.setState({send: true})
        }).catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    render() {
        console.log(this.context)
        const {state, dispatch} = this.context

        if (!this.state.send) {
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
                                    value={this.state.userInfo}
                                    onChange={(event) => this.setState({userInfo: event.target.value})}
                                    placeholder="Пол, возраст, кем приходится?"
                                    name=""
                                    type="text"
                                />
                            </Div>
                            <p className={'text'}>Что за подарок?</p>
                            <Textarea
                                placeholder="Расскажи, что за подарок"
                                value={this.state.idea}
                                onChange={(event) => this.setState({idea: event.target.value})}
                            />
                            <p className={'text'}>Есть страница или фото с подарком?</p>
                            <Input
                                value={this.state.url}
                                onChange={(event) => this.setState({url: event.target.value})}
                                placeholder="вставь ссылку, если есть"
                                name=""
                                type="text"
                            />
                            <Div>
                                <Button size='l' level="outline" className="btn-white" onClick={this.sendIdea}>
                                    Отправить идею
                                </Button>
                            </Div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="wrapper" id={this.props.id}>
                    <div className="send-idea" style={{textAlign: 'center'}}>
                        <h1>Спасибо за идею!<br/> Мы обязательно её рассмотрим!</h1>
                        <Button size='l' level="outline" className="btn-white-last" onClick={() => this.go(dispatch)}>
                            На главную
                        </Button>
                    </div>

                </div>
            )
        }
    }
}

LastItem.propTypes = {
    again: PropTypes.func.isRequired,
    redirectSiberiaHandmade: PropTypes.func.isRequired
};

export default PresentIdea;
