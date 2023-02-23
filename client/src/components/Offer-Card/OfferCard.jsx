import { useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import './OfferCard.css';

const OfferCard = ({offer})=>{
    const {auth: {role}} = useAuth();
    const card = useRef()
    const url = process.env.REACT_APP_URL;
    useEffect(()=>{
        card.current.style.backgroundImage = `url('${url}/uploads/${offer.offerImage}')`
    }, [])
    return(
        <section ref={card} className="offer-card">
            <h1 className="offer-id">{offer.offerId}</h1>
            <h2 className="offer-title">{offer.offerTitle}</h2>
            <p className="offer-description">{offer.offerDescription}</p>
            <div className="content-container">
                <h2>ITEMS: </h2>
                <div className="products-container">
                {offer.content.map((product, index)=>{
                    return(
                        <div className="product" key={index}>
                            <div className="product-image">
                                <h3>{product.item.name}</h3>
                                <img src={url + '/uploads/' + product.item.image} alt="" />
                                <h2>Quantity: {product.quantity}</h2>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
            <div className="price-container">
                {
                    offer.pricing.map((item, index)=>{
                        return(
                            <div className="currency-container" key={index}>
                                <h2>{item.currency} : {item.cost}</h2>
                            </div>
                        )
                    })
                }
            </div>
            <div className="btns-container">
                <button className="btn">Buy with coins</button>
                <button className="btn">Buy with gems</button>
            </div>

        </section>
    )
}
export default OfferCard;