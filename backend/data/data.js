const chats = [
    {
        isGroupChat: false,
        users: [
            {
                name: "Harapriya",
                email: "harry@gmail.com",
            },
            {
                name: "Akash",
                email: "akash@gmail.com",
            },
        ],
        _id: "617a077e18c25468bc7c4dd4",
        chatName: "Harapriya",
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Rajesh",
                email: "raj@gmail.com",
            },
            {
                name: "Akash",
                email: "akash@gmail.com",
            },
        ],
        _id: "617a077e18c25468b27c4dd4",
        chatName: "Rajesh",
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Sandy",
                email: "Sandy@gmail.com",
            },
            {
                name: "Saunak",
                email: "saunak@gmail.com",
            },
        ],
        _id: "617a077e18c2d468bc7c4dd4",
        chatName: "Sandy",
    },
    {
        isGroupChat: true,
        users: [
            {
                name: "Harapriya",
                email: "harry@gmail.com",
            },
            {
                name: "Rajesh",
                email: "raj@gmail.com",
            },
            {
                name: "Akash",
                email: "akash@gmail.com",
            },
        ],
        _id: "617a518c4081150716472c78",
        chatName: "Corona Coders",
        groupAdmin: {
            name: "Rupeswar",
            email: "rupee@gmail.com",
        },
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Abhishek",
                email: "abhi@gmail.com",
            },
            {
                name: "Jahnabi",
                email: "janu@gmail.com.com",
            },
        ],
        _id: "617a077e18c25468bc7cfdd4",
        chatName: "Abhishek",
    },
    {
        isGroupChat: true,
        users: [
            {
                name: "Jahnabi",
                email: "janu@gmail.com.com",
            },
            {
                name: "Sandy",
                email: "Sandy@gmail.com",
            },
            {
                name: "Abhishek",
                email: "abhi@gmail.com",
            },
        ],
        _id: "617a518c4081150016472c78",
        chatName: "Toppers Paltan",
        groupAdmin: {
            name: "Abhishek",
            email: "abhi@gmail.com",
        },
    },
];


module.exports = { chats }