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
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/index.scss';

render(<App />, document.getElementById(`root`));
