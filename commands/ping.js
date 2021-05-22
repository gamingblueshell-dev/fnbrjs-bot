module.exports.run = async (client, message, args, logger, Fortnite) => {
    message.reply("Pong!");
};

module.exports.help = {
    name: "ping",
    aliases: ["pong"],
    description: "Pings and pongs."
};