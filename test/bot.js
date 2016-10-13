/* eslint-disable no-console */
const oneLine = require('common-tags').oneLine;
const commando = require('../src/index');
const token = require('./auth.json').token;

const client = new commando.Client({
	owner: '90997305578106880',
	commandPrefix: 'cdev'
});

client.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnect', () => { console.warn('Reconnecting...'); })
	.on('commandPreRun', cmd => { console.log(`Running command ${cmd.groupID}:${cmd.memberName}.`); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix changed to ${prefix || 'the default'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});

client.registry.registerDefaults();

client.login(token);
