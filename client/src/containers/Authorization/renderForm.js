import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './index.css';
import ButtonLoader from '../../components/ButtonLoader';

export default (state, submitHandler, inputHandler) => {
    return (
        <div className={classes.Container}>
            <form className={classes.Form}>
                <h1>{state.headerText}</h1>
                {
                    Object.keys(state.inputs)
                    .map((key, index) => {
                        return <input 
                            key={index}
                            placeholder={state.inputs[key].placeHolder}
                            type={state.inputs[key].type}
                            value={state.inputs[key].value}
                            onChange={(e) => inputHandler(e, key)}
                        />
                    })
                }
                {
                    state.error ? <div className={classes.Error}>{state.error}</div> : null
                }
                <div className={classes.SubmitButton} onClick={submitHandler}>
                    Submit
                    {state.loading ? <ButtonLoader /> : null}
                </div>
            </form>
            <div className={classes.Redirect}>
                {state.redirect === 'login' ? 'Have an account?' : 'No account?'} 
                <NavLink to={"/accounts/" + state.redirect}>
                    {state.redirect}
                </NavLink>
            </div>
        </div>
    );
};
