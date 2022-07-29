import { useEffect, useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function Login(){
    const { role } = useContext(AppContext);

    return (
        <>
        <h1>Hi Hi</h1>
        <div>{role}</div>
        <div>{process.env.NODE_ENV}</div>
        </>
    )
}