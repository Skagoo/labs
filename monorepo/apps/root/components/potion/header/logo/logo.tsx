import {ComponentPropsWithoutRef} from 'react';
import classes from './logo.module.scss';

export const Logo = (props: ComponentPropsWithoutRef<'div'>) => (
	<div {...props}>
		<svg
			className={classes.logo}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='35.43'
			version='1.1'
			viewBox='0 0 105 155'
		>
			<g fill='none' transform='translate(-724 -41)'>
				<g transform='translate(725.000000, 0.000000) scale(0.22)'>
					<path
						d='M310.609 224.428c2.904-3.701 5.27-5.26 10.938-6.998 3.477-10.619 3.831-16.481 0-26.68L136.916 189c-5.775 6.325-5.851 10.344 0 18.37l18.376 35.865s0 167.955 2.188 239.248c2.187 71.294-143.942 278.613-154.443 319.289-10.5 40.677 21 82.228 62.127 82.228h325.51c61.69 0 89.691-31.492 72.19-82.228-17.5-50.736-156.964-259.367-155.755-319.289 1.209-59.921.712-157.543 3.5-258.055z'
						className={classes.strokeThic}
					></path>
					<g fill='#6C7086' className={classes.fill}>
						<path
							className={classes.eye}
							d='M180.661 714.295a1 1 0 011.678 0l16.308 25.161a.998.998 0 010 1.088l-16.308 25.161a1 1 0 01-1.678 0l-16.308-25.161a.998.998 0 010-1.088l16.308-25.161z'
							{...{transformOrigin: '50% 739.456'}}
						/>
						<path
							className={classes.eye}
							d='M283.661 714.295a1 1 0 011.678 0l16.308 25.161a.998.998 0 010 1.088l-16.308 25.161a1 1 0 01-1.678 0l-16.308-25.161a.998.998 0 010-1.088l16.308-25.161z'
							{...{transformOrigin: '50% 739.456'}}
						/>
					</g>
				</g>
			</g>
		</svg>
	</div>
);
