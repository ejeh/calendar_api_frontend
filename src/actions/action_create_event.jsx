import { CREATE_EVENTS } from "./types";

const BACKEND_URL = "http://localhost:2000/api/v1";

export const loadCreateEvents = (result) => {
  return {
    type: CREATE_EVENTS,
    payload: result,
  };
};

export const creatEvents = (data) => {
  return async (dispatch) =>
    await fetch(`${BACKEND_URL}/calendar/insert`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadCreateEvents(json));
      })
      .catch((error) =>
        dispatch(
          loadCreateEvents({
            success: false,
            message: error.message,
          })
        )
      );
};
