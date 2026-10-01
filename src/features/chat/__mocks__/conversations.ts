import type { Conversation } from "./chatApi";

export const сonversations: Conversation[] = [
	{
		id: "maria",
		name: "Мария Смирнова",
		preview: "Отлично, тогда до встречи!",
		time: "12:42",
		initials: "МС",
		color: "rose",
		unread: 2,
		online: true,
		messages: [
			{ id: 1, text: "Привет! Как продвигается проект?", time: "12:36" },
			{ id: 2, text: "Уже почти закончил макет. Сегодня покажу!", time: "12:38", outgoing: true },
			{ id: 3, text: "Здорово! Давай созвонимся после обеда", time: "12:40" },
			{ id: 4, text: "Отлично, тогда до встречи!", time: "12:42" },
		],
	},
	{
		id: "alex",
		name: "Алексей Иванов",
		preview: "📎 Документ",
		time: "11:58",
		initials: "АИ",
		color: "blue",
		messages: [
			{ id: 1, text: "Отправил материалы по встрече", time: "11:54" },
			{ id: 2, text: "Спасибо, посмотрю!", time: "11:58", outgoing: true },
		],
	},
	{
		id: "team",
		name: "Команда проекта",
		preview: "Ирина: Всем хорошего дня!",
		time: "10:24",
		initials: "КП",
		color: "violet",
		unread: 5,
		messages: [
			{ id: 1, text: "Доброе утро! Сегодня обсуждаем новый релиз?", time: "10:18" },
			{ id: 2, text: "Да, встречаемся в 14:00", time: "10:21", outgoing: true },
			{ id: 3, text: "Ирина: Всем хорошего дня!", time: "10:24" },
		],
	},
	{
		id: "dmitry",
		name: "Дмитрий Волков",
		preview: "Буду через 10 минут",
		time: "Вчера",
		initials: "ДВ",
		color: "amber",
		messages: [
			{ id: 1, text: "Мы всё ещё встречаемся у входа?", time: "Вчера" },
			{ id: 2, text: "Буду через 10 минут", time: "Вчера", outgoing: true },
		],
	},
	{
		id: "anna",
		name: "Анна Кузнецова",
		preview: "Спасибо большое 💛",
		time: "Пн",
		initials: "АК",
		color: "mint",
		messages: [
			{ id: 1, text: "Спасибо большое 💛", time: "Пн" },
		],
	},
];
