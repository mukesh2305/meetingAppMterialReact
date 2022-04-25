import { AgoraVideoPlayer } from "agora-rtc-react";
import { useClient } from './settings';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    
    videoContainer: {
        '&  video': {
          width: "60px!important",
           height: "60px!important", 
          borderRadius: "60px!important",
          backgroundColor: "transparent!important"
          },
          '&  div > div ': {
            backgroundColor: "transparent!important"
          },      

    }
}));

export default function UserVideo(props) {
  const { users, tracks, posX, posY, px2, py2 } = props;
  
  const client = useClient();
  const localTrack = client.localTracks;
    console.log("TEST VIDEO " + localTrack);
    // users[0].topHeight = "20px";
    // users[1].topHeight = "80px";
    console.log(users);
    console.log("UID: " + client.uid);

    const classes = useStyles();

  return (
      <div>
      {users.length > 0 &&
        users.map((user) => {
          
          if (user.videoTrack) {
            return (
              <div className = {classes.videoContainer}>
                <AgoraVideoPlayer 
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: "60px", width: "60px", position: "absolute", top: posY, left: posX, backgroundColor: "transparent!important"}}
                />
              </div>
            );
          } else return null;
        })}
        </div>
        );}
          {/* <AgoraVideoPlayer
                  videoTrack={client.videoTrack}
                  key={client.uid}
                  
                  style={{ height: "60px", width: "60px", position: "absolute", top: "0px", left: posX}}
          /> */}
      

    // </Grid>
  // <Grid container style={{ height: "100%" }}>
      {/* <Grid item xs={12}>
        <AgoraVideoPlayer
          videoTrack={tracks[0]}
          style={{ height: "100%", width: "100%" }}
        />
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "100%", width: "100%" }}
        />
      </Grid> */}
      {/* users[2].topHeight = "140px"; */}
