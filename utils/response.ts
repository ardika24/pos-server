export const success = function (
  payload: any,
  message: any,
  res: {
    statusCode: any;
    json: (arg0: {
      success: boolean;
      statusCode: any;
      message: any;
      payload: any;
    }) => void;
    end: () => void;
  }
) {
  const datas = {
    success: true,
    statusCode: res.statusCode,
    message,
    payload,
  };
  res.json(datas);
  res.end();
};

export const error = function (
  message: any,
  uri: any,
  statusCode: any,
  res: {
    json: (arg0: {
      success: boolean;
      statusCode: any;
      error: { message: any; uri: any };
    }) => void;
    end: () => void;
  }
) {
  const data = {
    success: false,
    statusCode: statusCode,
    error: {
      message,
      uri,
    },
  };
  res.json(data);
  res.end();
};
