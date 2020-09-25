import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import {IOS, platform} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './../../style.css';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Gallery from "@vkontakte/vkui/dist/components/Gallery/Gallery";
import CellButton from "@vkontakte/vkui/dist/components/CellButton/CellButton";
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import {Context} from "../../context";
import Product from "./components/item";
import filterProducts from "../../services/filter_products";
import httpApiVk, {handmade_id} from "../../services/httpApiVk";
import http from '../../services/http'
import LastItem from "./components/last_item";
//import connect from '@vkontakte/vk-connect';
import bridge from '@vkontakte/vk-bridge';
import Button from "@vkontakte/vkui/dist/components/Button/Button";

const osName = platform();

const uriImg = 'photos.getById';

const ListProducts = props => {
    const [slideIndex, setSlide] = useState(0);
    // const slideIndex = useState(0);
    const {state, dispatch} = useContext(Context)
    let filteredProducts = {};

    const go = e => {
        dispatch({
            type: 'setActivePanel',
            payload: {
                activePanel: props.back_id,
            }
        })
    };

    const give = async (e, product) => {
        // const productPhoto = product.name;
        // const btn = e.currentTarget.innerText;
        await http.post('writeHandMade', {
            'msg':
            //Пользователь ${state.fetchedUser.id}.
                `Нажал: Хочу себе. Идея: ${product.id}-${product.name}.`
        })

        if (bridge.supports("VKWebAppShowWallPostBox")) {
            bridge.send("VKWebAppShowWallPostBox", {
                "message": `Сервис поиска подарков! Хочу себе ${product.name}!`,
                "attachments": `photo${product.img_fullname}, https://vk.com/siberia_handmade`
            })
        }
    };

    const helpGive = async (e, product) => {
        http.post('writeHandMade', {
            'msg':
            //Пользователь ${state.fetchedUser.id}.
                `Нажал: Где купить.Помогите найти.Идея: ${product.id}-${product.name}.`
        })
        if (bridge.supports("VKWebAppShowWallPostBox")) {
            bridge.send("VKWebAppShowWallPostBox", {
                "message": `Где купить\\заказать: ${product.name}! Помогите найти! https://vk.com/siberia_handmade`,
                "attachments": `photo${product.img_fullname}, https://vk.com/siberia_handmade`
            })
        }
    };

    const buy = async (e, product) => {
        await http.post('writeHandMade', {
            'msg':
            // Пользователь ${state.fetchedUser.id}.
                `Нажал: Где купить?. Идея: ${product.id}-${product.name}.`
        })
        window.parent.location = !!product.link ? product.link : 'https://vk.com/siberia_handmade?w=app6887721_-176551026';
    };

    const again = e => {
        // console.log('again-- ');
        http.post('writeHandMade', {
            'msg':
            // Пользователь ${state.fetchedUser.id}.
                `Нажал: Попробовать еще раз!.`
        })
        dispatch({
            type: 'setActivePanel',
            payload: {
                activePanel: 'home',
            }
        })
    };
    const redirectSiberiaHandmade = e => {
        // console.log('redirectSiberiaHandmade-- ');
        http.post('writeHandMade', {
            'msg':
            // Пользователь ${state.fetchedUser.id}.
                `Нажал: Подберите мне подарок.`
        })
        window.parent.location = 'https://vk.com/siberia_handmade?w=app6887721_-176551026';
    };

    const getImgs = (err, data) => {
        if (err) {
            console.error("ERROR get images", err.message);
            dispatch({
                type: 'setPopout',
                payload: {
                    popout: false,
                    error: "Ошибка подключения к серверу ВК!"
                }
            })
        } else {
            // console.log('data-- ', data);
            // console.log('filteredProducts-- ', filteredProducts);
            filteredProducts.map((product) => {
                data.response.forEach(function (photo) {
                    if (!!product.img && product.img.includes(photo.id)) {
                        product.img_url = photo.sizes[4].url
                    }
                })
                return product
            })
            dispatch({
                type: 'getFilteredProducts',
                payload: {
                    filteredProducts: filteredProducts,
                    popout: false,
                }
            })

        }
    }

    //filter products
    useEffect(() => {
        dispatch({
            type: 'setPopout',
            payload: {
                popout: true,
            }
        })

        function filter() {
            // console.log('prod',state.products,state.indicators,handmade_id);

            filteredProducts = filterProducts.filter(state.products, state.indicators);
            const photos = filteredProducts.map((product) => {
                // console.log('proddd',product.img);
                if (!product.img) return '';
                product.img_fullname = `-${handmade_id}_${String(product.img).split(',')[0].trim()}`
                return product.img_fullname
                // ((img_id) => {
                //     return `-${handmade_id}_${img_id.trim()}`
                // }).join(',')
            }).filter(img => !!img).join(',')
            // console.log('photos-- ', photos);
            if (!!photos) {
                httpApiVk.jsonp(uriImg, {photos: photos}, getImgs)
            } else {
                //console.log(dispatch);
                dispatch({
                    type: 'getFilteredProducts',
                    payload: {
                        filteredProducts: filteredProducts,
                        popout: false,
                    }
                })
            }

        }

        filter();
    }, []);

    const refCallback = element => {
        if (element) {
            const root = document.getElementById('root')
            const isOverflow = element.getBoundingClientRect().height > root.scrollHeight
            // console.log('log-- ',element.getBoundingClientRect().height, root.scrollHeight );
            // console.log('isOverflow-- ',element.getBoundingClientRect().height > root.scrollHeight);
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


    const countProducts = state.filteredProducts.length;
    const products = state.filteredProducts.map((product, i) => <Product key={i} item={++i}
                                                                         product={product}
                                                                         count={countProducts}/>)

    console.log('countProducts-- ', products);
    // console.log('state.filteredProducts-- ', state.filteredProducts);
    const item = slideIndex + 1;
    const currentProduct = state.filteredProducts[slideIndex];
    const title = currentProduct && currentProduct.name;
    return <div className={'wrapper'} id={props.id}>
        <div className={'panel'}>
            <Div className={'header'}>
                <button className={'btn-back'} onClick={go} data-to={props.back_id}>
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </button>
                <Div
                    className={'header-title'}>{(!!countProducts && countProducts !== slideIndex) ? `${item} из ${countProducts}: ${title}` : "Не нашли что искали?"}</Div>
            </Div>
            <div className={'container-items'} ref={refCallback}>
                <div className={'block-items'}>
                    <div className={'slider-wrap'}>
                        {!!countProducts && slideIndex !== 0 &&
                        <CellButton className={"slider-btn slider-btn-left"}
                                    onClick={() => setSlide(slideIndex === 0 ? 0 : slideIndex - 1)}
                                    before={<Icon24BrowserBack width={40} height={40}/>}/>}
                        <div className={"slider-gallery"}>
                            <Gallery
                                className={"gallery"}
                                // slideWidth="98%"
                                align="center"
                                // style={{height: 150}}
                                slideIndex={slideIndex}
                                onChange={slideIndex => setSlide(slideIndex)}
                            >
                                {products}
                                <LastItem again={again} redirectSiberiaHandmade={redirectSiberiaHandmade}/>

                            </Gallery>
                        </div>
                        {!!countProducts && countProducts !== slideIndex &&
                        <CellButton className={"slider-btn slider-btn-right"} onClick={() => setSlide(slideIndex + 1)}
                                    before={<Icon24BrowserForward width={40} height={40}/>}/>}

                    </div>
                </div>
            </div>
            {(!!countProducts && countProducts !== slideIndex) && <div className={'btn-wrap-items'}>
                <Button size='l'
                        level="outline"
                        className="btn-white"
                        data-product={currentProduct.id}
                        data-name={currentProduct.name}
                        onClick={e => {
                            currentProduct.link ? buy(e, currentProduct) : helpGive(e, currentProduct)
                        }}
                >Где купить?</Button>
                <Button size='l'
                        level="outline"
                        className="btn-white"
                        onClick={e => give(e, currentProduct)}
                >Хочу себе!</Button>
            </div>}
        </div>
    </div>

};

ListProducts.propTypes = {
    id: PropTypes.string.isRequired,
    back_id: PropTypes.string.isRequired,
    // go: PropTypes.func.isRequired,
};

export default ListProducts;
