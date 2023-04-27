import { Link } from 'react-router-dom';
import style from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <ul className={style.list}>
                <li className={style.item}>
                    <Link to='/'>Home</Link>
                </li>
                <li className={style.item}>
                    <Link to='/users'>User List</Link>
                </li>
                <li className={style.item}>
                    <Link to='/users/create'>Create new user</Link>
                </li>
                <li className={style.item}>
                    <Link to='/hotels'>Hotel List</Link>
                </li>
                <li className={style.item}>
                    <Link to='/hotels/create'>Create new hotel</Link>
                </li>
                <li className={style.item}>
                    <Link to='/services'>Services List</Link>
                </li>
                <li className={style.item}>
                    <Link to='/services/create'>Create new service</Link>
                </li>
                <li className={style.item}>
                    <Link to='/trans'>Transaction List</Link>
                </li>
                <li className={style.item}>
                    <Link to='/cmts/create'>Create new comment</Link>
                </li>
                <li className={style.item}>
                    <Link to='/books/create'>Create new book & trans</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
