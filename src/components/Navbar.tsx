import { Link } from "react-router";
import "~/components/NavBar.css";

export default function NavBar() {
    return (
        <nav className='navbar'>
            <div className='navbar__brand'>JobTracker</div>
            <ul className='navbar__list'>
                <li>
                    <Link to='/' className='navbar__link'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/jobs' className='navbar__link'>
                        Jobs
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
