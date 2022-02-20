import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../component/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalForm from "../component/GoalForm";
import GoalItem from "../component/GoalItem";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { goals, isError, isLoading, message } = useSelector(
    (state) => state.goals
  );
  console.log(goals);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, message, isError]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <section className="heading">
        <h1> Welcome {user && user.name}</h1>
        <p> Goals Dashboard </p>
        <GoalForm />
      </section>

      <section className="content">
        {goals.length > 0 ? (
          goals.map((goal) => <GoalItem key={goal._id} goal={goal} />)
        ) : (
          <h3>You do not have any goals yet..</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
