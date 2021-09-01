//components
import Rooms from '../pages/rooms/Rooms';
import About from '../pages/about/about';
import Home from '../pages/home/home';

//interfaces
import IRoute from './interfaces/route';
import Bookings from '../pages/bookings/Bookings';
import Products from '../pages/products/Products';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home',                
        component: Home,
        exact: true
    },
    {
        path: '/about',
        name: 'About',                
        component: About,
        exact: false
    },
    {
        path: '/products',
        name: 'Products',                
        component: Products,
        exact: false
    },
    {
        path: '/rooms',
        name: 'Rooms',
        component: Rooms,
        exact: true
    },
    {
        path: '/rooms/:id/reservations',
        name: 'Reservations',
        component: Bookings,
        exact: false
    }
]

export default routes;