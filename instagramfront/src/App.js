import React, { useEffect, useState, useMemo } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import "./styles/styles.css";
// import "./app.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));



export default function Album({ history }) {
  const classes = useStyles();
  const [completeUpload, setCompleteUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState([]);

  const [thumbnail, setThumbnail] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append("thumbnail", thumbnail);
    data.append("title", title);
    data.append("description", description);

    // await api.post("/post/", data, {
    //   headers: { user_id }
    // });

    history.push("/");
  }

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);



  const getPosts = async () => {
    try {
      const data = await fetch("http://localhost:8080/api/");
      const json = await data.json();
      setPost(json);
      console.log(json);
    } catch (e) {
      console.error("Problem", e);
    }
  };



  useEffect(() => {
    console.log(title);
    getPosts();
  }, []);

  useEffect(() => {
    post.map(card => console.log(card.titulo));
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Portifólio
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Léo Gonzaga
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <div style={{ width: 500, height: 400 }}>
                    <label id="thumbnail">
                      <input
                        type="file"
                        onChange={e => setThumbnail(e.target.files[0])}
                        style={{
                          backgroundImage: `url(${preview})`,
                          height: 400
                        }}
                        className={thumbnail ? "has-thumbnail" : null}
                      />
                    </label>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      marginTop: 20
                    }}
                  >
                    {!completeUpload ? (
                      <Button
                        style={{ width: 500 }}
                        variant="outlined"
                        color="primary"
                        onClick={() => setCompleteUpload(!completeUpload)}
                      >
                        Upload
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {}}
                      >
                        Fechar
                      </Button>
                    )}
                  </div>
                </Grid>

                <Grid item>
                  {completeUpload ? (
                    <div>
                      <input
                        type="input"
                        name="input"
                        onChange={e => setTitle(e.target.value)}
                      />
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {post.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.titulo}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Editar
                    </Button>
                    <Button size="small" color="primary">
                      Deletar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
