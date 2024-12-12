import { useQuery } from '@apollo/client';
import { 
    QUERY_ME } from '../utils/queries';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || data?.user || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {`${user.username}'s`} profile.
        </h2>
      </div>
      <p>Email: {user.email}</p>
      <p>Games Played: {user.games.length}</p>
    </div>
  );
};

export default Profile;