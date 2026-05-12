import { Menu, Item } from "react-contexify";

import "react-contexify/ReactContexify.css";

function ContextMenu() {
  return (
    <Menu id="student" className="">
      <Item onClick={(e) => console.log(e.props)}>change diary</Item>

      <Item onClick={() => console.log("Delete")}>delete student</Item>
    </Menu>
  );
}

export default ContextMenu;
