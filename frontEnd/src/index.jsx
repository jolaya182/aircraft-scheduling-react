/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/**
 * title: index.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: point of entry for the application
 */
import { render } from 'react-dom';
import 'core-js/stable';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/index.scss';

render(<App />, document.getElementById(`root`));
// const elvenShieldRecipe = {
//   leatherStrips: 2,
//   ironIngot: 1,
//   refinedMoonstone: 4
// };

// // ES7 Object spread example
// const elvenGauntletsRecipe = {
//   ...elvenShieldRecipe,
//   leather: 1,
//   refinedMoonstone: 1
// };
// console.log('ES7 Object spread example: ', elvenGauntletsRecipe);

// // ES8 Object.values example
// // Note: Will not transpile without babel/imported polyfills because it is a new method
// console.log('ES8 Object.values example', Object.values(elvenGauntletsRecipe));

// // Event queue block scoping example
// // Check babel output to see that `let` isn't simply switched to `var`
// // because the code would not have the same output.
// for (let i = 0; i < 10; i += 1) {
//   setTimeout(function () {
//     console.log(i);
//   }, 1);
// }

// // async/await example from MDN
// function resolveAfter2Seconds() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// }

// async function asyncCall() {
//   console.log('calling');
//   const result = await resolveAfter2Seconds();
//   console.log(result);
//   // expected output: "resolved"
// }

// asyncCall();
