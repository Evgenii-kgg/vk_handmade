import React from 'react'
import persik from "../../../img/persik.png";
import PropTypes from 'prop-types';
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";


const Product = React.memo(props => {
    const {product} = props
    // console.log(product);

    return (
        <div className="product">
            <div style={{position: 'absolute', zIndex: -1}}><ScreenSpinner size='medium'/></div>
            <div className={'img-wrap'}>
                <img placeholder="" className="img-product" src={product.img_url || persik} alt="Persik The Cat"/>
            </div>
        </div>
    )
})

Product.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        // img_url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }),
    count: PropTypes.number.isRequired,
    item: PropTypes.number.isRequired,
    // buy : PropTypes.func.isRequired,
    // give: PropTypes.func.isRequired
};

export default Product


