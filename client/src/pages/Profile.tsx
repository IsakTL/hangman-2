// import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER, DELETE_USER } from '../utils/mutations';
import auth from '../utils/auth'
import { useState } from 'react';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [QUERY_ME]
  });
  const [deleteUser] = useMutation(DELETE_USER);
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: ""
  })

  const user = data?.me || data?.user || {};

  const showModal = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
  }

  const handleUpdate = async (event: any) => {
    try {

      event.preventDefault();

      const { data } = await updateUser({
        variables: {
          updateUserId: user._id,
          username: formState.username,
          email: formState.email
        },
      });
      console.log('User updated:', data);
      alert('User updated successfully!');
      hideModal();


    } catch (err) {
      console.error(err);
      alert('Error updating user.');
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteUser({
        variables: {
          deleteUserId: user._id,
        },
      });
      console.log('User deleted:', data);
      alert('User deleted successfully!');
      auth.logout()
    } catch (err) {
      console.error(err);
      alert('Error deleting user.');
    }
  };

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
      <button onClick={showModal} className="btn btn-primary">
        Update User
      </button>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete User
      </button>


      {
        show == true ?
          (
            <div id="update-user-modal">
              <form onSubmit={handleUpdate}>
                <label>New Username</label>
                <input
                  type="text"
                  id="new-username"
                  value={formState.username}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      username: e.target.value
                    })
                  }}
                ></input>

                <label>New Email</label>
                <input
                  type="email"
                  id="new-email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      email: e.target.value
                    })
                  }}
                ></input>

                <hr />
                <button type='submit'>Update</button>
              </form>
            </div>
          ) : (
            null
          )
      }



    </div>
  );
};

export default Profile;
