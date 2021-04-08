import { Storage } from "./Storage.js";
import { signin } from './authRequest.js';

(function () {
    const storage = Storage.getInstance();
    const loginForm = document.querySelector('form');
    const loginInput = document.querySelectorAll('form .control');
    loginForm.addEventListener('submit', (e) => {

        const values = Array.from(loginInput)
            .map(input => {
                return {
                    name: input.name,
                    value: input.value
                };
            });
        if (values.some(i => i.value !== undefined || i.value !== '')) {
            const authInput = {
                username: values[0].value,
                password: values[1].value
            };
            console.log(authInput);
            signin(authInput).then(
                auth => {
                    console.log(auth);
                }
            ).catch(
                err => {
                    console.error(err);
                }
            );
            e.preventDefault();

        }
    });
})()