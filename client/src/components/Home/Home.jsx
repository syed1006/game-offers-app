import { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import OfferCard from "../Offer-Card/OfferCard";
import './Home.css';

const Home = () => {
    const [state, setState] = useState({ page: 1, data: [], attribute: 'offerId', query: "" });
    const {auth, setAuth} = useAuth()
    
    const fetchData = async()=>{
        try {
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
            setState({...state, data: res.data})
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setState({...state, page:1});
        fetchData()
    }
    useEffect(()=>{
        fetchData()
    }, []);
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
            <section className="flex-container">
                {
                    state.data.map((offer, index)=>{
                        return <OfferCard offer={offer} key={index}/>
                    })
                }
            </section>
            <section className="pagination-btns">
                <button className="btn">Prev</button>
                <button className="btn">Next</button>
            </section>
        </main>
    )
}
export default Home