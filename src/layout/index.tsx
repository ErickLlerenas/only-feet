import { FC } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

const Layout: FC = ({ children }) => {
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.clear();
		navigate("/login", { replace: true });
	};

	return (
		<section className="layout-container">
			<article className="menu-container">
				<Link to="/" className="item">
					<AiOutlineHome />
					<span>Home</span>
				</Link>
				<Link to="/my-profile" className="item">
					<CgProfile />
					<span>My profile</span>
				</Link>
				<div className="item" onClick={logOut}>
					<MdLogout />
					<span>Log Out</span>
				</div>
			</article>
			<article className="feed-container">{children}</article>
		</section>
	);
};
export default Layout;
