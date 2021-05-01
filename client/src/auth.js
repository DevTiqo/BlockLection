import { BehaviorSubject } from 'rxjs';

import axios from 'axios'


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    userLogin,
    adminLogin,
    candLogin,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function userLogin(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

  
   return axios.post('http://localhost:8000/api/userLogin', {
         email: email,
            password: password,
    })
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            currentUserSubject.next(response.data);
            console.log(response.data)
            return response.data;
            
        });
  

    }

    function candLogin(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

  
   return axios.post('http://localhost:8000/api/candLogin', {
         email: email,
            password: password,
    })
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            currentUserSubject.next(response.data);
            console.log(response.data)
            return response.data;
            
        });
  

    }
function adminLogin(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

  
   return axios.post('http://localhost:8000/api/adminLogin', {
         email: email,
            password: password,
    })
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            currentUserSubject.next(response.data);
            console.log(response.data)
            return response.data;
            
        });
  

    }



function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}