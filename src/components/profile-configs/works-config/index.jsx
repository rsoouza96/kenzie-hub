import { Content, ContentList } from "./style";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  TextField,
  Link,
  Select,
  MenuItem,
  FormControl,
  Button,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import WorkIcon from "@material-ui/icons/Work";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useEffect } from 'react'
import axios from "axios";

const WorksConfig = () => {
  const [workTitleInput, setWorkTitleInput] = useState("");
  const [workDescriptionInput, setWorkDescriptionInput] = useState("");
  const [workUrlInput, setWorkUrlInput] = useState("");
  const [works, setWorks] = useState([])

  const userInfos = useSelector((state) => state.currentUserToken);
  const userID = userInfos.user.id
  const user = userInfos.user;


  useEffect(() => {
    axios
    .get(`https://kenziehub.me/users/${userID}`)
    .then((response) => {
      console.log(response)
      setWorks(response.data.works)
    })
    .catch((e) => console.error(e));
  }, [])


  const createWork = (evt) => {
    evt.preventDefault();
    axios({
      method: "post",
      url: `https://kenziehub.me/users/works`,
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
      data: {
        title: `${workTitleInput}`,
        description: `${workDescriptionInput}`,
        deploy_url: `${workUrlInput}`,
      },
    })
      .then((response) => {
        setWorks([...works, response.data])
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteWork = (ID) => {
    axios({
      method: "delete",
      url: `https://kenziehub.me/users/works/${ID}`,
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    })
      .then((response) => {
        setWorks(works.filter((work) => work.id !== ID))
      })
      .catch((err) => console.log(err));
  };


  console.log(works)
  return (
    <>
      <Content>
        <form onSubmit={createWork}>
          <TextField
            placeholder="Título"
            value={workTitleInput}
            onChange={(e) => setWorkTitleInput(e.target.value)}
          />
          <TextField
            placeholder="Descrição"
            value={workDescriptionInput}
            onChange={(e) => setWorkDescriptionInput(e.target.value)}
            multiline
          />
          <TextField
            placeholder="Url de Deploy"
            value={workUrlInput}
            onChange={(e) => setWorkUrlInput(e.target.value)}
          />

          <Button type="submit">
            <AddIcon />
          </Button>
        </form>
      </Content>
      <ContentList>
        <List>
          {works.map((work, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={work.title} secondary={work.description} />
              <IconButton onClick={() => handleDeleteWork(work.id)}>
                <DeleteIcon />
              </IconButton>
              <Link href={work.deploy_url}>
                <IconButton>
                  <ExitToAppIcon />
                </IconButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </ContentList>
    </>
  );
};

export default WorksConfig;
