const mockData = [
        {
            link: '#',
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'И Human Interface Guidelines и Material Design рекомендуют делать так а не иначе',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: '',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 10,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            link: '#',
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'И Human Interface Guidelines и Material Design рекомендуют делать так а не иначе',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: '',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 10,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            link: '#',
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'И Human Interface Guidelines и Material Design рекомендуют делать так а не иначе',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: '',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 10,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            link: '#',
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'И Human Interface Guidelines и Material Design рекомендуют делать так а не иначе',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: '',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 10,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
        {
            avatar: 'https://via.placeholder.com/150',
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '12:00',
            messageCounter: 0,
        },
]

const mockDataMessages = [
    {
        content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
        time: '13:20',
    },
    {
        content: 'Hello, how are you?',
        time: '12:00',
        status: 'send',
    },
    {
        content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
        time: '13:20',
        status: 'send',
    },
    {
        content: 'Hello, how are you?',
        time: '12:00',
    },
    {
        content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
        time: '13:20',
    },
    {
        content: 'Hello, how are you?',
        time: '12:00',
        status: 'send',
    },
    {
        content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
        time: '13:20',
        status: 'send',
    },
    {
        content: 'Hello, how are you?',
        time: '12:00',
    },

]

export { mockData, mockDataMessages };


