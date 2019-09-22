import { Route } from 'react-router';
import Dashboard from '../dashboard/Dashboard.react';
import Sandbox from '../sandbox/Sandbox.react';

const Main = () => {

    return (
        <div
            id='main'
            className='main'>

            <Route exact path='/' component={Dashboard} />
            <Route exact path='/sandbox' component={Sandbox} />

        </div>
    );
}


export default Main;