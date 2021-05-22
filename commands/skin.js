module.exports.run = async (client, message, args, logger, Fortnite) => {
    try {
        const { data } = await Fortnite.CosmeticsSearch({
            name: args.join(" "),
            type: "outfit"
        });

        client.party.me.setOutfit(data.id);
        message.reply(`Set skin to ${data.id}`);
        logger.info(`Set skin to ${data.id}`);
    } catch(err) {
        message.reply("OOPS, I couldn't find a skin with that name!");
        logger.error(err);
    };
};

module.exports.help = {
    name: "skin",
    aliases: ["outfit", "s"],
    description: "Changes the current outfit."
};