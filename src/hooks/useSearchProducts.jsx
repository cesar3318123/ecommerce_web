import { useState } from "react";
import axios from "axios";


export function useSearchProducts() {
    const [results, setResults] = useState([]);


    const search = async (q) => {
        const res = await axios.get(`https://ecommercebackend-production-8245.up.railway.app/api/mercadolibre?q=${encodeURIComponent(q)}`);
        setResults(res.data);

    };

    return { results, search };
}