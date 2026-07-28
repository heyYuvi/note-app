import { NavLink } from "react-router-dom"

const Sidebar = () =>{

    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/">
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create">
                    Create Notes
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;