const { Telegraf } = require('telegraf');

// ⚙️ Environment variables from Bots.Business
const BOT_TOKEN = process.env.BOT_TOKEN;
const SOURCE_CHANNEL_ID = process.env.SOURCE_CHANNEL_ID;
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

const bot = new Telegraf(BOT_TOKEN);

bot.on('channel_post', async (ctx) => {
  try {
    const channelId = ctx.channelPost.chat.id.toString();
    if (channelId === SOURCE_CHANNEL_ID) {
      const message = ctx.channelPost;

      await ctx.telegram.forwardMessage(
        TARGET_CHANNEL_ID,
        channelId,
        message.message_id
      );

      console.log(`✅ Message forwarded: ${message.message_id}`);
    }
  } catch (error) {
    console.error('❌ Error forwarding:', error.message);
  }
});

function start() {
  bot.launch();
  console.log('🚀 Auto Forward Bot started on Bots.Business...');
}

start();

