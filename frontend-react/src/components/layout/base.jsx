import Footer from "./footer";
import SearchAppBar from "./navbar";

const BaseLayout = ({children}) => {
    return (
        <>
            <title>DATABASE</title>
            <div style={{position: "relative", minHeight:"100vh"}}>
                <div style={{paddingBottom: "5.5rem"}}>
                    <SearchAppBar></SearchAppBar>
                {children}
                </div>
            <Footer></Footer>
            </div>
        </>

    )

}
export default BaseLayout;