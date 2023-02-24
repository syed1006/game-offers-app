import { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import Select from 'react-select';
import { daysOptions, monthsOption, datesOption } from '../../helpers/options';
import './CreateOffer.css';

const CreateOffer = () => {
    const [data, setData] = useState({
        offerId: "",
        offerTitle: "",
        offerDescription: "",
        target: "",
        pricing: {
            coins: "",
            gems: ""
        }
    })
    const [file, setFile] = useState();
    const [product, setProducts] = useState({ products: [], content: [], display: [] });
    const { auth } = useAuth();
    const [days, setDays] = useState(null);
    const [months, setMonths] = useState(null);
    const [dates, setDates] = useState(null);
    const [item, setItem] = useState({id:"", quantity: "", name: ""});
    const [available, setAvailable] = useState({msg:""})
    const url = process.env.REACT_APP_URL;

    const checkAvailability = async(e)=>{
        if(!data.offerId)return
        try {
            const response = await fetch( url + `/offer/checkId/?offerId=${e.target.value}`, {
                headers: {
                    authorization: auth.token
                }
            })
            const res = await response.json();
            if(res.status === 'failure'){
                setAvailable({
                    msg: "Id is not available!!",
                    class: 'red'
                });
            }else{
                setAvailable({
                    msg: "Id is available!!",
                    class: 'green'
                });
            }
            
        } catch (error) {
            console.log(error);   
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch( url + '/product', {
                headers: {
                    authorization: auth.token
                }
            })
            const res = await response.json();
            if (res.status === 'success') {
                setProducts({ ...product, products: res.result });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemove = (e)=>{
        e.preventDefault()
        let index = e.target.id;
        console.log(index)
        let arr1 = product.content.filter((item, ind)=>ind != index);
        let arr2 = product.display.filter((item, ind)=>ind != index)

        setProducts({...product, content: arr1, display: arr2});
    }

    const addItem = (e)=>{
        e.preventDefault()
        if(item.id  && item.quantity ){
            setProducts({...product, content: [...product.content, {item: item.id, quantity: item.quantity}], display:[...product.display, {name: item.name, quantity: item.quantity}]});
            setItem({item: "", quantity: "", name:""})
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        let formDays = days.map((item)=>item.value)
        let formDates = dates.map((item)=>item.value)
        let formMonths = months.map((item)=>item.value)
        const formdata = new FormData();
        formdata.append('offerId', data.offerId);
        formdata.append('offerTitle', data.offerTitle);
        formdata.append('offerDescription', data.offerDescription);
        formdata.append('image', file);
        formdata.append('content', JSON.stringify(product.content));
        formdata.append('schedule', JSON.stringify({
            days: formDays,
            dates: formDates,
            months: formMonths
        }))
        formdata.append('target', data.target);
        formdata.append('pricing', JSON.stringify([
            {
                currency: 'coins',
                cost: data.pricing.coins
            },
            {
                currency: 'gems',
                cost: data.pricing.gems
            }
        ]))

        try {
            const response = await fetch(url + '/offer',
                {
                    method: 'POST',
                    headers:{
                        authorization: auth.token
                    },
                    body: formdata
                }
            )

            const res = await response.json();
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <main className="main-section">
            <h1>Create New Offer</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-item"
                        autoComplete="off"
                        name="offerId"
                        placeholder="Offer Id"
                        onChange={(e) => { setData({ ...data, offerId: e.target.value.toLocaleUpperCase() }) }}
                        value={data.offerId}
                        onBlur={checkAvailability}
                        required
                    />
                    {available.msg && <p className={available.class}>{available.msg}</p>}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-item"
                        name="offerTitle"
                        placeholder="Offer Title"
                        autoComplete="off"
                        onChange={(e) => { setData({ ...data, offerTitle: e.target.value }) }}
                        value={data.offerTitle}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-item"
                        name="offerDescription"
                        autoComplete="off"
                        placeholder="Offer Description"
                        onChange={(e) => { setData({ ...data, offerDescription: e.target.value }) }}
                        value={data.offerDescription}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-item"
                        name="target"
                        autoComplete="off"
                        placeholder="Targer Users"
                        onChange={(e) => { setData({ ...data, target: e.target.value }) }}
                        value={data.target}
                        required
                    />
                    <p className="red">*Use only ANDed or ORed statements here.</p>
                </div>
                <div className="input-container">
                    <h2>Days: </h2>
                    <Select
                        defaultValue={days}
                        onChange={setDays}
                        isMulti={true}
                        options={daysOptions}
                        required
                    />

                </div>
                <div className="input-container">
                    <h2>Date: </h2>
                    <Select
                        defaultValue={dates}
                        onChange={setDates}
                        isMulti={true}
                        options={datesOption}
                        required
                    />
                </div>
                <div className="input-container">
                    <h2>Months: </h2>
                    <Select
                        defaultValue={months}
                        onChange={setMonths}
                        isMulti={true}
                        options={monthsOption}
                        required={true}
                    />

                </div>
                <div className="input-container">
                    <h2>Pricing</h2>
                    <input
                        type="number"
                        className="input-item"
                        name="coins"
                        autoComplete="off"
                        placeholder="Coins"
                        onChange={(e) => { setData({ ...data, pricing: { ...data.pricing, coins: e.target.value } }) }}
                        value={data.pricing.coins}
                        required
                    />
                    <input
                        type="number"
                        className="input-item"
                        name="gems"
                        placeholder="Gems"
                        autoComplete="off"
                        onChange={(e) => { setData({ ...data, pricing: { ...data.pricing, gems: e.target.value } }) }}
                        value={data.pricing.gems}
                        required
                    />
                </div>
                <div className="input-container">
                    <h2>Background Image: </h2>
                    <input
                        type="file"
                        className="input-item"
                        name="file"
                        placeholder="File"
                        autoComplete="off"
                        onChange={(e) => { setFile(e.target.files[0]) }}
                        required
                    />
                </div>
                <div className="product-input input-container">
                    <h2 className="contents-container">Contents: </h2>
                    <div className="products-selected">
                        {
                            product.content.length === 0 &&
                            <h3 className="red">*Select atleast 1 product for the offer</h3>
                        }
                        {
                            product.display.map((content, index)=>{
                                return(
                                    <div className="content" key={index}>
                                        <h3>{content.name + ' : ' + content.quantity}<button className="btn" id={index} onClick={handleRemove}>Remove</button></h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <input
                        type="text"
                        name="item"
                        placeholder="Product"
                        value={item.name}
                        readOnly
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        autoComplete="off"
                        value={item.quantity}
                        onChange={(e)=>{setItem({...item, quantity: e.target.value})}}
                    />
                    <button 
                    className="btn"
                    onClick={addItem}
                    >Add</button>
                </div>
                <div className="products-container">
                    {
                        product.products.map((product, index) => {
                            return (
                                <div className="product-image" key={index} onClick={()=>setItem({...item, id: product._id, name: product.name})}>
                                        <img src={url + '/uploads/' + product.image} alt="" />
                                        <h3>{product.name}</h3>
                                </div>
                            )
                        })
                    }
                </div>
                    <button 
                    className="submit"
                    disabled={!available.msg}
                    >Submit</button>
            </form>
        </main>
    )
}
export default CreateOffer