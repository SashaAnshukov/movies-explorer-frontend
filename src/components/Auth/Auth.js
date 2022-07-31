export const BASE_URL = 'https://api.jet.nomoredomains.work';

// проверка ответа от сервера
const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, password, email})
    })
    .then(checkResponse)
};

// функция, которая будет проверять логин и пароль пользователя
// на соответствие какому-либо профилю, хранящемуся в базе данных
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include', // теперь куки посылаются вместе с запросом
        body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    /*.then((data) => {
        //console.log(data)
        // сохраняем токен в localStorage
        localStorage.setItem('jwt', data.token);
        return data;
    })*/
    .catch(err => console.log(err))
};

export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
    .then(checkResponse)
    .catch(err => console.log(err))
}


//Запрос для проверки валидности токена и получения email для вставки в шапку сайта
/*export const tokenCheck  = (token) => {
    //console.log(token)
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        //credentials: 'include'
    })
    //.then(checkResponse)
    .then(res => res.json())
    .then(data => data)
}*/