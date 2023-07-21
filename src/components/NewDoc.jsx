import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase';

const NewDoc = () => {
    const [state,setState] = useState({
        productName:'',
        category:'',
        description:'',
        price:'',
        quantity:'',
        notes:''
    })

    function handelChange(e){
        let name= e.target.name;
        let value = e.target.value;
        setState((prev) => ({ ...prev,[name]: value}));
    }
   const handelAdd = async (e)=>{
        e.preventDefault()
        const res = await addDoc(collection(db,'cities'),{
            name:'Los angles',
            State:'CA'
        });
        console.log(res);
   }
  return (
    <div>
        <form onSubmit={handelAdd}>
            <input type="text" onChange={handelChange} placeholder='Enter Product name' name='productName' value={state.productName}/>
            <input type="text" onChange={handelChange} placeholder='Enter Category' name='category' value={state.category}/>
            <input type="text" onChange={handelChange} placeholder='Enter Description' name='description' value={state.description}/>
            <input type="number" onChange={handelChange} placeholder='Enter Price' name='price' value={state.price}/>
            <input type="number" onChange={handelChange} placeholder='Enter Quantity'name='quantity' value={state.quantity}/>
            <input type="text" onChange={handelChange} placeholder='Enter Notes' name='notes' value={state.notes}/>
            <input type='submit'  value={'Add Data'}/>
        </form>
    </div>
  )
}

export default NewDoc