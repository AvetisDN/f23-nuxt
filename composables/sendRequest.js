export const sendRequest = async (graphqlURL, options) => {
  try {
    let response = await fetch(graphqlURL, {
      method: "POST",
      ...options,
    });
    let result = await response.json();
    if (result.errors) {
      result.errors.forEach((error) => console.error(error.message));
      throw Error(JSON.stringify(result.errors));
    }
    return result.data;
  } catch (error) {
    return {
      errors: error,
    };
  }
};
