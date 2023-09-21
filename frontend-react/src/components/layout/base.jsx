import Footer from "./footer";
import Header from "./header";
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