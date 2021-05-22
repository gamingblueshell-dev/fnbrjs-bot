module.exports.run = async (client, message, args, logger, Fortnite) => {
    try {
        const { data } = await Fortnite.CosmeticsSearch({
            name: args.join(" "),
            type: "emote"
        });

        client.party.me.clearEmote();
        client.party.me.setEmote(data.id);
        message.reply(`Set emote to ${data.id}`);
        logger.info(`Set emote to ${data.id}`);
    } catch(err) {
        message.reply("OOPS, I couldn't find an amote with that name!");
        logger.error(err);
    };
};

module.exports.help = {
    name: "emote",
    aliases: ["dance", "e"],
    description: "Changes the current outfit."
};