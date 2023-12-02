import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

export default function CategorisDetails() {
    const {categoryId}=useParams();

    const getCategoryDetails = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }

    const {data,isLoading} =useQuery('category_details',getCategoryDetails);

    if(isLoading)
    {
        return <p>loading .......</p>
    }
  return (
     <div className="products">
        {data?.length?data.map((product)=>
        <div className="product" key={product._id}>
            <img src={product.mainImage.secure_url}/>
            <h2>{product.name}</h2>
            <Link to={`/products/${product._id}`}>Details</Link>

        </div>
        ):<h2>no product</h2>}
     </div>
  )
}
