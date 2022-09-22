import Header from "../layout/header";
import Footer from "../layout/footer";
import "./menu.css";
import MenuItems from "../components/menu-items";

function Menu(props) {

  return (
    <>
      <Header />
        <div className="container">
          <MenuItems />
        </div>
      <Footer />
    </>
  );
}

export default Menu;
