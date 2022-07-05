import React from "react";
import styles from './Modal.module.css';
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onHide}></div>
}

const ModalOverlay = (props) => {
    return (<div className={styles.modal}>
        <div className={styles.content}>
            {props.children}
        </div>
    </div>
    );
}


const Modal = (props) => {
    return (
        <React.Fragment>
            {/* if we are not using portals:
            <Backdrop />  
            <ModalOverlay>{props.children}</ModalOverlay> */}
            {/* if we are using portals: */}
            {ReactDOM.createPortal(<Backdrop onHide={props.onClose}></Backdrop>,document.getElementById('overlays'))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}

        </React.Fragment>
    );

}

export default Modal;
