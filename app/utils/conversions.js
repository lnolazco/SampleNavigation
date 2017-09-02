export function convertApiMessages_To_GiftedChatFormat(messages = []) {
    return messages.map(msg => ({
        _id: msg.id,
        text: msg.msg,
        createdAt: new Date(msg.date),
        user: {
            _id: `${msg.senderID}`,
            name: msg.pseudo
        }
    }));
};

export function convertApiMessage_To_GiftedChatFormat(msg) {
    return [
        {
            _id: msg.id,
            text: msg.msg,
            createdAt: new Date(msg.date),
            user: {
                _id: msg.senderID,
                name: msg.pseudo
            }
        }
    ];
};

export function convertApiSendMessage_To_GiftedChatFormat(msg) {
    return [
        {
            _id: msg.msg_id,
            text: msg.message,
            createdAt: new Date(msg.msg_date),
            user: {
                _id: msg.SenderID,
                name: msg.senderpseudo
            },
            sent: true
        }
    ];
}
