import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BodyContainer from "../../Common/Body";
import { Header, Wrapper, Table, TableHero } from "./style";
import HistoryVideo from "../../Illustration/VideoHistory.svg";
import HistoryAudio from "../../Illustration/AudioHistory.svg";
import { CallHistory } from "../../store/History/action";
import { formatTime } from "../../helpers";
import back from "../../Illustration/Back.svg";
import { getUserDataById } from "../../helpers";
import Moment from "react-moment";

const HistoryInfo = ({ CallHistory, ...props }) => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function userData() {
      const user = await getUserDataById(props.match.params.userId);
      setUserData(user);
      setLoading(false);
    }
    userData();
  }, []);

  useEffect(() => {
    let mount = true;
    if (mount) {
      CallHistory(props.match.params.roomId);
    }
    return mount === false;
  }, []);

  const MyHistoryCalls = useSelector(
    (state) => state.HistoryReducer.MyHistoryCalls
  );
  const LoadingCalls = useSelector(
    (state) => state.HistoryReducer.LoadingCalls
  );

  const renderData = () => {
    return MyHistoryCalls.map(({ duration, date, type }) => (
      <tr className="container">
        <td>
          <Moment format="MMMM Do YYYY, h:mm:ss a">{date.toDate()}</Moment>
        </td>
        <td className="icon">
          {type === "video" ? (
            <>
              <div>
                <img src={HistoryVideo} alt="video" />
              </div>
              <h1>Video call</h1>
            </>
          ) : (
            <>
              <div>
                <img src={HistoryAudio} alt="audio" />
              </div>
              <h1> Audio call </h1>
            </>
          )}
        </td>
        <td>{formatTime(duration)}</td>
      </tr>
    ));
  };
  return (
    <Wrapper as={BodyContainer}>
      {LoadingCalls ? (
        <h1>Loading</h1>
      ) : loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Header>
            <div className="link">
              <img src={back} alt="back" />
              <Link to="/history">Back to Contact </Link>
            </div>

            <div className="avatar">
              {userData.avatar ? (
                <img src={userData.avatar} alt="img" />
              ) : null}
              <div>
                <h1>{userData.name}</h1>
                <span>Call History</span>
              </div>
            </div>
          </Header>
          <Table id="students">
            <tbody>
              <TableHero>
                <td>Date</td>
                <td>Type</td>
                <td>Duration</td>
              </TableHero>
              {renderData()}
            </tbody>
          </Table>
        </>
      )}
    </Wrapper>
  );
};

export default connect(null, {
  CallHistory,
})(HistoryInfo);
