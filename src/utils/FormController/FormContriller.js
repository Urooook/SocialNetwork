import React from 'react';

export const required = value =>{
    if(value) return undefined;
    return 'Поле обязательно для заполнения';
}

export const maxLength = (maxLength) => (value) =>{
   
    if(value.length > maxLength) return `Максимальное количество символов ${maxLength}`;
    return undefined;
}