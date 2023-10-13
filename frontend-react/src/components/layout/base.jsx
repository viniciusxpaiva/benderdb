import Footer from "./footer";
import NavBar from "./oldNavbar";
import SearchAppBar from "./navbar";

const BaseLayout = ({children}) => {
    return (
        <>
            <SearchAppBar></SearchAppBar>
            {children}
            <Footer></Footer>
        </>

    )

}
export default BaseLayout;