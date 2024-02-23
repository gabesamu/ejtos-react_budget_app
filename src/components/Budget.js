import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const handleInputChange = (event) => {
        setNewBudget(event.target.value);
    }

    const validateAndSetBudget = (event) => {
        if (event.target.value > 20000) {
            alert("Budget limit is £20,000");
            return;
        }

        if (event.target.value < totalExpenses) {
            alert("Budget cannot be reduced lower than current spending");
            return;
        }

        dispatch({
            type: 'SET_BUDGET',
            payload: event.target.value
        });
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            validateAndSetBudget(event);
        }
    }

    return (
        <div className='alert alert-secondary'>
        <span>Budget: £{budget}</span>
        <input type="number" step="10" value={newBudget} onChange={handleInputChange} onKeyDown={handleKeyPress}></input>
        </div>
    );
};
export default Budget;
