import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  IconButton,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CheckIcon from "@material-ui/icons/Check";
import axios from "axios";
import { Container } from "./styles";


const CourseConfig = () => {
  const userInfos = useSelector((state) => state.currentUserToken);
  const [isEditable, setIsEditable] = useState(false);
  const [selectValue, setSelectValue] = useState(userInfos.user.course_module);
  const [courseModule, setCourseModule] = useState('')

  const userID = userInfos.user.id

  useEffect(() => {
    axios
    .get(`https://kenziehub.me/users/${userID}`)
    .then((response) => {
      setCourseModule(response.data.course_module)
    })
    .catch((e) => console.error(e));
  }, [])

  const handleEditable = () => {
    setIsEditable(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `https://kenziehub.me/profile`,
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
      data: {
        course_module: `${selectValue}`,
      },
    }).then((response) => {
      setIsEditable(false);
      setCourseModule(response.data.course_module)
    });
  };

  return (
    <Container>
      {isEditable ? (
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <MenuItem value="Primeiro módulo (Introdução ao Frontend)">
                Primeiro módulo (Introdução ao Frontend)
              </MenuItem>
              <MenuItem value="Segundo módulo (Frontend Avançado)">
                Segundo módulo (Frontend Avançado)
              </MenuItem>
              <MenuItem value="Terceiro módulo (Introdução ao Backend)">
                Terceiro módulo (Introdução ao Backend)
              </MenuItem>
              <MenuItem value="Quarto módulo (Backend Avançado)">
                Quarto módulo (Backend Avançado)
              </MenuItem>
            </Select>
          </FormControl>
          <Button type="submit">
            <CheckIcon />
          </Button>
        </form>
      ) : (
        <div className="editModule">
          <h3>{courseModule}</h3>
          <IconButton onClick={handleEditable}>
            <CreateIcon />
          </IconButton>
        </div>
      )}
    </Container>
  );
};
export default CourseConfig;
