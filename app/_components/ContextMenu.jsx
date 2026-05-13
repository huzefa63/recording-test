import { Menu, Item, Separator } from "react-contexify";

import "react-contexify/ReactContexify.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ContextMenu({children}) {
  return (
    <Menu id="student" className="">
      {children}
    </Menu>
  );
}

export default ContextMenu;
