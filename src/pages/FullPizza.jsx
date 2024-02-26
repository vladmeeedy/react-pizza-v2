import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
    const {id} = useParams()
    const [pizza, setPizza] = React.useState()
    const navigate = useNavigate()
    React.useEffect(()=>{
        async function fetshPizza () {
            try {
                 const {data} = await axios.get("https://65a92c59219bfa371868aad2.mockapi.io/items/" + id)
            setPizza(data)

            } catch (error) {
                alert('Помилка при отриманні піци')
                navigate('/')

            }
           
        }
        fetshPizza()
    }, [])

    if (!pizza) {
        return 'loading...'
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt='pizza'/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
};

export default FullPizza;