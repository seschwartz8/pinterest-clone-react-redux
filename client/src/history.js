// Create history object (instead of letting the router make it) to allow easier access to from the action creators it for triggering page navigations

import { createBrowserHistory } from 'history';

export default createBrowserHistory();
