import React,{useState} from 'react'

const CartBTNContext = React.createContext({
    showCart: false,
    nowShowCart: ()=>{},
    nowCloseCart: ()=>{}
})

export const CartBTNContextProvider = (props)=>{
    const [showCart, setShowCart] = useState(false)

    const nowShowCart = ()=>{
      setShowCart(true)
    }
  
    const nowCloseCart = ()=>{
      setShowCart(false)
    }

    return(
        <CartBTNContext.Provider value={{
            showCart: showCart,
            nowShowCart: nowShowCart,
            nowCloseCart: nowCloseCart
        }}>
        {props.children}    
        </CartBTNContext.Provider>
    )
}

export default CartBTNContext;