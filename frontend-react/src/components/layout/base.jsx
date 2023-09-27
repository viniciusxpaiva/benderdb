import Footer from "./footer";
import NavBar from "./navbar";

const BaseLayout = ({children}) => {
    return (
        <>
            <NavBar></NavBar>
            {children}
            <Footer></Footer>
        </>

    )

}
export default BaseLayout;