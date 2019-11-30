/*
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default appHistory;
*/

import { createBrowserHistory } from 'history';

export default createBrowserHistory();