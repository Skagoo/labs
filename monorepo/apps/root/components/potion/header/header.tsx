import Link from 'next/link';
import classes from './header.module.scss';
import {Logo} from './logo/logo';

export const Header = () => {
	return (
		<header className={classes.header}>
			<Link href='/'>
				<Logo className={classes.logo} />
			</Link>

			<nav>
				<a href='https://github.com/Skagoo/labs' target='_blank'>
					<h1 className={classes.title}>skagoo/labs</h1>
				</a>
			</nav>
		</header>
	);
};
