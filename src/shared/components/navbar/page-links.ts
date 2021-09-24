import Home from "@material-ui/icons/Home";
import LocalHotel from "@material-ui/icons/LocalHotel";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import { IPageLink } from "./interfaces/page-link";


export const pageLinks: IPageLink[] = [
    { 
        name: 'Home',
        path: '/',
        icon: Home
    },
    { 
        name: 'Rooms',
        path: '/rooms',
        icon: LocalHotel
    },
    { 
        name: 'Products',
        path: '/products',
        icon: LocalHotel
    },
    { 
        name: 'About',
        path: '/about',
        icon: QuestionAnswer
    }
]