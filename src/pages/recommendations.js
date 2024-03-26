
const Recommendations = () => {

    const getRecipesSearchRequestURL = (query) => {
        const id = process.env.REACT_APP_EDAMAM_APP_ID
        const key = process.env.REACT_APP_EDAMAM_APP_KEY
        return `https://api.edamam.com/api/recipes/v2?type=public&q=${query}s&app_id=${id}&app_key=${key}`
    }
    
    return(
        <div>
            hi hello
        </div>
    );  
};
export default Recommendations;
