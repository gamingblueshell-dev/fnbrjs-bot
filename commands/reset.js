module.exports.run = async (client, message, args, logger, Fortnite) => {
    client.setLoadout();
};

module.exports.help = {
    name: "reset",
    aliases: [],
    description: "Resets the cosmetic loadout back to default."
};