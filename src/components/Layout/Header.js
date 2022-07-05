import React from "react";
import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpeg';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return(
        <React.Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <div>
                    <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
                </div>
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt='A table full of delicious food!'></img>
            </div>

        </React.Fragment>
    );
}

export default Header;