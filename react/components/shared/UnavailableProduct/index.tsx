// styles
import style from "./styles.css";

const UnavailableProduct = ({children}) => {
    
    return (
        <div className={style.buttonContainer}>
            {children}
        </div>
    )
}

export default UnavailableProduct;