import React, {Fragment} from 'react';

import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <Fragment>
            <header  className={classes.header}>
                <h1>Last Meal</h1>
                <HeaderCartButton onShowCart={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img alt='foood' src='https://images.squarespace-cdn.com/content/v1/5afa28849772aefb6a1c615b/1575352623392-MR1SLNDW8CVPRHL48ISE/IMG_4854.jpeg'/>
            </div>
        </Fragment>
    );
}


export default Header;