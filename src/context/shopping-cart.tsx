import { createContext } from "react";

export const ShopCartContext = createContext(
{
    content: [
        {
            name: "",
            price: 0,
            uuid: ""
        }
    ],
    contentCount: {
    
    }
});