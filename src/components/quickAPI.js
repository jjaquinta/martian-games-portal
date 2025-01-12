
export const quickApi = () => {

  // Helper function to update user data
  const quickChangeName = (login, oldName) => {
    alert("Change name for '"+login+"' from '"+oldName+"'")
  };

  return {
    quickChangeName,
  };
};
