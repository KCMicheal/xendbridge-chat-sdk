import * as signalR from "@microsoft/signalr";

var connection;

const createConnection = async (
  ChatHubAddCommentModel,
  publicKey,
  getAllChats
) => {
  if (
    connection === null ||
    connection === undefined ||
    connection?._connectionState === "Disconnected"
  ) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("https://canary.xendbridge.com/hubs/chathub")
      .withAutomaticReconnect()
      .build();

    await connection.start();

    await connection.on("ReceiveMessageHandlerForThirdParty", async () => {
      await connection
        .invoke(
          "GetMessageHistoryForThirdParty",
          ChatHubAddCommentModel?.DisputeReference,
          publicKey
        )
        .then((result) => {
          getAllChats(result);
        })
        .catch((err) => {
          return err;
        });
    });
  }

  await connection.on("ReceiveMessageHandlerForThirdParty", async () => {
    await connection
      .invoke(
        "GetMessageHistoryForThirdParty",
        ChatHubAddCommentModel?.DisputeReference,
        publicKey
      )
      .then((result) => {
        getAllChats(result);
      })
      .catch((err) => {
        return err;
      });
  });

  return connection;
};

const getMessageHistory = async (
  disputeReference,
  publicKey,
  getAllChats
) => {
  let newConnection = await createConnection();

  await newConnection
    .invoke("GetMessageHistoryForThirdParty", disputeReference, publicKey)
    .then((res) => {
      getAllChats(res);
      return res;
    });
};

const sendMessage = async (
  ChatHubAddCommentModel,
  publicKey,
  getAllChats
) => {
  let newConnection = await createConnection(
    ChatHubAddCommentModel,
    publicKey,
    getAllChats
  );

  await newConnection
    .invoke("SendMessageForThirdParty", ChatHubAddCommentModel, publicKey)
    .then((resp) => {
      console.log(resp, "SendMessageForThirdParty success");
    });
};

export { getMessageHistory, sendMessage };
