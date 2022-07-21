import React from 'react';
import { User } from './../App';

const user_data = { user:{username:"",room:"general"}, updateUser:(user:User)=>{}}


const UserContext = React.createContext(user_data);
export default UserContext;

