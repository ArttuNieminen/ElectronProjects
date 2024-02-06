import { Outlet, Link } from "react-router-dom";


export default function Layout() {

    return (
        <div className="site">
            <div className="Appbar">
                <Link to="add" className='links'> Lisää uusi tieto</Link>
                <Link to="edit" className='links'>Muuta tietoja</Link>
                <Link to="delete" className='links'> Poista tieto</Link>
                <Link to="search" className='links'> Etsi tietoa</Link>
            </div>
            <div className='sitebase'>
                <Outlet />
            </div>
        </div>
    );
}