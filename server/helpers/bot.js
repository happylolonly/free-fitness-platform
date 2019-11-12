const VkBot = require('node-vk-bot-api');

import { init } from './vk';

import config from '../configs/config';

const bot = new VkBot({
  token: process.env.VK_TOKEN,
  confirmation: process.env.VK_CONFIRMATION
});

import RepostModel from '../models/Repost';

export default app => {
  bot.on(ctx => {
    console.log(ctx);
    // bot.sendMessage(2000000001, 'Hello!');
    // ctx.reply('Hello!');
  });

  app.post('/api/bot', bot.webhookCallback);

  app.get('/api/check-reposts', async (req, res) => {
    const t = await RepostModel.find({ status: 'awaiting' }).count();

    const MAIN_CHAT = process.env.MAIN_CHAT;

    if (t > 0) {
      bot.sendMessage(
        MAIN_CHAT || 2000000001,
        `Привет, есть новые возможные мероприятия, ${t} штук, посмотри плз \n free-fitness-platform.surge.sh`
      );
    } else {
      bot.sendMessage(MAIN_CHAT, `Новых возможных мероприятий нету, молодцы!`);
    }

    res.send('ok');
  });

  app.get('/api/check', async (req, res) => {
    await init(config);
    console.log('done');
  });
};
