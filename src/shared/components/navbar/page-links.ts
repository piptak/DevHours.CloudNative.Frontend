import { Home, LocalHotel, QuestionAnswer } from "@material-ui/icons";
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