export function actionCreator(type, payloadArguments) {
  return {
    type,
    payload: {
      ...payloadArguments
    },
  };
}
