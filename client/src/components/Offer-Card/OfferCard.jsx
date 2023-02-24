import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import './OfferCard.css';

const OfferCard = ({ offer }) => {
    const { auth } = useAuth();
    const card = useRef();
    const errModal = useRef();
    const url = process.env.REACT_APP_URL;
    const [errmsg, seterr] = useState({ msg: ""});

    const buyNow = async(curr)=>{
        try {
            const payload = {};
            if(curr === 'coins'){
                let coins = offer.pricing.find((item)=>item.currency === 'coins');
                payload.coins = coins.cost
            }else{
                let gems = offer.pricing.find((item)=>item.currency === 'gems');
                payload.gems = gems.cost
            }
            const response = await fetch(
                process.env.REACT_APP_URL + '/user/purchase',
                {   
                    method: 'POST',
                    headers:{
                        authorization: auth.token,
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(payload)
                }
            )
            const res = await response.json();
            if(res.status === 'failure'){
                seterr({msg: res.message, class: 'red'});
                errModal.current.style.top = '300px';
            }
            else{
                seterr({msg: res.message, class: 'green'});
                errModal.current.style.top = '300px';
            }
        } catch (error) {
            console.log(error);
            seterr({msg: 'something went wrong', class: 'red'});
            errModal.current.style.top = '300px'
        }

    }
    useEffect(() => {
        card.current.style.backgroundImage = `url('${url}/uploads/${offer.offerImage}')`
    }, [])
    return (
        <section ref={card} className="offer-card">
            <h1 className="offer-id">{offer.offerId}</h1>
            <h2 className="offer-title">{offer.offerTitle}</h2>
            <p className="offer-description">{offer.offerDescription}</p>
            <div className="content-container">
                <h2>ITEMS: </h2>
                <div className="products-container">
                    {offer.content.map((product, index) => {
                        return (
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
                    offer.pricing.map((item, index) => {
                        return (
                            <div className="currency-container" key={index}>
                                <h2>{item.currency} : {item.cost}</h2>
                            </div>
                        )
                    })
                }
            </div>
            <div className="btns-container">
                {auth.role === 'admin'?
                    <>
                    <button className="btn" onClick={()=>buyNow('coins')}>Buy with coins</button>
                    <button className="btn" onClick={()=>buyNow('gems')}>Buy with gems</button>
                    </>
                    :
                    <>
                    <button className="btn edit-btn">Edit</button>
                    <button className="btn delete-btn">Delete</button>
                    </>
                }
            </div>
            <div ref={errModal} className="error-modal">
                <h1 className={errmsg.class}> {errmsg.msg}</h1>
                <button 
                className="btn"
                onClick={()=>{errModal.current.style.top = '-300px'}}
                >OK</button>
            </div>
        </section>
    )
}
export default OfferCard;