const ContentManager = ()=>{
    return(
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
                        onChange={(e) => { setState({ ...state, search: e.target.value }) }}
                        value={state.search}
                    />
                </div>
                <button className="btn">Search</button>
            </form>
    )
}
export default ContentManager