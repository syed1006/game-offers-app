import { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import OfferCard from "../Offer-Card/OfferCard";
import './Home.css';

const Home = () => {
    const [state, setState] = useState({ page: 1, attribute: 'offerId', query: "" });
    const [data, setData] = useState([]);
    const {auth, setAuth} = useAuth()
    
    const fetchData = async()=>{
        try {
            console.log(state.page)
            let url = process.env.REACT_APP_URL + `/offer/?page=${state.page}`
            if(state.query){
                url += `&query=${state.query}&attribute=${state.attribute}`
            }
            const response = await fetch(
                url,
                {   
                    headers:{
                        authorization: auth.token
                    }

                }
            )
            const res = await response.json();
            if(res.message === 'jwt expired'){
                setAuth({token: "", role: ""})
                localStorage.removeItem('auth-token');
                localStorage.removeItem('role');
            }
            console.log(res);
            setData(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setState({...state, page:1});
        fetchData()
    }

    const handlePrev = ()=>{
        if(state.page > 1){
            setState({...state, page: state.page-1});
        }
    }

    const handleNext = ()=>{
        if(data.length !== 0){
            setState({...state, page: state.page+1});
        }
    }
    useEffect(()=>{
        fetchData()
    }, [state.page]);
    return (
        <main className="main-section">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="attribute">Search Attribute</label>
                    <select name="attribute"
                        id="attribute"
                        onChange={(e) => { setState({ ...state, attribute: e.target.value }) }}
                    >
                        <option value="offerId" defaultChecked>Offer Id</option>
                        <option value="offerTitle">Offer Title</option>
                        <option value="offerDescription">Offer Description</option>

                    </select>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        autoComplete="off"
                        required
                        placeholder="Search query"
                        onChange={(e) => { setState({ ...state, query: e.target.value }) }}
                        value={state.query}
                    />
                </div>
                <button className="btn">Search</button>
            </form>
            {data.length === 0 && 
            <h1 className="message">No Offers To Show</h1>
            }
            <section className="flex-container">
                {
                    data.map((offer, index)=>{
                        return <OfferCard offer={offer} key={index}/>
                    })
                }
            </section>
            <section className="pagination-btns">
                <button 
                className="btn" 
                onClick={handlePrev}
                disabled = {state.page === 1? true: false}
                >Prev</button>
                <button 
                className="btn" 
                onClick={handleNext}
                disabled = {data.length === 0? true: false}
                >Next</button>
            </section>
        </main>
    )
}
export default Home